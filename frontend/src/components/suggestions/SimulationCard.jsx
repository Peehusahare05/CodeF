import React from "react";

const SimulationCard = ({ current = 42, after = 30, saved = 12 }) => {
  const progress = Math.max(0, Math.min(100, (saved / (current || 1)) * 100));
  return (
    <div className="rounded-2xl bg-[#0b1735] text-white shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6">
        What Happens If You Change Your Habits?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Currently
          </p>
          <p className="text-5xl font-extrabold">{current} kg CO2</p>
        </div>
        <div>
          <div className="h-2 rounded-full bg-[#1b2a55] overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="inline-flex rounded-full bg-green-900/40 text-green-300 px-3 py-1 text-xs font-semibold">
            {saved} kg CO2 saved
          </div>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            After Changes
          </p>
          <p className="text-5xl font-extrabold text-green-400">
            {after} kg CO2
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
