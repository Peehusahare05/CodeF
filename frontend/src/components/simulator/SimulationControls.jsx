import React from "react";
import { Car, Zap, Trash2, ShoppingBag } from "lucide-react";

const SimulationControls = ({ changes, onChangeUpdate }) => {
  const categories = [
    {
      key: "transportation",
      label: "Transportation",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Reduce km usage through public transit, carpooling, or biking",
      unit: "% reduction",
    },
    {
      key: "electricity",
      label: "Electricity",
      icon: Zap,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Reduce kWh consumption with efficient habits and devices",
      unit: "% reduction",
    },
    {
      key: "waste",
      label: "Waste",
      icon: Trash2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Reduce landfill waste through better segregation and composting",
      unit: "% reduction",
    },
  ];

  const plasticOptions = [
    { value: "current", label: "No Change", reduction: 0 },
    { value: "medium", label: "Reduce by 30%", reduction: 30 },
    { value: "low", label: "Reduce by 60%", reduction: 60 },
  ];

  return (
    <div className="surface-card p-6">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Adjust Your Lifestyle
      </h2>

      <div className="space-y-6">
        {/* Slider Controls */}
        {categories.map((category) => {
          const Icon = category.icon;
          const value = changes[category.key];

          return (
            <div key={category.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${category.bgColor} rounded-lg p-2.5`}>
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900">
                      {category.label}
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold text-slate-900">
                    {value}
                  </span>
                  <span className="text-xs text-slate-500">{category.unit}</span>
                </div>
              </div>

              {/* Slider */}
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) =>
                    onChangeUpdate(category.key, parseInt(e.target.value, 10))
                  }
                  className="slider-thumb w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${value}%, rgba(226, 232, 240, 0.4) ${value}%, rgba(226, 232, 240, 0.4) 100%)`,
                  }}
                />
              </div>

              {/* Quick Controls */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "0%", val: 0 },
                  { label: "25%", val: 25 },
                  { label: "50%", val: 50 },
                  { label: "Max", val: 100 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => onChangeUpdate(category.key, preset.val)}
                    className={`rounded-full border text-xs font-medium px-3 py-1.5 transition-all ${value === preset.val
                      ? `${category.bgColor} border-current ${category.color} shadow-sm`
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Plastic Toggle */}
        <div className="border-t border-slate-100 pt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-sky-50 rounded-lg p-2.5">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900">
                Plastic Usage
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Switch to reusables and reduce single-use packaging
              </p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 flex-wrap">
            {plasticOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onChangeUpdate("plastic", option.value)}
                className={`flex-1 rounded-lg border text-sm font-medium px-4 py-2.5 transition-all ${changes.plastic === option.value
                  ? "bg-sky-100 border-sky-300 text-sky-700 shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                {option.label}
                {option.reduction > 0 && (
                  <span className="ml-1 text-xs opacity-75">
                    (-{option.reduction}%)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-900">
          💡 Tip: Start with one category to see how manageable changes can make a real difference.
        </p>
      </div>
    </div>
  );
};

export default SimulationControls;
