import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const AIAdvisorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="icon-shell icon-shell-lg icon-tone-blue rounded-full mb-4 shadow-sm">
        <Brain className="icon-glyph-lg" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
        AI Advisor
      </h1>
      <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-8">
        Your personalized AI guidance is currently being generated. Check back
        shortly to receive custom eco-friendly decisions tailored directly to
        your environmental impact data.
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

export default AIAdvisorPage;
