import React from "react";
import { Bike, Bolt, Leaf, Recycle } from "lucide-react";

const BADGE_LABEL = {
  eco: "Eco",
  bike: "Mobility",
  bolt: "Energy",
  recycle: "Waste",
};

const badgeIcons = {
  eco: <Leaf className="h-3.5 w-3.5" />,
  bike: <Bike className="h-3.5 w-3.5" />,
  bolt: <Bolt className="h-3.5 w-3.5" />,
  recycle: <Recycle className="h-3.5 w-3.5" />,
};

const getAvatarUrl = (name) => {
  const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=16a34a&color=fff`;
  return { dicebear, fallback };
};

const LeaderboardRow = ({ rank, name, score, badges }) => {
  const { dicebear, fallback } = getAvatarUrl(name);
  const scorePercent = Math.max(0, Math.min(100, Number(score || 0)));
  const topBadge = badges?.[0] || "eco";

  return (
    <div className="grid grid-cols-12 items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50/80 max-[359px]:gap-2 max-[359px]:px-2.5 max-[359px]:py-2.5 md:px-5">
      <div className="col-span-2 sm:col-span-1">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600 max-[359px]:h-7 max-[359px]:min-w-7 max-[359px]:px-1.5 max-[359px]:text-[11px]">
          {rank}
        </span>
      </div>

      <div className="col-span-8 flex min-w-0 items-center gap-3 max-[359px]:gap-2 sm:col-span-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white max-[359px]:h-8 max-[359px]:w-8">
          <img
            src={dicebear}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }}
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 max-[359px]:text-xs">{name}</p>
          <p className="text-xs text-slate-500 max-[359px]:text-[11px]">Rank #{rank}</p>
        </div>
      </div>

      <div className="col-span-7 hidden sm:col-span-3 sm:block">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">{score}</span>
          <span className="text-slate-500">/100</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-700"
            style={{ width: `${scorePercent}%` }}
          />
        </div>
      </div>

      <div className="col-span-2 hidden sm:col-span-2 sm:flex sm:justify-end">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
          {badgeIcons[topBadge]}
          {BADGE_LABEL[topBadge]}
        </span>
      </div>

      <div className="col-span-2 text-right text-sm font-semibold text-slate-700 max-[359px]:text-xs sm:hidden">
        {score}
      </div>
    </div>
  );
};

export default LeaderboardRow;
