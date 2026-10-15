import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Search, Sparkles, Building2, Globe } from 'lucide-react';
import { ALL_INDIAN_STATES, POPULAR_DISTRICTS } from '../data/locations';
import { PILOT_REGIONS } from '../data/schemes';

export default function CustomLocationModal({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onSaveLocation 
}) {
  const [mode, setMode] = useState('custom'); // 'custom' or 'pilots'
  
  // Custom location state
  const [stateInput, setStateInput] = useState(currentLocation.state || 'Maharashtra');
  const [districtInput, setDistrictInput] = useState(currentLocation.district || 'Pune');
  const [customStateMode, setCustomStateMode] = useState(false);
  const [customStateText, setCustomStateText] = useState('');

  if (!isOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    const finalState = customStateMode && customStateText.trim() ? customStateText.trim() : stateInput;
    const finalDistrict = districtInput.trim() ? districtInput.trim() : 'Central';

    // Check if matches an active physical pilot desk
    const isPilot = PILOT_REGIONS.some(
      p => p.state.toLowerCase() === finalState.toLowerCase() && 
           p.district.toLowerCase() === finalDistrict.toLowerCase()
    );

    onSaveLocation({
      state: finalState,
      district: finalDistrict,
      isCustom: true,
      activePilot: isPilot
    });

    onClose();
  };

  const handleSelectPilot = (pilot) => {
    onSaveLocation({
      state: pilot.state,
      district: pilot.district,
      isCustom: false,
      activePilot: pilot.activePilot
    });
    onClose();
  };

  const currentDistSuggestions = POPULAR_DISTRICTS[stateInput] || [];

  return (
    <div className="fixed inset-0 z-60 bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-cream-300 shadow-lift w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-cream-50 border-b border-cream-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-leaf-100 text-leaf-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-ink-950">
                Choose or Enter Any Location
              </h3>
              <p className="text-xs text-ink-500">
                SchemeSaathi adapts to any State and District
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-400 hover:text-ink-900 hover:bg-cream-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Custom Location vs Active Pilots */}
        <div className="px-6 pt-4 flex gap-2 text-xs font-bold border-b border-cream-200 pb-3">
          <button
            onClick={() => setMode('custom')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              mode === 'custom' 
                ? 'bg-leaf-600 text-white shadow-sm' 
                : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
            }`}
          >
            Enter Any State & District
          </button>
          <button
            onClick={() => setMode('pilots')}
            className={`px-3.5 py-1.5 rounded-xl transition ${
              mode === 'pilots' 
                ? 'bg-leaf-600 text-white shadow-sm' 
                : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
            }`}
          >
            Featured Pilot Desks
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-xs">
          
          {mode === 'custom' ? (
            <form onSubmit={handleApply} className="space-y-4">
              
              {/* State Selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-ink-800">
                    State / Union Territory *
                  </label>
                  <button
                    type="button"
                    onClick={() => setCustomStateMode(!customStateMode)}
                    className="text-[11px] text-leaf-700 hover:underline font-semibold"
                  >
                    {customStateMode ? 'Choose from list' : 'Type custom state'}
                  </button>
                </div>

                {customStateMode ? (
                  <input
                    type="text"
                    required
                    value={customStateText}
                    onChange={(e) => setCustomStateText(e.target.value)}
                    placeholder="Enter state or territory name..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-leaf-500"
                  />
                ) : (
                  <select
                    value={stateInput}
                    onChange={(e) => {
                      setStateInput(e.target.value);
                      // Pre-select first suggestion if available
                      if (POPULAR_DISTRICTS[e.target.value]?.length > 0) {
                        setDistrictInput(POPULAR_DISTRICTS[e.target.value][0]);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-leaf-500"
                  >
                    {ALL_INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* District Input (Free-text with suggestions) */}
              <div>
                <label className="block font-bold text-ink-800 mb-1.5">
                  District / City / Region *
                </label>
                <input
                  type="text"
                  required
                  value={districtInput}
                  onChange={(e) => setDistrictInput(e.target.value)}
                  placeholder="e.g. Pune, Lucknow, Patna, Coimbatore, Kolhapur..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-leaf-500"
                />

                {/* District quick suggestion pills */}
                {currentDistSuggestions.length > 0 && !customStateMode && (
                  <div className="mt-2">
                    <span className="text-[10px] text-ink-500 font-medium">Quick suggestions for {stateInput}:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {currentDistSuggestions.slice(0, 5).map((dist) => (
                        <button
                          key={dist}
                          type="button"
                          onClick={() => setDistrictInput(dist)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition ${
                            districtInput === dist 
                              ? 'border-leaf-600 bg-leaf-50 text-leaf-800 font-bold' 
                              : 'border-cream-300 bg-cream-50 text-ink-700 hover:bg-cream-100'
                          }`}
                        >
                          {dist}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Informational Callout */}
              <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 text-[11px] text-ink-700 leading-relaxed">
                <span className="font-bold text-ink-900">How matching works for any location: </span>
                When you input any state and district, SchemeSaathi shows relevant <strong>Central Government & All-India Schemes</strong> plus any state-specific or local pilot programs.
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-ink-700 hover:bg-cream-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold shadow-soft flex items-center gap-1.5 transition"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Set My Location</span>
                </button>
              </div>

            </form>
          ) : (
            /* Active Pilot Desks Tab */
            <div className="space-y-3">
              <p className="text-ink-600">
                These districts have dedicated student research desks and verified institutional partner records:
              </p>

              <div className="space-y-2">
                {PILOT_REGIONS.map((region) => (
                  <button
                    key={`${region.state}-${region.district}`}
                    onClick={() => handleSelectPilot(region)}
                    className="w-full p-3 rounded-2xl border border-cream-300 hover:border-leaf-500 bg-cream-50/50 hover:bg-leaf-50/60 transition text-left flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-ink-950">{region.district}</span>
                        <span className="text-ink-500 font-normal">• {region.state}</span>
                      </div>
                      <p className="text-[10px] text-ink-500 mt-0.5">
                        Full local verification + campus peer volunteer desk
                      </p>
                    </div>

                    <span className="text-[10px] font-bold bg-leaf-100 text-leaf-800 px-2 py-0.5 rounded-full">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
