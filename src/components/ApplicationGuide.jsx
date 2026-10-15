import React, { useState } from 'react';
import { BookOpen, HelpCircle, ExternalLink, Users, ShieldCheck, CheckCircle2, Send, AlertTriangle, ArrowRight, Search, FileText } from 'lucide-react';
import { JARGON_DICTIONARY } from '../data/schemes';

export default function ApplicationGuide({ 
  schemes, 
  onSelectScheme, 
  onOpenVolunteerHelp,
  language,
  setLanguage 
}) {
  const isHindi = language === 'hi';
  const [jargonSearch, setJargonSearch] = useState('');
  const [activeStepTab, setActiveStepTab] = useState(1);

  const filteredJargon = JARGON_DICTIONARY.filter(item => 
    item.term.toLowerCase().includes(jargonSearch.toLowerCase()) || 
    item.meaning.toLowerCase().includes(jargonSearch.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-10">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-leaf-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                Application Blueprint & Jargon Buster
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              Universal Application Guide
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Plain-language instructions to help you complete state and central portal applications without agents or middlemen.
            </p>
          </div>

          {/* Draft Translation Banner / Toggle */}
          <div className="flex items-center gap-2 bg-cream-50 p-2 rounded-2xl border border-cream-200 text-xs">
            <span className="text-ink-600 font-medium">Language:</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                language === 'en' ? 'bg-leaf-600 text-white' : 'text-ink-700 hover:bg-cream-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                language === 'hi' ? 'bg-leaf-600 text-white' : 'text-ink-700 hover:bg-cream-200'
              }`}
            >
              हिंदी (Draft)
            </button>
          </div>
        </div>

        {/* Translation Disclaimer if Hindi selected */}
        {isHindi && (
          <div className="mt-4 p-3 bg-citrus-50 rounded-xl border border-citrus-200 text-xs text-citrus-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-citrus-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>मशीन अनुवाद चेतावनी (Draft Notice):</strong> यह अनुवाद स्वतः उत्पन्न (machine-generated) प्रारूप है। कृपया आधिकारिक पोर्टल के मूल सरकारी प्रपत्रों और दिशा-निर्देशों से मिलान अवश्य करें।
            </span>
          </div>
        )}
      </div>

      {/* 4-Step Universal Portal Application Framework */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        <h2 className="text-lg sm:text-xl font-extrabold text-ink-950 mb-2">
          The 4-Step Framework for Government Applications
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 mb-6">
          Follow these phases in order. 80% of application rejections occur due to mismatched names or unlinked bank accounts before submission.
        </p>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { num: 1, title: 'Prerequisites & KYC' },
            { num: 2, title: 'Portal Registration' },
            { num: 3, title: 'Doc Upload & Scans' },
            { num: 4, title: 'Hardcopy & Receipt' },
          ].map((tab) => (
            <button
              key={tab.num}
              onClick={() => setActiveStepTab(tab.num)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                activeStepTab === tab.num 
                  ? 'border-leaf-600 bg-leaf-50 text-leaf-950 shadow-sm ring-1 ring-leaf-600' 
                  : 'border-cream-300 bg-cream-50/50 hover:bg-cream-100 text-ink-700'
              }`}
            >
              <span className="text-[11px] font-bold text-leaf-700">Phase 0{tab.num}</span>
              <p className="text-xs font-extrabold text-ink-900 mt-0.5">{tab.title}</p>
            </button>
          ))}
        </div>

        {/* Tab Detail Content */}
        <div className="bg-cream-50 rounded-2xl p-6 border border-cream-200 text-xs sm:text-sm text-ink-800 leading-relaxed">
          {activeStepTab === 1 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink-950">Phase 1: Pre-requisite KYC & Bank Seeding Check</h3>
              <p>Before typing a single field on a government website, confirm that your foundational identity records match:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-700">
                <li><strong>Exact Name Spelling:</strong> Ensure your full name on your 10th marksheet matches your Aadhaar and bank passbook exactly (including initials or surname order).</li>
                <li><strong>Aadhaar Registered Mobile Number:</strong> The phone number receiving the OTP must be active and in your possession.</li>
                <li><strong>NPCI Aadhaar Seeding:</strong> Visit your bank branch or use the Aadhaar mapper to confirm your savings account is seeded for Direct Benefit Transfer (DBT). Having an account is not enough; it must be enabled for DBT.</li>
              </ul>
            </div>
          )}

          {activeStepTab === 2 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink-950">Phase 2: Official Portal Registration & Profile Creation</h3>
              <p>Always verify you are on an official domain ending in <code>.gov.in</code> or <code>.nic.in</code>. Fake phishing websites often mimic portals.</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-700">
                <li>Create your account using your personal email and mobile. Do not allow cyber cafe operators to enter their own email or phone number.</li>
                <li>Record your generated Application Registration Number and password securely in a notebook.</li>
                <li>Complete your profile tabs (Personal details, Address, Caste/Tribe category, and Family Annual Income).</li>
              </ul>
            </div>
          )}

          {activeStepTab === 3 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink-950">Phase 3: Digital Scans & Document Uploads</h3>
              <p>Portals strictly reject files that are blurry or exceed file size limits (usually 256 KB to 500 KB per PDF).</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-700">
                <li>Use free phone document scanner apps to capture flat, well-lit scans of your originals (Domicile, Income certificate, Fee receipts).</li>
                <li>Keep file names clean, e.g. <code>Domicile_Cert_YourName.pdf</code> without spaces or special characters.</li>
                <li>Ensure self-attestation (signing with date on the photocopy) if the department circular specifies it.</li>
              </ul>
            </div>
          )}

          {activeStepTab === 4 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink-950">Phase 4: Physical Submission & Stamped Acknowledgment Slip</h3>
              <p>Submitting online is only half the journey for state scholarships and bank loan schemes.</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-700">
                <li>Download and print the completed application summary PDF immediately.</li>
                <li>Attach copies of all uploaded documents.</li>
                <li>Submit the hardcopy dossier to your college scholarship clerk or the bank nodal branch.</li>
                <li><strong>Crucial:</strong> Always insist on an in-person inward stamp or signed receipt slip with date and signature. This is your proof in case of administrative disputes.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Jargon Buster Glossary */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-leaf-600" />
              <h2 className="text-lg sm:text-xl font-extrabold text-ink-950">
                Jargon Buster: Bureaucracy Made Plain
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-600">
              Plain-language definitions for confusing abbreviations and government terminology.
            </p>
          </div>

          {/* Search Jargon */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={jargonSearch}
              onChange={(e) => setJargonSearch(e.target.value)}
              placeholder="Search terms (e.g. DBT, NPCI)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs text-ink-900 focus:ring-2 focus:ring-leaf-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredJargon.map((item, idx) => (
            <div key={idx} className="p-4 bg-cream-50 rounded-2xl border border-cream-200">
              <h3 className="text-sm font-bold text-ink-950 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-citrus-500"></span>
                {item.term}
              </h3>
              <p className="text-xs text-ink-700 leading-relaxed">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Volunteer Support Banner */}
      <div className="bg-gradient-to-br from-leaf-700 to-leaf-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-leaf-100 backdrop-blur-sm mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Yuva Shakti Student Innovation Cell</span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight">
            Need hands-on guidance from a campus peer?
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-leaf-100 leading-relaxed">
            If you are a first-time applicant or struggling with documents like Income Certificates or MahaDBT portal errors, 
            our trained student volunteers can walk you through the process for free at our campus pilot desks.
          </p>

          <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 text-[11px] text-leaf-200">
            <strong>Scope of Volunteer Assistance:</strong> Student volunteers provide informational navigation assistance and digital literacy support. 
            Volunteers do not charge fees, do not collect cash, and do not represent or guarantee decisions by the government.
          </div>

          <div className="mt-6">
            <button
              onClick={() => onOpenVolunteerHelp()}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-cream-100 text-leaf-900 font-bold text-xs sm:text-sm shadow-soft transition active:scale-98"
            >
              Request Free Volunteer Guidance
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
