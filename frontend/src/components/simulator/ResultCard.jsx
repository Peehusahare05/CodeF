import { CalendarRange, DollarSign, Leaf } from "lucide-react";

const ResultCard = ({ monthly, yearly, cost }) => {
    const items = [
        {
            label: "Monthly Reduction",
            value: `${monthly.toFixed(1)} kg`,
            icon: CalendarRange,
        },
        {
            label: "Yearly Reduction",
            value: `${yearly.toFixed(0)} kg`,
            icon: Leaf,
        },
        {
            label: "Estimated Cost Savings",
            value: `$${cost.toFixed(0)} / year`,
            icon: DollarSign,
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-22px_rgba(15,23,42,0.7)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Projected Results</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600">
                                <Icon className="h-4 w-4" />
                            </span>
                            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">{item.value}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResultCard;
