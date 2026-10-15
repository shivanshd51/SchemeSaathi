import React, { useState } from 'react';
import { ArrowRight, Search, CheckCircle2, Shield, Sparkles, FileText, CheckSquare, Clock, MapPin, AlertCircle, HelpCircle } from 'lucide-react';

export default function Hero({ 
  onStartQuiz, 
  onBrowseSchemes, 
  onViewChecklist, 
  selectedPilot, 
  language 
}) {
  const isHindi = language === 'hi';
  const [demoChecklistChecked, setDemoChecklistChecked] = useState([true, false, false]);

  const toggleChecklistItem = (index) => {
    const updated = [...demoChecklistChecked];
    updated[index] = !updated[index];
    setDemoChecklistChecked(updated);
  };

  const completedCount = demoChecklistChecked.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / demoChecklistChecked.length) * 100);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-leaf-100/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-citrus-100/60 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pilot Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-cream-300 shadow-sm text-xs text-ink-700">
            <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse"></span>
            <span className="font-semibold text-leaf-800">
              {isHindi ? 'पायलट परियोजना' : 'Field Pilot Project'}:
            </span>
            <span>{selectedPilot.district} District ({selectedPilot.state})</span>
          </div>
        </div>

        {/* Hero Headings and CTAs */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-950 tracking-tight leading-[1.15]">
            {isHindi ? (
              <>
                योजनाएं जो आपके काम आएं, <span className="text-leaf-600 underline decoration-citrus-400 decoration-wavy decoration-2">आसानी से खोजें।</span>
              </>
            ) : (
              <>
                Benefits you may qualify for,{' '}
                <span className="text-leaf-600 underline decoration-citrus-400 decoration-wavy decoration-4">
                  made easier to find.
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-ink-700 font-normal leading-relaxed">
            {isHindi ? (
              'कुछ आसान सवालों के जवाब दें और अपनी पात्रता के अनुसार संभावित योजनाएं, आवश्यक दस्तावेज़ सूची और आवेदन के सही चरण जानें।'
            ) : (
              'Answer a few simple questions to discover potentially relevant schemes, understand prerequisites, generate a personalized document checklist, and finish your application.'
            )}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold text-base shadow-soft hover:shadow-lift transition flex items-center justify-center gap-2.5 active:scale-98"
            >
              <span>{isHindi ? 'मेरे लिए योजनाएं खोजें' : 'Find schemes for me'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onBrowseSchemes}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-200/80 text-ink-900 border border-cream-300 font-semibold text-base shadow-sm hover:shadow transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-ink-500" />
              <span>{isHindi ? 'सभी योजनाएं देखें' : 'Browse schemes'}</span>
            </button>
          </div>

          {/* Core Trust Note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-ink-600">
            <Shield className="w-4 h-4 text-leaf-600" />
            <span className="font-medium">
              Free guidance • Official sources • You stay in control
            </span>
          </div>
        </div>

        {/* Dynamic Visual Preview Section (Scheme Match + Document Checklist Preview) */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-3xl border border-cream-300 shadow-soft-lg p-5 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-leaf-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
                  Interactive Preview • Scheme Match & Checklist
                </span>
              </div>
              <span className="text-xs font-semibold text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full border border-leaf-200">
                Informational Guidance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left preview: Match Card */}
              <div className="md:col-span-7 bg-cream-50 rounded-2xl p-5 border border-cream-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-leaf-100 text-leaf-800 border border-leaf-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-leaf-600" />
                    Potential Match
                  </span>
                  <span className="text-[11px] text-ink-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Checked Sep 2026
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink-950 mt-1">
                  Post-Matric Higher Education Scholarship
                </h3>
                <p className="text-xs text-ink-600 mt-1 line-clamp-2">
                  100% or partial tuition & exam fee support for eligible college and diploma students in Maharashtra.
                </p>

                <div className="mt-3.5 p-2.5 bg-white rounded-xl border border-cream-200 text-xs text-ink-700">
                  <span className="font-semibold text-leaf-800">Why this appeared: </span>
                  Matches student profile in Pune district with annual family income under state ceiling.
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-cream-200/80 text-xs">
                  <span className="text-ink-500 font-medium">Official source: mahadbt.maharashtra.gov.in</span>
                  <button 
                    onClick={onStartQuiz}
                    className="font-bold text-leaf-700 hover:text-leaf-800 flex items-center gap-1"
                  >
                    Try quiz <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right preview: Interactive Checklist Card */}
              <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-cream-300 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-leaf-600" />
                    <h4 className="text-sm font-bold text-ink-900">Your Checklist</h4>
                  </div>
                  <span className="text-xs font-bold text-leaf-700 bg-leaf-50 px-2 py-0.5 rounded-md">
                    {progressPercent}% Ready
                  </span>
                </div>

                {/* Mini Progress Bar */}
                <div className="w-full bg-cream-200 rounded-full h-2 mb-4 overflow-hidden">
                  <div 
                    className="bg-leaf-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Checklist items */}
                <div className="space-y-2.5 text-xs">
                  <label 
                    onClick={() => toggleChecklistItem(0)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-cream-100 cursor-pointer select-none transition"
                  >
                    <input 
                      type="checkbox" 
                      checked={demoChecklistChecked[0]} 
                      onChange={() => {}} 
                      className="mt-0.5 rounded border-cream-300 text-leaf-600 focus:ring-leaf-500" 
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${demoChecklistChecked[0] ? 'line-through text-ink-400' : 'text-ink-800'}`}>
                        Domicile Certificate
                      </p>
                      <span className="text-[10px] text-ink-500">Official requirement (Tehsildar / Aaple Sarkar)</span>
                    </div>
                  </label>

                  <label 
                    onClick={() => toggleChecklistItem(1)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-cream-100 cursor-pointer select-none transition"
                  >
                    <input 
                      type="checkbox" 
                      checked={demoChecklistChecked[1]} 
                      onChange={() => {}} 
                      className="mt-0.5 rounded border-cream-300 text-leaf-600 focus:ring-leaf-500" 
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${demoChecklistChecked[1] ? 'line-through text-ink-400' : 'text-ink-800'}`}>
                        Current Year Income Certificate
                      </p>
                      <span className="text-[10px] text-citrus-700 bg-citrus-50 px-1 py-0.2 rounded border border-citrus-200">
                        Check with college office
                      </span>
                    </div>
                  </label>

                  <label 
                    onClick={() => toggleChecklistItem(2)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-cream-100 cursor-pointer select-none transition"
                  >
                    <input 
                      type="checkbox" 
                      checked={demoChecklistChecked[2]} 
                      onChange={() => {}} 
                      className="mt-0.5 rounded border-cream-300 text-leaf-600 focus:ring-leaf-500" 
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${demoChecklistChecked[2] ? 'line-through text-ink-400' : 'text-ink-800'}`}>
                        Bank Passbook (NPCI Seeded)
                      </p>
                      <span className="text-[10px] text-ink-500">Required for DBT direct credit</span>
                    </div>
                  </label>
                </div>

                <div className="mt-3 pt-2 text-[11px] text-ink-500 text-center">
                  Click items above to test interactive progress tracking.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Concise Steps: Tell us about yourself -> Explore possible matches -> Prepare your application */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              How SchemeSaathi Works
            </h2>
            <p className="text-sm sm:text-base text-ink-600 mt-2">
              Simple, transparent, and privacy-first guidance for every citizen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-soft hover:shadow-lift transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-leaf-100 text-leaf-700 flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-ink-950 mb-2">
                  Tell us about yourself
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Answer a few simple questions regarding your location, student or employment status, and general interests. We never ask for Aadhaar numbers, passwords, or bank details.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 text-xs font-semibold text-leaf-700">
                Takes under 2 minutes • 100% private
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-soft hover:shadow-lift transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-citrus-100 text-citrus-800 flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-ink-950 mb-2">
                  Explore possible matches
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Review potential schemes with transparent "Why this appeared" reasons, last-checked verification dates, and verified direct links to official government portals.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 text-xs font-semibold text-citrus-800">
                Transparent logic • No hidden ranking
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-soft hover:shadow-lift transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-ink-100 text-ink-800 flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-ink-950 mb-2">
                  Prepare your application
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Generate a printable document checklist, understand confusing bureaucratic terms with our jargon-buster, and request guidance from campus volunteers if you get stuck.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 text-xs font-semibold text-ink-700">
                Printable checklist • Volunteer support
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
