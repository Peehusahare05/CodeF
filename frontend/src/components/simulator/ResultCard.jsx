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
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">Projected Results</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:rounded-xl sm:p-4 lg:p-5"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 sm:h-9 sm:w-9">
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 sm:mt-3">
                                {item.label}
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base lg:text-lg">
                                {item.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResultCard;
