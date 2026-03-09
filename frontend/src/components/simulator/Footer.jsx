import { Leaf, Info, HelpCircle, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-gray-600 text-sm">
              © 2024 EcoTrack. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              <Info className="w-4 h-4" />
              About
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              <Shield className="w-4 h-4" />
              Privacy
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Simulation results are estimates based on average data. Actual
            results may vary based on individual circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
