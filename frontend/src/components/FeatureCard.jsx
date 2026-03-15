// FeatureCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, desc, iconBg, targetRoute }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(targetRoute)}
      className="surface-card group cursor-pointer p-6 text-center transition-colors hover:bg-gray-50"
    >
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
};

export default FeatureCard;
