import React from "react";

const PlasticStep = ({ form, onPlastic, plasticOptions }) => {
    return (
        <div className="grid grid-cols-1 gap-3 max-[359px]:gap-2.5 sm:grid-cols-3">
            {plasticOptions.map((opt) => (
                <button
                    type="button"
                    key={opt.value}
                    onClick={() => onPlastic(opt.value)}
                    className={`rounded-2xl border-2 px-4 py-5 text-left transition-all max-[359px]:px-3 max-[359px]:py-4 ${form.plastic === opt.value
                        ? opt.color
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                >
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-700 max-[359px]:mb-2 max-[359px]:h-8 max-[359px]:w-8">
                        <opt.Icon className="h-5 w-5 max-[359px]:h-4 max-[359px]:w-4" />
                    </span>
                    <p className="text-sm font-semibold max-[359px]:text-xs">{opt.label}</p>
                    <p className="mt-1 text-xs opacity-80 max-[359px]:text-[11px]">{opt.hint}</p>
                </button>
            ))}
        </div>
    );
};

export default PlasticStep;
