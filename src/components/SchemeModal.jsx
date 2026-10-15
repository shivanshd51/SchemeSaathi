import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, FileCheck, ExternalLink, ShieldCheck, Clock, Flag, Send, AlertTriangle, Building2, Phone, CheckSquare } from 'lucide-react';

export default function SchemeModal({ 
  scheme, 
  onClose, 
  onCreateChecklist, 
  onOpenVolunteerHelp,
  language 
}) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('link_changed');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!scheme) return null;

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalOpen(false);
      setReportNotes('');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Main Modal Box */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-lift w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Sticky Header */}
        <div className="p-6 border-b border-cream-200 bg-cream-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cream-200 text-ink-700">
                {scheme.category}
              </span>
              <span className="text-xs font-semibold text-ink-600">
                {scheme.pilotLocation.district || scheme.pilotLocation.state}
              </span>
              {scheme.isVerified ? (
                <span className="text-[11px] font-bold text-leaf-800 bg-leaf-100 px-2 py-0.5 rounded-full border border-leaf-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Checked on {scheme.lastCheckedDate}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" /> Sample Demo Scheme
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950">
              {scheme.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              For: <span className="font-bold text-ink-800">{scheme.targetAudience}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-ink-500 hover:text-ink-900 hover:bg-cream-200 transition focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm">
          
          {/* Government Final Decision Legal Disclaimer */}
          <div className="p-4 rounded-2xl bg-leaf-50/80 border border-leaf-200 text-xs text-leaf-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-leaf-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Official Disclaimer:</strong> SchemeSaathi provides educational navigation assistance. 
              The designated government department alone exercises the legal authority to determine eligibility, approve claims, and disburse grants.
            </div>
          </div>

          {/* Plain-Language Overview */}
          <div>
            <h3 className="text-base font-bold text-ink-950 mb-2">
              Overview & Benefit
            </h3>
            <p className="text-ink-700 leading-relaxed">
              {scheme.shortDescription}
            </p>
            {scheme.benefitSummary && (
              <div className="mt-3 p-3.5 bg-cream-50 rounded-2xl border border-cream-200 font-medium text-ink-900 text-xs sm:text-sm">
                <span className="font-bold text-leaf-800">Benefit Details: </span>
                {scheme.benefitSummary}
              </div>
            )}
          </div>

          {/* Eligibility Requirements: Confirmed vs User Should Verify */}
          <div>
            <h3 className="text-base font-bold text-ink-950 mb-3">
              Eligibility Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Confirmed Criteria */}
              <div className="bg-leaf-50/50 rounded-2xl p-4 border border-leaf-200">
                <div className="flex items-center gap-1.5 font-bold text-leaf-900 text-xs mb-3 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-leaf-600" />
                  Confirmed Details
                </div>
                <ul className="space-y-2 text-xs text-ink-800">
                  {scheme.eligibilityCriteria.confirmed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-leaf-600 mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Items User Should Verify */}
              <div className="bg-citrus-50/50 rounded-2xl p-4 border border-citrus-200">
                <div className="flex items-center gap-1.5 font-bold text-citrus-900 text-xs mb-3 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-citrus-700" />
                  Items You Should Verify
                </div>
                <ul className="space-y-2 text-xs text-ink-800">
                  {scheme.eligibilityCriteria.userShouldVerify.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-citrus-600 mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Commonly Requested Documents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-ink-950">
                Commonly Requested Documents
              </h3>
              <span className="text-xs text-ink-500">
                Confirm specific formats on the official portal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheme.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-ink-900">{doc.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      doc.isMandatory ? 'bg-leaf-100 text-leaf-800' : 'bg-cream-200 text-ink-600'
                    }`}>
                      {doc.isMandatory ? 'Required' : 'Conditional'}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-600">{doc.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h3 className="text-base font-bold text-ink-950 mb-3">
              Application Steps
            </h3>
            <div className="space-y-3">
              {scheme.applicationSteps.map((step) => (
                <div key={step.stepNumber} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                  <div className="w-7 h-7 rounded-xl bg-leaf-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-sm text-ink-950">{step.title}</p>
                    <p className="text-ink-700 mt-0.5 leading-relaxed">{step.action}</p>
                    {step.notes && (
                      <p className="text-[11px] text-ink-500 mt-1 italic">
                        Tip: {step.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department & Contact Information */}
          <div className="p-4 bg-cream-100 rounded-2xl border border-cream-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-ink-800">
              <Building2 className="w-4 h-4 text-ink-500 flex-shrink-0" />
              <span><strong>Department:</strong> {scheme.responsibleDepartment}</span>
            </div>
            <div className="flex items-center gap-2 text-ink-800">
              <Phone className="w-4 h-4 text-ink-500 flex-shrink-0" />
              <span><strong>Official Helpline:</strong> {scheme.contactDetails}</span>
            </div>
            <div className="flex items-center gap-2 text-ink-800">
              <ExternalLink className="w-4 h-4 text-ink-500 flex-shrink-0" />
              <span>
                <strong>Official Portal: </strong>
                <a
                  href={scheme.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-leaf-700 font-bold hover:underline"
                >
                  {scheme.officialSourceUrl}
                </a>
              </span>
            </div>
          </div>

          {/* Outdated Information Notice Trigger */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-200 text-xs">
            <span className="text-ink-500">
              Last verified by Yuva Shakti research team: <strong>{scheme.lastCheckedDate}</strong>
            </span>
            <button
              onClick={() => setReportModalOpen(true)}
              className="text-ink-600 hover:text-ink-950 font-semibold flex items-center gap-1.5 underline"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report outdated information</span>
            </button>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-cream-200 bg-cream-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenVolunteerHelp(scheme)}
              className="px-4 py-2 rounded-xl border border-cream-300 bg-white hover:bg-cream-100 text-xs font-semibold text-ink-700 transition"
            >
              Ask Campus Volunteer
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={scheme.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-cream-300 bg-white hover:bg-cream-100 text-xs font-bold text-ink-900 flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-600" />
            </a>

            <button
              onClick={() => {
                onCreateChecklist(scheme);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition active:scale-98"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Generate My Checklist</span>
            </button>
          </div>
        </div>

      </div>

      {/* Nested "Report Outdated Info" Mini Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-cream-300 shadow-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-600" />
                <h4 className="text-base font-bold text-ink-950">Report Outdated Information</h4>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="text-ink-400 hover:text-ink-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-4 bg-leaf-50 rounded-xl text-center text-xs text-leaf-800">
                <CheckCircle2 className="w-8 h-8 text-leaf-600 mx-auto mb-2" />
                <p className="font-bold text-sm">Thank you for reporting!</p>
                <p className="mt-1">The Yuva Shakti student research team will review and verify this entry with the local department.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <p className="text-ink-600">
                  Help us maintain accurate scheme data for <strong>{scheme.title}</strong>.
                </p>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">Issue type:</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  >
                    <option value="link_changed">Official website link changed or broken</option>
                    <option value="rules_updated">Eligibility rules or income ceiling updated</option>
                    <option value="docs_changed">Document requirements changed</option>
                    <option value="deadline_passed">Scheme closed or deadline expired</option>
                    <option value="other">Other observation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">Details or updated link (optional):</label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="e.g. MahaDBT circular dated Aug 2026 updated income limit..."
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-cream-300 text-ink-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-ink-900 text-white font-bold hover:bg-black"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
