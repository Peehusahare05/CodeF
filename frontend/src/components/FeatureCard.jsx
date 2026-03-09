// FeatureCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, desc, iconBg, targetRoute }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(targetRoute)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer group"
    >
      <div
        className={`mb-4 flex items-center justify-center w-14 h-14 rounded-full ${iconBg} shadow-inner backdrop-blur group-hover:scale-105 transition-all duration-300`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
};

export default FeatureCard;
