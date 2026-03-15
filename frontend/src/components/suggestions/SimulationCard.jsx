import React from "react";

const SimulationCard = ({ current = 42, after = 30, saved = 12 }) => {
  const progress = Math.max(0, Math.min(100, (saved / (current || 1)) * 100));
  return (
    <div className="surface-card p-6">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        What Happens If You Change Your Habits?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Currently
          </p>
          <p className="text-4xl font-extrabold text-slate-900">{current} kg CO2</p>
        </div>
        <div>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-green-600"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {saved} kg CO2 saved
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            After Changes
          </p>
          <p className="text-4xl font-extrabold text-green-700">
            {after} kg CO2
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
