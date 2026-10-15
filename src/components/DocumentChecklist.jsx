import React, { useState, useEffect } from 'react';
import { CheckSquare, Printer, Trash2, Save, AlertCircle, ShieldCheck, CheckCircle2, FileText, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';

export default function DocumentChecklist({ 
  selectedScheme, 
  allSchemes, 
  onSelectScheme,
  onOpenVolunteerHelp,
  language 
}) {
  const isHindi = language === 'hi';
  
  // Active scheme being tracked
  const currentScheme = selectedScheme || allSchemes[0];

  // Local storage key based on scheme ID
  const storageKey = `schemesaathi_checklist_${currentScheme.id}`;

  const [checkedItems, setCheckedItems] = useState({});
  const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState('');

  // Load from localStorage if user had opted in
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckedItems(parsed);
        setSaveToLocalStorage(true);
      } catch (e) {
        console.error("Failed to parse saved checklist", e);
      }
    } else {
      setCheckedItems({});
      setSaveToLocalStorage(false);
    }
  }, [currentScheme.id]);

  const toggleItem = (docId) => {
    const updated = {
      ...checkedItems,
      [docId]: !checkedItems[docId]
    };
    setCheckedItems(updated);

    // If opted into local storage, update immediately
    if (saveToLocalStorage) {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };

  const handleOptInChange = (e) => {
    const isOpted = e.target.checked;
    setSaveToLocalStorage(isOpted);
    if (isOpted) {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
      setSaveFeedback('Progress saved locally on this device.');
      setTimeout(() => setSaveFeedback(''), 3000);
    } else {
      localStorage.removeItem(storageKey);
      setSaveFeedback('Local save disabled. Current progress kept in memory.');
      setTimeout(() => setSaveFeedback(''), 3000);
    }
  };

  const handleDeleteSavedProgress = () => {
    localStorage.removeItem(storageKey);
    setCheckedItems({});
    setSaveToLocalStorage(false);
    setSaveFeedback('All saved checklist progress cleared.');
    setTimeout(() => setSaveFeedback(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate Progress
  const totalDocs = currentScheme.documents.length;
  const completedDocs = currentScheme.documents.filter(doc => checkedItems[doc.id]).length;
  const progressPercent = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Top Banner & Scheme Selector */}
      <div className="no-print bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare className="w-4 h-4 text-leaf-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                Personalized Document Checklist
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              Prepare Your Application Dossier
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Check off documents as you gather them. Labelled clearly to distinguish official mandates from items to verify.
            </p>
          </div>

          {/* Scheme Switcher */}
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-bold text-ink-700 mb-1">
              Selected Scheme:
            </label>
            <select
              value={currentScheme.id}
              onChange={(e) => {
                const found = allSchemes.find(s => s.id === e.target.value);
                if (found) onSelectScheme(found);
              }}
              className="w-full sm:w-72 px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs font-bold text-ink-900 focus:ring-2 focus:ring-leaf-500"
            >
              {allSchemes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.length > 40 ? s.title.slice(0, 40) + '...' : s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Checklist Card (Printable) */}
      <div className="checklist-print-container bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        
        {/* Printable Header Info */}
        <div className="pb-6 border-b border-cream-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-leaf-700 bg-leaf-50 px-2.5 py-0.5 rounded-full border border-leaf-200 uppercase tracking-wide">
                Target Scheme
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 mt-1">
                {currentScheme.title}
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Responsible: {currentScheme.responsibleDepartment} • Official Portal: {currentScheme.officialSourceUrl}
              </p>
            </div>

            {/* Print & Action Buttons */}
            <div className="no-print flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-xs font-bold text-ink-800 flex items-center gap-1.5 transition shadow-sm"
              >
                <Printer className="w-4 h-4 text-ink-600" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Progress Bar & Status */}
          <div className="mt-6 pt-5 border-t border-cream-100">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-ink-800">
                Readiness: {completedDocs} of {totalDocs} documents prepared
              </span>
              <span className={`px-2 py-0.5 rounded ${
                progressPercent === 100 ? 'bg-leaf-100 text-leaf-800' : 'bg-citrus-100 text-citrus-900'
              }`}>
                {progressPercent}% Complete
              </span>
            </div>

            <div className="w-full bg-cream-200 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-leaf-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {progressPercent === 100 && (
              <p className="no-print mt-2 text-xs font-bold text-leaf-700 flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                All documented checklist items marked! Review the application steps before final submission.
              </p>
            )}
          </div>
        </div>

        {/* Printable List of Documents */}
        <div className="space-y-3.5">
          {currentScheme.documents.map((doc, idx) => {
            const isChecked = !!checkedItems[doc.id];

            return (
              <div
                key={doc.id}
                onClick={() => toggleItem(doc.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                  isChecked 
                    ? 'border-leaf-300 bg-leaf-50/50' 
                    : 'border-cream-300 hover:border-cream-400 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 rounded text-leaf-600 focus:ring-leaf-500 cursor-pointer"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className={`text-sm font-bold ${isChecked ? 'line-through text-ink-400' : 'text-ink-950'}`}>
                      {doc.name}
                    </h3>

                    {/* Status Label (Confirmed vs Uncertain) */}
                    <div>
                      {doc.isMandatory ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-leaf-100 text-leaf-800 border border-leaf-200">
                          Official Mandatory
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-citrus-100 text-citrus-900 border border-citrus-200">
                          Confirm with local office
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-ink-600 mt-1">
                    {doc.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Guidance Notice on Printout */}
        <div className="mt-8 pt-4 border-t border-cream-200 text-xs text-ink-500 space-y-1">
          <p>
            <strong>Official Verification Reminder:</strong> This checklist was compiled by SchemeSaathi (Yuva Shakti Think Tank) for informational guidance. 
            Requirements may vary based on applicant category and academic quota. Always cross-check with your college nodal desk or official portal ({currentScheme.officialSourceUrl}).
          </p>
        </div>

        {/* Local Storage Opt-In & Privacy Controls */}
        <div className="no-print mt-8 p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-ink-800">
              <input
                type="checkbox"
                checked={saveToLocalStorage}
                onChange={handleOptInChange}
                className="rounded border-cream-300 text-leaf-600 focus:ring-leaf-500"
              />
              <span>Opt-in: Save my checklist progress on this browser</span>
            </label>

            {saveToLocalStorage && (
              <button
                onClick={handleDeleteSavedProgress}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete saved progress</span>
              </button>
            )}
          </div>

          {saveFeedback && (
            <p className="text-xs font-bold text-leaf-700 animate-fadeIn">
              ✓ {saveFeedback}
            </p>
          )}

          <p className="text-[11px] text-ink-500">
            Privacy policy: If enabled, only your checkbox states are stored locally in your browser's private storage. No data is ever transmitted to a server.
          </p>
        </div>

        {/* Bottom Volunteer Callout */}
        <div className="no-print mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-leaf-50 rounded-2xl border border-leaf-200 text-xs">
          <div>
            <p className="font-bold text-leaf-950">Missing a document or need help obtaining an Income or Domicile certificate?</p>
            <p className="text-leaf-800 mt-0.5">Campus volunteers from Yuva Shakti Think Tank can guide you to the nearest Aaple Sarkar / CSC center.</p>
          </div>
          <button
            onClick={() => onOpenVolunteerHelp(currentScheme)}
            className="px-4 py-2 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold text-xs whitespace-nowrap shadow-soft transition"
          >
            Get Volunteer Help
          </button>
        </div>

      </div>

    </div>
  );
}
