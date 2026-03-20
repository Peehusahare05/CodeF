import React from "react";

const WasteStep = ({ form, errors, onChange }) => {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
                Weekly Waste Generated (kg)
            </label>
            <input
                type="number"
                name="waste"
                value={form.waste}
                onChange={onChange}
                placeholder="e.g. 5"
                min="0"
                step="0.1"
                className="input-control"
            />
            <p className="mt-1 text-xs text-slate-400">
                Estimate non-recyclable waste generated in one week.
            </p>
            {errors.waste && <p className="mt-1 text-xs text-red-500">{errors.waste}</p>}
        </div>
    );
};

export default WasteStep;
