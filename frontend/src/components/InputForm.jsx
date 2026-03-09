import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateCarbon, generateInsight, generateTrend } from "../utils/carbonCalculator";

const TRANSPORT_OPTIONS = [
  { value: "car", label: "🚗 Car (Petrol)" },
  { value: "ev", label: "⚡ Electric Vehicle" },
  { value: "bike", label: "🚲 Bike" },
  { value: "bus", label: "🚌 Bus" },
  { value: "train", label: "🚆 Train" },
  { value: "walking", label: "🚶 Walking / Cycling" },
];

const PLASTIC_OPTIONS = [
  { value: "low", label: "Low", emoji: "😊", color: "border-green-400 bg-green-50 text-green-700" },
  { value: "medium", label: "Medium", emoji: "😐", color: "border-yellow-400 bg-yellow-50 text-yellow-700" },
  { value: "high", label: "High", emoji: "😟", color: "border-red-400 bg-red-50 text-red-700" },
];

const InputForm = () => {
  const navigate = useNavigate();
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
    if (!form.transportType) e.transportType = "Please select a transport type.";
    if (!form.distance || isNaN(form.distance) || Number(form.distance) < 0)
      e.distance = "Enter a valid daily distance (km).";
    if (!form.electricity || isNaN(form.electricity) || Number(form.electricity) < 0)
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

  const handleSubmit = (e) => {
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

    localStorage.setItem("ecotrack_result", JSON.stringify(payload));

    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block border-2 border-green-400 text-green-600 font-bold text-xl px-6 py-1 rounded-full tracking-widest mb-4 bg-white shadow-sm">
          LEAF_🌿RK
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
          Enter Your Daily Lifestyle Data
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Provide information about your daily activities so the system can calculate your environmental impact and carbon footprint.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl flex flex-col gap-8"
        noValidate
      >
        {/* Transportation */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">🚗</span>
            <h2 className="font-bold text-slate-800 text-lg">Transportation Activity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Transport Type</label>
              <select
                name="transportType"
                value={form.transportType}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                <option value="">Select Type</option>
                {TRANSPORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.transportType && (
                <p className="text-red-500 text-xs mt-1">{errors.transportType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Daily Travel Distance (km)</label>
              <input
                type="number"
                name="distance"
                value={form.distance}
                onChange={handleChange}
                placeholder="e.g. 15"
                min="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <p className="text-xs text-slate-400 mt-1">Average distance traveled in a single day</p>
              {errors.distance && <p className="text-red-500 text-xs mt-1">{errors.distance}</p>}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Electricity */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-lg">⚡</span>
            <h2 className="font-bold text-slate-800 text-lg">Electricity Consumption</h2>
          </div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Average Daily Usage (kWh)</label>
          <input
            type="number"
            name="electricity"
            value={form.electricity}
            onChange={handleChange}
            placeholder="e.g. 8.5"
            min="0"
            step="0.1"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <p className="text-xs text-slate-400 mt-1">You can find this on your monthly utility bill</p>
          {errors.electricity && <p className="text-red-500 text-xs mt-1">{errors.electricity}</p>}
        </div>

        <hr className="border-slate-100" />

        {/* Waste */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🗑️</span>
            <h2 className="font-bold text-slate-800 text-lg">Waste Production</h2>
          </div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Weekly Waste (kg)</label>
          <input
            type="number"
            name="waste"
            value={form.waste}
            onChange={handleChange}
            placeholder="e.g. 5"
            min="0"
            step="0.1"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <p className="text-xs text-slate-400 mt-1">Estimated total weight of non-recyclable waste per week</p>
          {errors.waste && <p className="text-red-500 text-xs mt-1">{errors.waste}</p>}
        </div>

        <hr className="border-slate-100" />

        {/* Plastic */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg">🧴</span>
            <h2 className="font-bold text-slate-800 text-lg">Plastic Consumption</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {PLASTIC_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => handlePlastic(opt.value)}
                className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 font-semibold transition cursor-pointer ${
                  form.plastic === opt.value
                    ? opt.color + " shadow-md scale-105"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl mb-1">{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-bold py-4 rounded-2xl shadow-lg transition text-lg tracking-wide"
        >
          {loading ? "Calculating..." : "Calculate Carbon Footprint"}
        </button>
      </form>

      {/* Bottom info */}
      <div className="mt-6 w-full max-w-xl flex flex-col md:flex-row gap-4 text-sm text-slate-500">
        <div className="flex items-start gap-2 flex-1">
          <span className="text-green-500 mt-0.5">●</span>
          <span>Your activity data will be used only to estimate environmental impact and provide personalised eco-friendly tips. We value your privacy.</span>
        </div>
        <div className="flex items-start gap-2 flex-1">
          <span className="text-green-500 mt-0.5">📊</span>
          <div>
            <span className="font-semibold text-slate-700">Quick Preview</span>
            <p>Carbon results will appear on the dashboard after calculation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
