import React from "react";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const SimulatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="icon-shell icon-shell-lg icon-tone-yellow rounded-full mb-4 shadow-sm">
        <BarChart3 className="icon-glyph-lg" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
        Reduction Simulator
      </h1>
      <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-8">
        Your carbon footprint data has been tracked. We are preparing the
        interactive simulation environment to let you visualize how lifestyle
        changes will impact your eco score.
      </p>
      <Link
        to="/dashboard"
        className="bg-green-600 text-white font-semibold py-2 px-5 sm:px-6 rounded-full hover:bg-green-700 transition shadow"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default SimulatorPage;
