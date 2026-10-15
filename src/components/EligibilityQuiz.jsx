import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ShieldCheck, Check, Sparkles, HelpCircle, Lock, RotateCcw, AlertTriangle, MapPin, Edit3 } from 'lucide-react';
import { ALL_INDIAN_STATES, POPULAR_DISTRICTS } from '../data/locations';

export default function EligibilityQuiz({ 
  selectedPilot, 
  onCompleteQuiz, 
  onCancel,
  language 
}) {
  const isHindi = language === 'hi';

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form State (Accepts any state and any district)
  const [formData, setFormData] = useState({
    state: selectedPilot.state || 'Maharashtra',
    district: selectedPilot.district || 'Pune',
    isCustomState: false,
    customStateName: '',
    ageRange: '18-24',
    occupation: 'student', // student, employed, self-employed, job-seeking, other
    incomeBracket: 'under_2.5l', // under_2.5l, 2.5l_to_8l, above_8l, skipped
    interests: ['Government Schemes', 'Skill & Employment'],
    saveQuizAnswersLocally: false
  });

  const [showIncomeExplanation, setShowIncomeExplanation] = useState(false);

  const handleInterestToggle = (category) => {
    if (formData.interests.includes(category)) {
      if (formData.interests.length > 1) {
        setFormData({
          ...formData,
          interests: formData.interests.filter(i => i !== category)
        });
      }
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, category]
      });
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const finalState = formData.isCustomState && formData.customStateName.trim() 
        ? formData.customStateName.trim() 
        : formData.state;
      
      onCompleteQuiz({
        ...formData,
        state: finalState,
        district: formData.district.trim() || 'Central'
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkipIncome = () => {
    setFormData({
      ...formData,
      incomeBracket: 'skipped'
    });
    setStep(4);
  };

  const currentDistSuggestions = POPULAR_DISTRICTS[formData.state] || [];

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Quiz Card */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-soft-lg overflow-hidden">
        
        {/* Progress Header */}
        <div className="bg-cream-50 px-6 sm:px-8 pt-6 pb-4 border-b border-cream-200">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-600 mb-2">
            <span>Question {step} of {totalSteps}</span>
            <span className="text-leaf-700 font-bold">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-leaf-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: ANY LOCATION (STATE & DISTRICT) */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Step 1 • Location Context</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 mt-1">
                  Where do you currently reside?
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  You can enter <strong>any State and District</strong> across India. We tailor matches to your exact jurisdiction.
                </p>
              </div>

              <div className="space-y-4">
                {/* State Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-ink-800">
                      State / Union Territory *
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isCustomState: !formData.isCustomState })}
                      className="text-[11px] text-leaf-700 hover:underline font-semibold"
                    >
                      {formData.isCustomState ? 'Select from 36 States/UTs' : 'Type custom state name'}
                    </button>
                  </div>

                  {formData.isCustomState ? (
                    <input
                      type="text"
                      required
                      value={formData.customStateName}
                      onChange={(e) => setFormData({ ...formData, customStateName: e.target.value })}
                      placeholder="Type any state or territory name..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-sm text-ink-900 focus:ring-2 focus:ring-leaf-500 font-medium"
                    />
                  ) : (
                    <select
                      value={formData.state}
                      onChange={(e) => {
                        const newState = e.target.value;
                        const defaultDist = POPULAR_DISTRICTS[newState]?.[0] || 'Central';
                        setFormData({ 
                          ...formData, 
                          state: newState,
                          district: defaultDist
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-sm text-ink-900 focus:ring-2 focus:ring-leaf-500 font-medium"
                    >
                      {ALL_INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* District Input (Free-text - accepts ANY district!) */}
                <div>
                  <label className="block text-xs font-bold text-ink-800 mb-1.5">
                    District / City / Tehsil * (Type any location)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Pune, Indore, Lucknow, Varanasi, Patna, Kolhapur..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-sm text-ink-900 focus:ring-2 focus:ring-leaf-500 font-medium"
                  />

                  {/* Suggestion Chips */}
                  {currentDistSuggestions.length > 0 && !formData.isCustomState && (
                    <div className="mt-2">
                      <span className="text-[11px] text-ink-500">Popular in {formData.state}:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {currentDistSuggestions.map((dist) => (
                          <button
                            key={dist}
                            type="button"
                            onClick={() => setFormData({ ...formData, district: dist })}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                              formData.district.toLowerCase() === dist.toLowerCase()
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
              </div>

              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs text-ink-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-leaf-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Location Privacy:</strong> Your location is only used to query relevant state/central database rules. We never track your GPS coordinates or IP location.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: PROFILE & OCCUPATION */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Step 2 • Profile</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 mt-1">
                  Tell us about your current status & age
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  Many benefits are designed specifically for students, young entrepreneurs, or job seekers.
                </p>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-xs font-bold text-ink-800 mb-2">
                  What is your age range?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'under_18', label: 'Under 18' },
                    { id: '18-24', label: '18 – 24 yrs' },
                    { id: '25-35', label: '25 – 35 yrs' },
                    { id: 'above_35', label: '35+ yrs' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, ageRange: item.id })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                        formData.ageRange === item.id 
                          ? 'border-leaf-600 bg-leaf-50 text-leaf-800 ring-2 ring-leaf-500/20' 
                          : 'border-cream-300 hover:bg-cream-100 text-ink-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-ink-800 mb-2">
                  What best describes your primary activity?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'student', title: 'Student', desc: 'Enrolled in school, college, polytechnic, or university degree' },
                    { id: 'job-seeking', title: 'Job Seeker / Unemployed', desc: 'Looking for vocational training, apprenticeships, or first job' },
                    { id: 'self-employed', title: 'Self-Employed / Founder', desc: 'Running a small business, startup, shop, or freelance work' },
                    { id: 'employed', title: 'Salaried / Employed', desc: 'Working in private, public, or informal sector' },
                    { id: 'other', title: 'Other / Homemaker', desc: 'Family caregiver or seeking livelihood support' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setFormData({ ...formData, occupation: item.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        formData.occupation === item.id 
                          ? 'border-leaf-600 bg-leaf-50/70 ring-1 ring-leaf-600' 
                          : 'border-cream-300 hover:bg-cream-50'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-ink-900">{item.title}</p>
                        <p className="text-xs text-ink-600">{item.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        formData.occupation === item.id ? 'bg-leaf-600 border-leaf-600 text-white' : 'border-cream-400'
                      }`}>
                        {formData.occupation === item.id && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: HOUSEHOLD / INCOME CONTEXT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Step 3 • Economic Context</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 mt-1">
                  Approximate Annual Household Income
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  Optional. Helps identify means-tested scholarships and subsidies.
                </p>
              </div>

              {/* Sensitive question explainer toggle */}
              <div className="p-3 bg-citrus-50 rounded-xl border border-citrus-200 text-xs text-ink-800">
                <button
                  type="button"
                  onClick={() => setShowIncomeExplanation(!showIncomeExplanation)}
                  className="font-bold text-citrus-900 flex items-center justify-between w-full text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-citrus-700" />
                    Why does SchemeSaathi ask about income?
                  </span>
                  <span className="text-xs underline">{showIncomeExplanation ? 'Hide' : 'Read why'}</span>
                </button>
                {showIncomeExplanation && (
                  <p className="mt-2 text-ink-700 text-xs leading-relaxed border-t border-citrus-200 pt-2">
                    Government schemes like MahaDBT Post-Matric scholarships have strict state-mandated income limits (e.g., ₹2,50,000 for full fee reimbursement, or ₹8,00,000 for EBC). 
                    We do not verify this amount or ask for tax returns. If you prefer not to disclose, click <strong>"Skip this question"</strong> below.
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'under_2.5l', label: 'Under ₹2.5 Lakhs / year', sub: 'Eligible for highest scholarship & welfare benefits' },
                  { id: '2.5l_to_8l', label: '₹2.5 Lakhs – ₹8 Lakhs / year', sub: 'Eligible for general education loans and fee concessions' },
                  { id: 'above_8l', label: 'Above ₹8 Lakhs / year', sub: 'Eligible for merit scholarships and startup grants' },
                  { id: 'skipped', label: 'I prefer not to say / Not sure', sub: 'We will show all general eligibility schemes' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setFormData({ ...formData, incomeBracket: item.id })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      formData.incomeBracket === item.id 
                        ? 'border-leaf-600 bg-leaf-50/70 ring-1 ring-leaf-600' 
                        : 'border-cream-300 hover:bg-cream-50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-ink-900">{item.label}</p>
                      <p className="text-xs text-ink-500">{item.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.incomeBracket === item.id ? 'bg-leaf-600 border-leaf-600 text-white' : 'border-cream-400'
                    }`}>
                      {formData.incomeBracket === item.id && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSkipIncome}
                  className="text-xs font-semibold text-ink-500 hover:text-ink-800 underline"
                >
                  Skip this question →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INTEREST AREAS & PRIVACY OPT-IN */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Step 4 • Interests & Categories</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 mt-1">
                  What types of schemes are you interested in?
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  Select one or more categories to customize your matches.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'Government Schemes', label: 'Education & Welfare Scholarships', desc: 'College tuition, exam concessions, hostels' },
                  { id: 'Skill & Employment', label: 'Vocational Skills & PMKVY', desc: 'Free technical training, NSQF certification' },
                  { id: 'Startup/Entrepreneurship', label: 'Startup Grants & Seed Funds', desc: 'Early-stage innovation & prototype support' },
                  { id: 'Women Empowerment', label: 'Women & Affirmative Enterprises', desc: 'Stand-Up India and subsidized bank loans' },
                  { id: 'AI & Digital', label: 'AI & Digital Literacy', desc: 'Tech upskilling and cyber-awareness' },
                  { id: 'Sustainability', label: 'Sustainability & Clean Energy', desc: 'Rooftop solar subsidies and green youth jobs' },
                ].map((cat) => {
                  const isChecked = formData.interests.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleInterestToggle(cat.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition select-none flex items-start gap-2.5 ${
                        isChecked 
                          ? 'border-leaf-600 bg-leaf-50 text-leaf-950 font-semibold' 
                          : 'border-cream-300 hover:bg-cream-50 text-ink-700'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => {}} 
                        className="mt-1 rounded text-leaf-600 focus:ring-leaf-500"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-ink-900">{cat.label}</p>
                        <p className="text-[11px] text-ink-500">{cat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Privacy-by-design Opt-In Notice */}
              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200">
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-leaf-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-ink-700">
                    <p className="font-bold text-ink-900">Privacy Guarantee:</p>
                    <p className="mt-0.5">
                      We never store your responses on a remote server. We never ask for Aadhaar, bank credentials, or contact details.
                    </p>
                    <label className="mt-3 flex items-center gap-2 cursor-pointer font-medium text-ink-900">
                      <input 
                        type="checkbox" 
                        checked={formData.saveQuizAnswersLocally}
                        onChange={(e) => setFormData({ ...formData, saveQuizAnswersLocally: e.target.checked })}
                        className="rounded border-cream-400 text-leaf-600 focus:ring-leaf-500"
                      />
                      <span>Opt-in: Remember my questionnaire answers on this device (Local Storage)</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Action Controls: Back, Cancel, Continue */}
        <div className="bg-cream-100/80 px-6 sm:px-8 py-4 border-t border-cream-200 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-cream-300 bg-white text-xs sm:text-sm font-semibold text-ink-700 hover:bg-cream-50 flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-ink-500 hover:text-ink-800"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white text-xs sm:text-sm font-bold shadow-soft flex items-center gap-2 transition active:scale-98"
            >
              <span>{step === totalSteps ? 'View Possible Matches' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
