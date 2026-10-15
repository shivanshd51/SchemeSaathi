import React from 'react';
import { ShieldCheck, Info, ExternalLink } from 'lucide-react';

export default function TrustBanner({ language = 'en' }) {
  const isHindi = language === 'hi';

  return (
    <div className="bg-leaf-50 border-b border-leaf-100 text-xs sm:text-sm text-leaf-800 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-leaf-600 flex-shrink-0" />
          <span>
            {isHindi ? (
              <>
                <strong>आधिकारिक मार्गदर्शन:</strong> योजना साथी केवल मार्गदर्शन प्रदान करता है। पात्रता और स्वीकृति का अंतिम निर्णय संबंधित सरकारी विभाग द्वारा किया जाता है।
              </>
            ) : (
              <>
                <strong>Informational Guidance:</strong> SchemeSaathi never guarantees eligibility or payment. Requirements must always be verified on official government portals.
              </>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-leaf-700 font-medium">
          <span className="hidden md:inline-flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-leaf-200">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-600 animate-pulse"></span>
            Pilot Active: Pune District
          </span>
          <span className="text-leaf-600">Zero data tracking • 100% Free</span>
        </div>
      </div>
    </div>
  );
}
