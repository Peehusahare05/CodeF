import React from "react";
import { Medal, Bike, Bolt, Recycle, Leaf } from "lucide-react";

const badgeIcons = {
  eco: <Leaf className="w-5 h-5 text-green-600" />,
  bike: <Bike className="w-5 h-5 text-blue-500" />,
  bolt: <Bolt className="w-5 h-5 text-yellow-500" />,
  recycle: <Recycle className="w-5 h-5 text-green-400" />,
};

const getAvatarUrl = (name) => {
  const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=16a34a&color=fff`;
  return { dicebear, fallback };
};

const LeaderboardRow = ({ rank, name, score, badges }) => {
  const { dicebear, fallback } = getAvatarUrl(name);
  return (
    <div className="grid grid-cols-1 gap-3 px-4 py-4 transition-colors hover:bg-gray-50 sm:grid-cols-12 sm:items-center sm:gap-2 sm:px-6">
      <div className="sm:col-span-1">
        <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 sm:bg-transparent sm:px-0 sm:py-0 sm:text-base sm:text-slate-500">
          #{rank}
        </span>
      </div>
      <div className="sm:col-span-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-green-200 bg-white">
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
        <span className="font-medium text-slate-800">{name}</span>
      </div>
      <div className="sm:col-span-4 flex flex-wrap gap-2">
        {badges &&
          badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100"
            >
              {badgeIcons[b]}
            </span>
          ))}
      </div>
      <div className="sm:col-span-3 text-left sm:text-right font-bold text-green-700 text-lg">
        {score}
      </div>
    </div>
  );
};

export default LeaderboardRow;
