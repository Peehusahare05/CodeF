// LeaderboardCard.jsx
import React from "react";

const LeaderboardCard = ({ rank, name, points, avatar }) => (
  <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 mb-3">
    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg font-bold text-green-700">
      {avatar}
    </div>
    <div className="flex-1">
      <div className="font-semibold text-slate-800">{name}</div>
      <div className="text-xs text-slate-500">#{rank}</div>
    </div>
    <div className="font-bold text-green-600 text-lg">
      {points}{" "}
      <span className="text-xs font-normal text-slate-500">points</span>
    </div>
  </div>
);

export default LeaderboardCard;
