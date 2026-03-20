import React from "react";

const ElectricityStep = ({ form, errors, onChange }) => {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
                Average Daily Electricity Usage (kWh)
            </label>
            <input
                type="number"
                name="electricity"
                value={form.electricity}
                onChange={onChange}
                placeholder="e.g. 8.5"
                min="0"
                step="0.1"
                className="input-control"
            />
            <p className="mt-1 text-xs text-slate-400">
                Use your monthly bill estimate and divide by the number of days.
            </p>
            {errors.electricity && (
                <p className="mt-1 text-xs text-red-500">{errors.electricity}</p>
            )}
        </div>
    );
};

export default ElectricityStep;
