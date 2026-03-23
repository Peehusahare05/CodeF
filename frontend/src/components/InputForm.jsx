import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  calculateCarbon as calculateCarbonApi,
  saveCarbonResult,
} from "../services/carbonService";
import {
  BarChart3,
  Car,
  Circle,
  Leaf,
  Package,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  Zap,
} from "lucide-react";
import Stepper from "./track/Stepper";
import StepCard from "./track/StepCard";
import NavigationButtons from "./track/NavigationButtons";
import TransportationStep from "./track/steps/TransportationStep";
import ElectricityStep from "./track/steps/ElectricityStep";
import WasteStep from "./track/steps/WasteStep";
import PlasticStep from "./track/steps/PlasticStep";
import TrackSkeleton from "./track/TrackSkeleton";

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
    hint: "Mostly reusable alternatives",
  },
  {
    value: "medium",
    label: "Medium",
    Icon: Circle,
    color: "border-yellow-400 bg-yellow-50 text-yellow-700",
    hint: "Occasional single-use plastics",
  },
  {
    value: "high",
    label: "High",
    Icon: TriangleAlert,
    color: "border-red-400 bg-red-50 text-red-700",
    hint: "Frequent packaged purchases",
  },
];

const FORM_STEPS = [
  {
    key: "transportation",
    label: "Transportation",
    title: "Transportation Activity",
    description: "Capture how far and how you travel each day.",
    Icon: Car,
  },
  {
    key: "electricity",
    label: "Electricity",
    title: "Electricity Usage",
    description: "Estimate your average household power consumption.",
    Icon: Zap,
  },
  {
    key: "waste",
    label: "Waste",
    title: "Waste Generation",
    description: "Provide weekly waste output to complete your profile.",
    Icon: Trash2,
  },
  {
    key: "plastic",
    label: "Plastic",
    title: "Plastic Consumption",
    description: "Select the level that best matches your daily usage.",
    Icon: Package,
  },
];

const generateTrendFromTotal = (totalCO2) => [
  { week: "Week 1", value: Number((totalCO2 * 1.19).toFixed(1)) },
  { week: "Week 2", value: Number((totalCO2 * 1.1).toFixed(1)) },
  { week: "Week 3", value: Number(totalCO2) },
];

