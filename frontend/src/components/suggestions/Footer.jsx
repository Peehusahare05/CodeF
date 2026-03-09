import React from "react";
import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-400">
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 rounded-md bg-green-100 text-green-700 flex items-center justify-center">
        <Leaf className="w-3 h-3" />
      </span>
      <span>EcoTrack Sustainability Hub © 2024</span>
    </div>
    <div className="flex items-center gap-5">
      <a href="#" className="hover:text-slate-600">
        Privacy Policy
      </a>
      <a href="#" className="hover:text-slate-600">
        Methodology
      </a>
      <a href="#" className="hover:text-slate-600">
        Community
      </a>
    </div>
  </footer>
);

export default Footer;
