import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, CheckCircle, AlertCircle, Loader2, ExternalLink, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { getStoredGeminiApiKey, setStoredGeminiApiKey, fetchSchemesFromGemini } from '../services/geminiService';

export default function GeminiSchemeFinderModal({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onSchemesDiscovered 
}) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredGeminiApiKey());
      setErrorMsg('');
      setSuccessCount(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchWithGemini = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!apiKey.trim()) {
      setErrorMsg('Please enter a Google Gemini API key. You can generate one for free at aistudio.google.com.');
      setLoading(false);
      return;
    }

    // Persist API key
    setStoredGeminiApiKey(apiKey.trim());

    try {
      const results = await fetchSchemesFromGemini({
        state: currentLocation.state,
        district: currentLocation.district,
        apiKey: apiKey.trim()
      });

      setSuccessCount(results.length);
      onSchemesDiscovered(results);
      
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error("Gemini search failed", err);
      if (err.message === "NO_API_KEY") {
        setErrorMsg("Please enter a valid Gemini API key.");
      } else {
        setErrorMsg(`Gemini query error: ${err.message || 'Please check your API key and internet connection.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-cream-300 shadow-lift w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-leaf-700 via-leaf-800 to-ink-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-citrus-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold tracking-tight">
                  Gemini AI Scheme Discovery
                </h3>
                <span className="text-[10px] font-bold bg-citrus-400 text-ink-950 px-1.5 py-0.2 rounded uppercase">
                  Live Search
                </span>
              </div>
              <p className="text-xs text-leaf-200">
                Finding official benefits for <strong>{currentLocation.district}, {currentLocation.state}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-xs space-y-4">
          
          {/* Target Location Box */}
          <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-ink-500 uppercase tracking-wider block">Target Location:</span>
              <p className="text-sm font-extrabold text-ink-950">
                {currentLocation.district} District, {currentLocation.state}
              </p>
            </div>
            <span className="text-xs font-semibold text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full border border-leaf-200">
              Local Verification
            </span>
          </div>

          {successCount > 0 ? (
            <div className="p-6 bg-leaf-50 rounded-2xl border border-leaf-200 text-center space-y-2 text-leaf-800 animate-fadeIn">
              <CheckCircle className="w-10 h-10 text-leaf-600 mx-auto" />
              <h4 className="text-base font-extrabold text-leaf-950">
                {successCount} New Verified Schemes Discovered!
              </h4>
              <p className="text-xs text-leaf-800">
                Schemes for <strong>{currentLocation.district}, {currentLocation.state}</strong> have been dynamically added to your catalogue and match results.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSearchWithGemini} className="space-y-4">
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-ink-800 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-leaf-600" />
                    <span>Google Gemini API Key</span>
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-leaf-700 hover:text-leaf-800 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Get free key at AI Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your Gemini API key (AIzaSy...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-xs font-mono focus:ring-2 focus:ring-leaf-500"
                />
                <p className="text-[11px] text-ink-500 mt-1">
                  Stored securely in your browser's private local storage. Never shared with any third party.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-[11px] text-ink-700 space-y-1">
                <div className="flex items-center gap-1 font-bold text-ink-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-leaf-600" />
                  <span>Strict Trust Filtering:</span>
                </div>
                <p>
                  Gemini only queries authentic government records for <strong>{currentLocation.state}</strong> with verified <code>.gov.in</code> links, official departments, and document checklists.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-ink-700 hover:bg-cream-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold shadow-soft flex items-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Researching Official Portals...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-citrus-300" />
                      <span>Discover {currentLocation.district} Schemes</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