const InputForm = ({ isLoading = false }) => {
  if (isLoading) {
    return <TrackSkeleton />;
  }

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
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateAll = () => {
    const e = {};

    if (!form.transportType) {
      e.transportType = "Please select a transport type.";
    }

    if (!form.distance || isNaN(form.distance) || Number(form.distance) < 0) {
      e.distance = "Enter a valid daily distance (km).";
    }

    if (
      !form.electricity ||
      isNaN(form.electricity) ||
      Number(form.electricity) < 0
    ) {
      e.electricity = "Enter a valid daily electricity usage (kWh).";
    }

    if (!form.waste || isNaN(form.waste) || Number(form.waste) < 0) {
      e.waste = "Enter a valid weekly waste amount (kg).";
    }

    return e;
  };

  const validateStep = (stepIndex) => {
    const allErrors = validateAll();

    if (stepIndex === 0) {
      return {
        transportType: allErrors.transportType,
        distance: allErrors.distance,
      };
    }

    if (stepIndex === 1) {
      return {
        electricity: allErrors.electricity,
      };
    }

    if (stepIndex === 2) {
      return {
        waste: allErrors.waste,
      };
    }

    return {};
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setSubmitError("");
  };

  const handlePlastic = (value) => {
    setForm((prev) => ({ ...prev, plastic: value }));
    setSubmitError("");
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    const filteredErrors = Object.fromEntries(
      Object.entries(stepErrors).filter(([, message]) => Boolean(message)),
    );

    if (Object.keys(filteredErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...filteredErrors }));
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    const inputs = {
      transportType: form.transportType,
      distance: Number(form.distance),
      electricity: Number(form.electricity),
      waste: Number(form.waste),
      plastic: form.plastic,
    };

    try {
      const calculateResponse = await calculateCarbonApi(inputs);
      const results = calculateResponse?.data?.results;
      const insightSummary =
        calculateResponse?.data?.insight?.summary ||
        "Your latest footprint has been calculated successfully.";

      if (!results) {
        throw new Error("Could not calculate footprint from server.");
      }

      const trend = generateTrendFromTotal(results.totalCO2);

      const payload = {
        ...results,
        insight: insightSummary,
        trend,
        inputs,
      };

      localStorage.setItem("ecotrack_result", JSON.stringify(payload));

      await saveCarbonResult({
        inputs,
        results,
        insight: insightSummary,
        trend,
      });

      if (requestedFeature === "advisor") {
        navigate("/ai-advisor");
      } else if (requestedFeature === "simulator") {
        navigate("/reduction-simulator");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.warn("Submit flow failed:", err.message);
      setSubmitError(err.message || "Could not process your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activeStep = FORM_STEPS[currentStep];

  const stepContent = (() => {
    if (currentStep === 0) {
      return (
        <TransportationStep
          form={form}
          errors={errors}
          onChange={handleChange}
          transportOptions={TRANSPORT_OPTIONS}
        />
      );
    }

    if (currentStep === 1) {
      return (
        <ElectricityStep form={form} errors={errors} onChange={handleChange} />
      );
    }

    if (currentStep === 2) {
      return <WasteStep form={form} errors={errors} onChange={handleChange} />;
    }

    return (
      <PlasticStep
        form={form}
        onPlastic={handlePlastic}
        plasticOptions={PLASTIC_OPTIONS}
      />
    );
  })();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_38%)]" />

      <div className="relative mx-auto w-full max-w-7xl p-3 max-[359px]:p-2.5 sm:p-4 lg:p-6">
        <div className="mx-auto w-full max-w-4xl space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm max-[359px]:p-2.5 sm:p-4 lg:p-6">
            <div className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-emerald-700 max-[359px]:px-3 max-[359px]:text-[10px] sm:mb-4">
              CARBON TRACKER
            </div>
            <h1 className="mb-2 text-lg font-bold text-slate-900 max-[359px]:text-base sm:text-xl lg:text-2xl">
              Daily Emission Input Wizard
            </h1>
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-500 max-[359px]:text-[11px] sm:text-sm">
              Complete this guided workflow to generate a precise carbon footprint baseline,
              insights, and personalized recommendations.
            </p>
          </div>

          <div>
            <Stepper steps={FORM_STEPS} currentStep={currentStep} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <StepCard
              stepKey={activeStep.key}
              direction={direction}
              title={activeStep.title}
              description={activeStep.description}
              Icon={activeStep.Icon}
            >
              {submitError && (
                <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 max-[359px]:p-2.5 max-[359px]:text-[11px] sm:mb-4 sm:text-sm">
                  {submitError}
                </div>
              )}

              {stepContent}

              <NavigationButtons
                currentStep={currentStep}
                totalSteps={FORM_STEPS.length}
                onNext={handleNext}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </StepCard>
          </form>

          <div className="grid grid-cols-1 gap-4 text-xs text-slate-500 max-[359px]:gap-3 max-[359px]:text-[11px] sm:text-sm md:grid-cols-2">
            <div className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white/85 p-3 shadow-sm max-[359px]:gap-1.5 max-[359px]:p-2.5 sm:p-4 lg:p-6">
              <span className="icon-shell icon-tone-green mt-0.5 rounded-full w-5 h-5">
                <ShieldCheck className="w-3 h-3" />
              </span>
              <span>
                Your activity data is used only to estimate impact and serve tailored
                recommendations. Privacy is preserved by design.
              </span>
            </div>

            <div className="flex items-start gap-2 rounded-2xl border border-slate-200/70 bg-white/85 p-3 shadow-sm max-[359px]:gap-1.5 max-[359px]:p-2.5 sm:p-4 lg:p-6">
              <span className="icon-shell icon-tone-blue mt-0.5 rounded-full w-5 h-5">
                <BarChart3 className="w-3 h-3" />
              </span>
              <div>
                <span className="font-semibold text-slate-700">Quick Preview</span>
                <p>Carbon result cards and trends appear instantly on the dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
