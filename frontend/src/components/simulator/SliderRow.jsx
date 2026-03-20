import React from "react";

const SliderRow = ({ icon: Icon, label, value, onChange, max = 100 }) => {
    return (
        <div className="grid grid-cols-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="col-span-7 flex items-center gap-2 sm:col-span-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-800">{label}</span>
            </div>

            <div className="col-span-3 sm:col-span-5">
                <input
                    type="range"
                    min="0"
                    max={max}
                    step="1"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-800"
                />
            </div>

            <div className="col-span-2 text-right">
                <span className="text-sm font-semibold text-slate-900">{value}%</span>
            </div>
        </div>
    );
};

export default SliderRow;
