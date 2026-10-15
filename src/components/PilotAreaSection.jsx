import React from 'react';
import { MapPin, CheckCircle, Info, Sparkles, Edit3, Globe, Compass } from 'lucide-react';

export default function PilotAreaSection({ 
  selectedPilot, 
  setSelectedPilot, 
  pilotRegions, 
  onStartQuiz,
  onOpenCustomLocationModal,
  language 
}) {
  const isHindi = language === 'hi';

  return (
    <section className="py-14 bg-cream-200/60 border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mission & Trust Promise */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-leaf-100 text-leaf-800 border border-leaf-200 mb-3">
              <MapPin className="w-3.5 h-3.5 text-leaf-600" />
              <span>Location Adaptability & Pilot Focus</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 tracking-tight">
              {isHindi ? 'किसी भी राज्य व जिले के लिए अनुकूलित' : 'Built for your area — enter any State and District'}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-ink-700 leading-relaxed">
              Whether you reside in our active physical pilot in <strong>{selectedPilot.district}</strong> or anywhere across India, 
              SchemeSaathi automatically maps your state and district to relevant central, state, and regional benefits.
            </p>

            <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-ink-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-600 flex-shrink-0" />
                <span>
                  Currently selected location: <strong>{selectedPilot.district}, {selectedPilot.state}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-600 flex-shrink-0" />
                <span>Coverage includes verified Central Schemes (All-India) and State-specific programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-leaf-600 flex-shrink-0" />
                <span>Option to input <strong>any</strong> of India's 28 States, 8 UTs, and 700+ districts</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartQuiz}
                className="px-5 py-2.5 rounded-xl bg-ink-900 hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-soft transition"
              >
                Find Schemes for {selectedPilot.district}
              </button>
              <button
                onClick={onOpenCustomLocationModal}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-ink-900 text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-leaf-600" />
                <span>Enter Other State / District</span>
              </button>
            </div>
          </div>

          {/* Right Column: Location Cards & Custom Selector Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-soft space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
                  Select Location or Put Any Custom District
                </span>
                <button
                  onClick={onOpenCustomLocationModal}
                  className="text-xs font-bold text-leaf-700 hover:text-leaf-800 flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Custom input</span>
                </button>
              </div>

              {/* Current Active Location Highlight Card */}
              <div className="p-4 rounded-xl bg-leaf-50/70 border border-leaf-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-leaf-700">
                    Active Location Context
                  </span>
                  <p className="text-base font-extrabold text-ink-950">
                    {selectedPilot.district}, {selectedPilot.state}
                  </p>
                  <p className="text-xs text-ink-600 mt-0.5">
                    {selectedPilot.activePilot ? 'Physical student pilot desk active' : 'Custom user-specified region'}
                  </p>
                </div>
                <button
                  onClick={onOpenCustomLocationModal}
                  className="px-3 py-1.5 rounded-lg bg-leaf-600 text-white font-bold text-xs hover:bg-leaf-700 shadow-sm"
                >
                  Change
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div>
                <span className="text-[11px] font-bold text-ink-400 uppercase tracking-wider block mb-2">
                  Featured Pilot Hubs:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {pilotRegions.map((region) => {
                    const isSelected = selectedPilot.district === region.district && selectedPilot.state === region.state;
                    return (
                      <button
                        key={`${region.state}-${region.district}`}
                        onClick={() => setSelectedPilot(region)}
                        className={`text-left p-2.5 rounded-xl border transition-all text-xs ${
                          isSelected 
                            ? 'border-leaf-600 bg-leaf-100/60 font-bold text-leaf-900 ring-1 ring-leaf-500' 
                            : 'border-cream-300 bg-cream-50 hover:bg-cream-100 text-ink-700'
                        }`}
                      >
                        <p className="truncate font-semibold">{region.district}</p>
                        <span className="text-[10px] text-ink-500">{region.state.slice(0, 10)}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={onOpenCustomLocationModal}
                    className="text-left p-2.5 rounded-xl border border-dashed border-leaf-400 bg-leaf-50/40 hover:bg-leaf-100/50 text-leaf-800 text-xs font-bold flex flex-col justify-center items-center text-center transition"
                  >
                    <span>+ Any Location</span>
                    <span className="text-[10px] font-normal text-leaf-600">Type state/dist</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-citrus-50 rounded-xl border border-citrus-200 text-xs text-citrus-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-citrus-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Tip:</strong> You can enter any village, tehsil, city, or district name. Central All-India schemes and state schemes will automatically adjust.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
