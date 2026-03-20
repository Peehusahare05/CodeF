import React from "react";
import { TrendingUp, TrendingDown, Circle } from "lucide-react";

const ComparisonCard = ({ label, value, ecoScore, type = "current" }) => {
    const isProjected = type === "projected";
    const borderColor = isProjected ? "border-green-200" : "border-slate-200";
    const bgColor = isProjected ? "bg-green-50" : "bg-white";
    const badgeBg = isProjected ? "bg-green-100" : "bg-slate-100";
    const badgeText = isProjected ? "text-green-700" : "text-slate-700";
    const icon = isProjected ? (
        <TrendingDown className="w-6 h-6 text-green-600" />
    ) : (
        <TrendingUp className="w-6 h-6 text-slate-400" />
    );

    return (
        <article className={`surface-card border ${borderColor} ${bgColor} p-6 transition-all duration-300`}>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">{value.toFixed(2)}</span>
                        <span className="text-lg text-slate-600">kg CO₂/week</span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${badgeBg}`}>{icon}</div>
            </div>

            {/* Eco Score Section */}
            <div className="rounded-lg border border-slate-100 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Eco Score
                        </p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">{ecoScore}</span>
                            <span className="text-sm text-slate-600">/100</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${isProjected ? "bg-green-500" : "bg-slate-400"
                                    }`}
                                style={{ width: `${(ecoScore / 100) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs text-slate-500">Progress</span>
                    </div>
                </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4 flex items-center gap-2">
                <Circle
                    className={`w-2.5 h-2.5 ${isProjected ? "fill-green-500 text-green-500" : "fill-slate-400 text-slate-400"}`}
                />
                <span className={`text-xs font-medium ${isProjected ? "text-green-700" : "text-slate-600"}`}>
                    {isProjected ? "Potential Target" : "Current State"}
                </span>
            </div>
        </article>
    );
};

export default ComparisonCard;
