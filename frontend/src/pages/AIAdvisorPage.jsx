import React from "react";
import { Link } from "react-router-dom";

const AIAdvisorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm">
        🧠
      </div>
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">AI Advisor</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Your personalized AI guidance is currently being generated. Check back shortly to receive custom eco-friendly decisions tailored directly to your environmental impact data.
      </p>
      <Link
        to="/dashboard"
        className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 transition shadow"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default AIAdvisorPage;
