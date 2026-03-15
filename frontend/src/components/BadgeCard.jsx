import React from "react";

const BadgeCard = ({ icon, title, desc, bg }) => (
  <div className="surface-card flex min-h-[140px] flex-col items-center p-6 text-center">
    <div
      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${bg}`}
    >
      {icon}
    </div>
    <div className="font-bold text-base text-slate-800 mb-1">{title}</div>
    <div className="text-xs text-slate-500">{desc}</div>
  </div>
);

export default BadgeCard;
