import React from "react";

const SliderRow = ({ icon: Icon, label, value, onChange, max = 100 }) => {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:gap-3 sm:rounded-xl sm:p-4 sm:flex-row sm:items-center lg:gap-4 lg:p-4">
            {/* Icon + Label */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 sm:h-9 sm:w-9">
                    {React.createElement(Icon, {
                        className: "h-4 w-4 sm:h-5 sm:w-5",
                    })}
                </span>
                <span className="text-xs font-medium text-slate-800 sm:text-sm">{label}</span>
            </div>

            {/* Slider */}
            <div className="flex flex-1 items-center gap-3 sm:gap-4">
                <input
                    type="range"
                    min="0"
                    max={max}
                    step="1"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-800"
                />
                <span className="w-8 text-right text-xs font-semibold text-slate-900 sm:w-10 sm:text-sm">
                    {value}%
                </span>
            </div>
        </div>
    );
};

export default SliderRow;
