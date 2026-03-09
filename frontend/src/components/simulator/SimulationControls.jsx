import { Car, Zap, Trash2, Home } from "lucide-react";

const SimulationControls = ({ changes, onChangeUpdate }) => {
  const transportOptions = [
    { value: "none", label: "No Change", reduction: 0 },
    { value: "carpool", label: "Carpool 2x/week", reduction: 20 },
    { value: "public", label: "Public Transport", reduction: 40 },
    { value: "bike", label: "Bike/Walk", reduction: 60 },
    { value: "ev", label: "Electric Vehicle", reduction: 50 },
  ];

  const frequencyOptions = [
    { value: "daily", label: "Daily", multiplier: 1 },
    { value: "weekly", label: "2-3x/Week", multiplier: 0.4 },
    { value: "occasional", label: "Occasional", multiplier: 0.2 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Simulation Controls
      </h2>

      {/* Transportation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-600" />
          <label className="font-semibold text-gray-700">
            Transportation Change
          </label>
        </div>
        <select
          value={changes.transport}
          onChange={(e) => onChangeUpdate("transport", e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {transportOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} {option.reduction > 0 && `(-${option.reduction}%)`}
            </option>
          ))}
        </select>
      </div>

      {/* Frequency Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-purple-600" />
          <label className="font-semibold text-gray-700">
            Commute Frequency
          </label>
        </div>
        <div className="flex gap-2">
          {frequencyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChangeUpdate("frequency", option.value)}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                changes.frequency === option.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Energy Reduction Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <label className="font-semibold text-gray-700">
              Energy Reduction
            </label>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {changes.energy}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={changes.energy}
          onChange={(e) => onChangeUpdate("energy", parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${changes.energy * 2}%, #e5e7eb ${changes.energy * 2}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>No Change</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </div>

      {/* Waste Policy Toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-green-600" />
          <label className="font-semibold text-gray-700">
            Zero-Waste Policy
          </label>
        </div>
        <button
          onClick={() => onChangeUpdate("waste", !changes.waste)}
          className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${
            changes.waste
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {changes.waste ? "✓ Enabled (Composting + Recycling)" : "Disabled"}
        </button>
        {changes.waste && (
          <p className="text-sm text-green-600 bg-green-50 rounded-lg p-3">
            Reduces waste emissions by ~30% through composting and strict
            recycling
          </p>
        )}
      </div>

      {/* Renewable Energy Toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-600" />
          <label className="font-semibold text-gray-700">
            Renewable Energy
          </label>
        </div>
        <button
          onClick={() => onChangeUpdate("renewable", !changes.renewable)}
          className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${
            changes.renewable
              ? "bg-orange-600 text-white shadow-md"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {changes.renewable ? "✓ Switch to Solar/Wind" : "Disabled"}
        </button>
        {changes.renewable && (
          <p className="text-sm text-orange-600 bg-orange-50 rounded-lg p-3">
            Reduces electricity emissions by ~70% with clean energy sources
          </p>
        )}
      </div>
    </div>
  );
};

export default SimulationControls;
