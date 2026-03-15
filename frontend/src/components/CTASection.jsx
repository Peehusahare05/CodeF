import React from "react";

const CTASection = () => (
  <section className="max-w-5xl mx-auto px-4 mb-12 md:mb-16">
    <div className="bg-gradient-to-tr from-green-500 to-green-400 rounded-2xl shadow-xl p-5 sm:p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">
          Improve Your Eco Score and Climb the Leaderboard
        </h2>
        <p className="text-sm sm:text-base text-green-50 mb-4 max-w-md">
          Every small action counts. Log your activities today and see how you
          rank against the community.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <button className="w-full rounded-full bg-white px-5 py-2.5 text-base font-bold text-green-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto sm:px-7 sm:py-3 sm:text-lg">
          Start Tracking
        </button>
        <button className="w-full rounded-full bg-green-50 px-5 py-2.5 text-base font-bold text-green-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto sm:px-7 sm:py-3 sm:text-lg">
          View Carbon Dashboard
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
    </div>
  </section>
);

export default CTASection;
