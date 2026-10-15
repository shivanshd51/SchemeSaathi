import React, { useState } from 'react';
import { X, Users, CheckCircle2, ShieldCheck, Send, AlertTriangle, Lock } from 'lucide-react';

export default function VolunteerModal({ 
  isOpen, 
  onClose, 
  preselectedScheme = null,
  pilotDistrict = "Pune"
}) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '', // phone or email
    collegeOrLocality: '',
    schemeOfInterest: preselectedScheme ? preselectedScheme.title : 'General Scholarship / Scheme Guidance',
    question: '',
    consentGiven: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMsg('Please provide your name and contact method so a volunteer can reach you.');
      return;
    }
    if (!formData.consentGiven) {
      setErrorMsg('Please check the consent box to allow our student volunteer to review your question.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      contact: '',
      collegeOrLocality: '',
      schemeOfInterest: '',
      question: '',
      consentGiven: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-cream-300 shadow-lift w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-cream-50 border-b border-cream-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-leaf-100 text-leaf-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-ink-950">
                Get Help from a Campus Volunteer
              </h3>
              <p className="text-xs text-ink-500">
                Yuva Shakti Think Tank • {pilotDistrict} Pilot Desk
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full text-ink-400 hover:text-ink-900 hover:bg-cream-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-leaf-100 rounded-full flex items-center justify-center mx-auto text-leaf-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-extrabold text-ink-950">
                Volunteer Request Received!
              </h4>
              <p className="text-xs text-ink-600 leading-relaxed max-w-sm mx-auto">
                A volunteer peer from the Yuva Shakti campus support cell in <strong>{pilotDistrict}</strong> will reach out via WhatsApp/email within 24 business hours to guide you with your queries.
              </p>

              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-[11px] text-ink-600">
                Reference ID: <span className="font-mono font-bold text-ink-900">YS-PILOT-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-ink-900 text-white text-xs font-bold hover:bg-black transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Volunteer Scope Callout */}
              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-ink-700 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-leaf-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Important Notice:</strong> Campus volunteers help users navigate official information and verify document readiness. 
                  They are unpaid student mentors who <strong>do not represent</strong> or guarantee decisions by the government.
                </span>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Minimal inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aarti"
                    className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-leaf-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">
                    WhatsApp or Mobile / Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="e.g. 98XXXXXXXX or email"
                    className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-leaf-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">
                    College / Area (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.collegeOrLocality}
                    onChange={(e) => setFormData({ ...formData, collegeOrLocality: e.target.value })}
                    placeholder="e.g. SPPU / Shivajinagar"
                    className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-leaf-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">
                    Scheme of Interest
                  </label>
                  <input
                    type="text"
                    value={formData.schemeOfInterest}
                    onChange={(e) => setFormData({ ...formData, schemeOfInterest: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-leaf-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-ink-800 mb-1">
                  What do you need help with?
                </label>
                <textarea
                  rows={2}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. I need guidance on getting an Income Certificate from the Tehsildar office..."
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-leaf-500"
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div className="p-3 bg-leaf-50/60 rounded-xl border border-leaf-200">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-ink-800 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-0.5 rounded text-leaf-600 focus:ring-leaf-500"
                  />
                  <span>
                    <strong>Consent:</strong> I consent to sharing my contact details with an authorized Yuva Shakti student peer volunteer solely for the purpose of receiving guidance on this inquiry.
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-ink-700 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold shadow-soft flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
