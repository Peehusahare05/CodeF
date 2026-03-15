import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  calculateCarbon,
  generateInsight,
  generateTrend,
} from "../utils/carbonCalculator";
import { apiFetch } from "../utils/api";
import {
  BarChart3,
  Car,
  Circle,
  Leaf,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  Zap,
  Package,
} from "lucide-react";

const TRANSPORT_OPTIONS = [
  { value: "car", label: "Car (Petrol)" },
  { value: "ev", label: "Electric Vehicle" },
  { value: "bike", label: "Bike" },
  { value: "bus", label: "Bus" },
  { value: "train", label: "Train" },
  { value: "walking", label: "Walking / Cycling" },
];

const PLASTIC_OPTIONS = [
  {
    value: "low",
    label: "Low",
    Icon: Leaf,
    color: "border-green-400 bg-green-50 text-green-700",
  },
  {
    value: "medium",
    label: "Medium",
    Icon: Circle,
    color: "border-yellow-400 bg-yellow-50 text-yellow-700",
  },
  {
    value: "high",
    label: "High",
    Icon: TriangleAlert,
    color: "border-red-400 bg-red-50 text-red-700",
  },
];

const InputForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedFeature = params.get("feature");
  const [form, setForm] = useState({
    transportType: "",
    distance: "",
    electricity: "",
    waste: "",
    plastic: "low",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.transportType)
      e.transportType = "Please select a transport type.";
    if (!form.distance || isNaN(form.distance) || Number(form.distance) < 0)
      e.distance = "Enter a valid daily distance (km).";
    if (
      !form.electricity ||
      isNaN(form.electricity) ||
      Number(form.electricity) < 0
    )
      e.electricity = "Enter a valid daily electricity usage (kWh).";
    if (!form.waste || isNaN(form.waste) || Number(form.waste) < 0)
      e.waste = "Enter a valid weekly waste amount (kg).";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handlePlastic = (val) => {
    setForm((prev) => ({ ...prev, plastic: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const result = calculateCarbon({
      transportType: form.transportType,
      distance: Number(form.distance),
      electricity: Number(form.electricity),
      waste: Number(form.waste),
      plastic: form.plastic,
    });

    const insight = generateInsight(result);
    const trend = generateTrend(result.totalCO2);

    const payload = {
      ...result,
      insight,
      trend,
      inputs: { ...form },
    };

    // Save to localStorage for dashboard display
    localStorage.setItem("ecotrack_result", JSON.stringify(payload));

    // Also persist to MongoDB via backend
    try {
      await apiFetch("/api/carbon/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: { ...form },
          results: {
            transportCO2: result.transportCO2,
            electricityCO2: result.electricityCO2,
            wasteCO2: result.wasteCO2,
            plasticCO2: result.plasticCO2,
            totalCO2: result.totalCO2,
            ecoScore: result.ecoScore,
          },
          insight,
          trend,
        }),
      });
    } catch (err) {
      // Non-blocking: even if save fails, navigate to dashboard
      console.warn("Could not save result to backend:", err.message);
    }

    if (requestedFeature === "advisor") {
      navigate("/ai-advisor");
    } else if (requestedFeature === "simulator") {
      navigate("/reduction-simulator");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <section className="page-shell py-12">
      <div className="section-wrap flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 inline-block rounded-full border border-green-200 bg-green-50 px-5 py-1 text-sm font-semibold tracking-wider text-green-700">
            LEAF_RK
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            Enter Your Daily Lifestyle Data
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Provide information about your daily activities so the system can
            calculate your environmental impact and carbon footprint.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="surface-card flex w-full max-w-xl flex-col gap-7 p-4 sm:p-6 md:gap-8 md:p-8"
          noValidate
        >
          {/* Transportation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="icon-shell icon-shell-sm icon-tone-green">
                <Car className="icon-glyph-sm" />
              </span>
              <h2 className="font-bold text-slate-800 text-lg">
                Transportation Activity
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Transport Type
                </label>
                <select
                  name="transportType"
                  value={form.transportType}
                  onChange={handleChange}
                  className="input-control"
                >
                  <option value="">Select Type</option>
                  {TRANSPORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.transportType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transportType}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Daily Travel Distance (km)
                </label>
                <input
                  type="number"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  min="0"
                  className="input-control"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Average distance traveled in a single day
                </p>
                {errors.distance && (
                  <p className="text-red-500 text-xs mt-1">{errors.distance}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Electricity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="icon-shell icon-shell-sm icon-tone-yellow">
                <Zap className="icon-glyph-sm" />
              </span>
              <h2 className="font-bold text-slate-800 text-lg">
                Electricity Consumption
              </h2>
            </div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Average Daily Usage (kWh)
            </label>
            <input
              type="number"
              name="electricity"
              value={form.electricity}
              onChange={handleChange}
              placeholder="e.g. 8.5"
              min="0"
              step="0.1"
              className="input-control"
            />
            <p className="text-xs text-slate-400 mt-1">
              You can find this on your monthly utility bill
            </p>
            {errors.electricity && (
              <p className="text-red-500 text-xs mt-1">{errors.electricity}</p>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Waste */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="icon-shell icon-shell-sm icon-tone-blue">
                <Trash2 className="icon-glyph-sm" />
              </span>
              <h2 className="font-bold text-slate-800 text-lg">
                Waste Production
              </h2>
            </div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Weekly Waste (kg)
            </label>
            <input
              type="number"
              name="waste"
              value={form.waste}
              onChange={handleChange}
              placeholder="e.g. 5"
              min="0"
              step="0.1"
              className="input-control"
            />
            <p className="text-xs text-slate-400 mt-1">
              Estimated total weight of non-recyclable waste per week
            </p>
            {errors.waste && (
              <p className="text-red-500 text-xs mt-1">{errors.waste}</p>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Plastic */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="icon-shell icon-shell-sm icon-tone-purple">
                <Package className="icon-glyph-sm" />
              </span>
              <h2 className="font-bold text-slate-800 text-lg">
                Plastic Consumption
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PLASTIC_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handlePlastic(opt.value)}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 px-2 py-3 text-sm font-semibold transition-colors sm:py-4 ${form.plastic === opt.value
                    ? opt.color
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                    }`}
                >
                  <span className="icon-shell icon-shell-sm icon-tone-white mb-1">
                    <opt.Icon className="icon-glyph-sm" />
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-600 py-3.5 text-base font-semibold tracking-wide text-white transition-colors hover:bg-green-700 disabled:opacity-70"
          >
            {loading ? "Calculating..." : "Calculate Carbon Footprint"}
          </button>
        </form>

        {/* Bottom info */}
        <div className="mt-6 w-full max-w-xl flex flex-col md:flex-row gap-4 text-sm text-slate-500">
          <div className="flex items-start gap-2 flex-1">
            <span className="icon-shell icon-tone-green mt-0.5 rounded-full w-5 h-5">
              <ShieldCheck className="w-3 h-3" />
            </span>
            <span>
              Your activity data will be used only to estimate environmental
              impact and provide personalised eco-friendly tips. We value your
              privacy.
            </span>
          </div>
          <div className="flex items-start gap-2 flex-1">
            <span className="icon-shell icon-tone-blue mt-0.5 rounded-full w-5 h-5">
              <BarChart3 className="w-3 h-3" />
            </span>
            <div>
              <span className="font-semibold text-slate-700">Quick Preview</span>
              <p>
                Carbon results will appear on the dashboard after calculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
