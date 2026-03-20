import React from "react";

const getAvatarUrl = (name) => {
    const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff`;
    return { dicebear, fallback };
};

const TopUserCard = ({ rank, name, score, isLeader }) => {
    const { dicebear, fallback } = getAvatarUrl(name);
    const scorePercent = Math.max(0, Math.min(100, Number(score || 0)));

    return (
        <div
            className={`rounded-2xl border bg-white p-5 shadow-[0_12px_34px_-26px_rgba(15,23,42,0.8)] transition-transform hover:-translate-y-0.5 ${isLeader ? "border-slate-300" : "border-slate-200"
                }`}
        >
            <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-600">
                    {rank}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Top User
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
                    <img
                        src={dicebear}
                        alt={name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallback;
                        }}
                    />
                </span>

                <div>
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-500">Eco Score {score}</p>
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Performance</span>
                    <span className="text-slate-500">{score}/100</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-slate-800" style={{ width: `${scorePercent}%` }} />
                </div>
            </div>
        </div>
    );
};

export default TopUserCard;
