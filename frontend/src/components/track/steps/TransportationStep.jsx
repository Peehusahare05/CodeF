import React from "react";

const TransportationStep = ({ form, errors, onChange, transportOptions }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">
                    Transport Type
                </label>
                <select
                    name="transportType"
                    value={form.transportType}
                    onChange={onChange}
                    className="input-control"
                >
                    <option value="">Select your transport</option>
                    {transportOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.transportType && (
                    <p className="mt-1 text-xs text-red-500">{errors.transportType}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">
                    Daily Distance (km)
                </label>
                <input
                    type="number"
                    name="distance"
                    value={form.distance}
                    onChange={onChange}
                    placeholder="e.g. 15"
                    min="0"
                    className="input-control"
                />
                <p className="mt-1 text-xs text-slate-400">Average per day commute distance.</p>
                {errors.distance && <p className="mt-1 text-xs text-red-500">{errors.distance}</p>}
            </div>
        </div>
    );
};

export default TransportationStep;
