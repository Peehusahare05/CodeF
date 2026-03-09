// FeatureCard.jsx
import React from "react";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-7 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600 text-sm">{desc}</p>
  </div>
);

export default FeatureCard;
