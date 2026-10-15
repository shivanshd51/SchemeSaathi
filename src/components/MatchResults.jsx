import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, ExternalLink, ArrowRight, Bookmark, BookmarkCheck, FileCheck, RotateCcw, ShieldCheck, Filter, MapPin, Calendar, Clock, AlertTriangle, Edit3, RefreshCw, Loader2 } from 'lucide-react';

export default function MatchResults({ 
  quizAnswers, 
  allSchemes, 
  onSelectScheme, 
  onCreateChecklist, 
  onRetakeQuiz, 
  onBrowseAll,
  onOpenVolunteerHelp,
  onOpenCustomLocationModal,
  onTriggerLiveScan,
  isScanning = false,
  language 
}) {
  const isHindi = language === 'hi';
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleSave = (id) => {
    if (savedSchemeIds.includes(id)) {
      setSavedSchemeIds(savedSchemeIds.filter(item => item !== id));
    } else {
      setSavedSchemeIds([...savedSchemeIds, id]);
    }
  };

  const userState = (quizAnswers.state || '').trim().toLowerCase();
  const userDistrict = (quizAnswers.district || '').trim().toLowerCase();

  // Evaluate matches transparently with STRICT state isolation
  const scoredSchemes = allSchemes.map((scheme) => {
    let matchScore = 0;
    let matchStatus = 'Potential match';
    let statusColor = 'green';
    let matchNotes = [];

    const schemeState = (scheme.pilotLocation?.state || '').trim().toLowerCase();
    const schemeDistrict = (scheme.pilotLocation?.district || '').trim().toLowerCase();
    const isCentral = scheme.pilotLocation?.scope?.toLowerCase().includes('all india') || 
                      scheme.pilotLocation?.scope?.toLowerCase().includes('national');

    // STRICT LOCATION RULE: If scheme is state-specific and does NOT match user's state, exclude completely!
    const isStateMatch = schemeState === userState;
    if (!isCentral && !isStateMatch) {
      return {
        ...scheme,
        matchScore: 0,
        isStrictlyExcluded: true
      };
    }

    // 1. Location match scoring
    if (!isCentral && schemeDistrict === userDistrict) {
      matchScore += 45;
      matchNotes.push(`Direct match for ${quizAnswers.district} District`);
    } else if (isStateMatch && !isCentral) {
      matchScore += 35;
      matchNotes.push(`State-level program for ${quizAnswers.state}`);
    } else if (isCentral) {
      matchScore += 30;
      matchNotes.push(`All-India Central program valid in ${quizAnswers.district}`);
    }

    // 2. Occupation & Audience match
    const occupationMatches = scheme.matchRules.occupations.includes(quizAnswers.occupation);
    if (occupationMatches) {
      matchScore += 30;
      matchNotes.push(`Matches your status as a ${quizAnswers.occupation}`);
    } else {
      matchScore += 5;
    }

    // 3. Category match
    const categoryMatches = quizAnswers.interests.includes(scheme.category);
    if (categoryMatches) {
      matchScore += 30;
      matchNotes.push(`Matches focus on ${scheme.category}`);
    }

    // Determine status badge
    if (matchScore >= 65) {
      matchStatus = 'Potential match';
      statusColor = 'green';
    } else if (matchScore >= 35) {
      matchStatus = 'Check one requirement';
      statusColor = 'yellow';
    } else {
      matchStatus = 'More information needed';
      statusColor = 'gray';
    }

    // If user skipped income and scheme has income rules:
    if (quizAnswers.incomeBracket === 'skipped' && scheme.matchRules.maxFamilyIncome) {
      matchStatus = 'Check one requirement';
      statusColor = 'yellow';
      matchNotes.push('Income criteria unverified (skipped in questionnaire)');
    }

    return {
      ...scheme,
      matchScore,
      matchStatus,
      statusColor,
      isStrictlyExcluded: false,
      whyAppeared: scheme.whyMatchedReason || matchNotes.join(' • ')
    };
  });

  // Filter out strictly excluded schemes (different states)
  const validLocationSchemes = scoredSchemes.filter(s => !s.isStrictlyExcluded && s.matchScore >= 35);

  // Transparent Sorting: highest match score first, then verified first
  const sortedSchemes = [...validLocationSchemes].sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
  });

  // Filter by status if applied
  const displayedSchemes = filterStatus === 'all' 
    ? sortedSchemes 
    : sortedSchemes.filter(s => s.matchStatus.toLowerCase().includes(filterStatus.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Header & Match Count */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-leaf-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                Location-Verified Guidance Results
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              Possible Matches for Your Profile
            </h1>
            
            {/* Active Location Display with Quick Edit */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink-700">
              <span className="inline-flex items-center gap-1 font-bold text-ink-900 bg-cream-100 px-2.5 py-1 rounded-lg border border-cream-200">
                <MapPin className="w-3.5 h-3.5 text-leaf-600" />
                {quizAnswers.district}, {quizAnswers.state}
              </span>
              <span>• Status: <strong className="text-ink-900">{quizAnswers.occupation}</strong></span>
              
              {onOpenCustomLocationModal && (
                <button
                  onClick={onOpenCustomLocationModal}
                  className="text-leaf-700 hover:text-leaf-800 font-semibold underline flex items-center gap-1 ml-1"
                >
                  <Edit3 className="w-3 h-3" /> Change Location
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Scan Live Portals Trigger */}
            {onTriggerLiveScan && (
              <button
                onClick={onTriggerLiveScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-soft disabled:opacity-60 active:scale-98"
                title="Scan official state portals for newly published circulars"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning Portals...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Scan Live Portals</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onRetakeQuiz}
              className="px-4 py-2 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-xs font-semibold text-ink-700 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Answers</span>
            </button>
            <button
              onClick={onBrowseAll}
              className="px-4 py-2 rounded-xl border border-cream-300 bg-white hover:bg-cream-50 text-xs font-semibold text-ink-800 flex items-center gap-1.5 transition"
            >
              <span>View All</span>
            </button>
          </div>
        </div>

        {/* Live scanning progress bar */}
        {isScanning && (
          <div className="mt-4 p-3 bg-leaf-50 rounded-2xl border border-leaf-200 text-xs text-leaf-900 flex items-center gap-2.5 animate-pulse">
            <Loader2 className="w-4 h-4 text-leaf-600 animate-spin flex-shrink-0" />
            <div className="flex-1">
              <strong>Live Portal Scan in Progress:</strong> Querying official government databases and gazettes for {quizAnswers.district}, {quizAnswers.state}...
            </div>
          </div>
        )}

        {/* Transparent Sorting & Strict State Isolation Notice */}
        <div className="mt-6 pt-5 border-t border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-800">Location Filter:</span>
            <span className="bg-leaf-50 border border-leaf-200 px-2 py-0.5 rounded text-leaf-800 font-semibold">
              Strictly showing {quizAnswers.state} programs & All-India Central benefits only
            </span>
          </div>

          <div className="flex items-center gap-2 font-medium text-leaf-800">
            <ShieldCheck className="w-4 h-4 text-leaf-600 flex-shrink-0" />
            <span>Unrelated state records are excluded.</span>
          </div>
        </div>
      </div>

      {/* Trust Reminder Callout */}
      <div className="mb-6 p-4 rounded-2xl bg-leaf-50 border border-leaf-200 text-xs text-leaf-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-leaf-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Important Trust Reminder:</strong> These are <em>possible matches</em> for your review, not confirmed approvals. 
          Government departments independently evaluate every application. Always verify updated rules on the official links provided below before applying.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 text-xs">
        <span className="text-ink-500 font-bold mr-1">Filter status:</span>
        {[
          { id: 'all', label: `All Matches (${sortedSchemes.length})` },
          { id: 'potential', label: 'Potential match' },
          { id: 'check', label: 'Check one requirement' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterStatus === tab.id 
                ? 'bg-ink-900 text-white' 
                : 'bg-white border border-cream-300 text-ink-700 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scheme Match Cards Grid */}
      {displayedSchemes.length > 0 ? (
        <div className="space-y-5">
          {displayedSchemes.map((scheme) => {
            const isSaved = savedSchemeIds.includes(scheme.id);

            return (
              <div 
                key={scheme.id}
                className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-7 shadow-soft hover:shadow-soft-lg transition-all"
              >
                {/* Top Badge Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    {scheme.matchStatus === 'Potential match' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-leaf-100 text-leaf-800 border border-leaf-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-leaf-600" />
                        Potential Match
                      </span>
                    )}
                    {scheme.matchStatus === 'Check one requirement' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-citrus-100 text-citrus-900 border border-citrus-200">
                        <AlertCircle className="w-3.5 h-3.5 text-citrus-700" />
                        Check One Requirement
                      </span>
                    )}
                    {scheme.matchStatus === 'More information needed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-ink-100 text-ink-800 border border-ink-200">
                        <HelpCircle className="w-3.5 h-3.5 text-ink-600" />
                        More Information Needed
                      </span>
                    )}

                    {/* Category pill */}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-100 text-ink-700 border border-cream-200">
                      {scheme.category}
                    </span>

                    {/* Location Badge */}
                    <span className="text-xs font-medium text-ink-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-ink-400" />
                      {scheme.pilotLocation?.district ? `${scheme.pilotLocation.district}, ${scheme.pilotLocation.state}` : scheme.pilotLocation?.state}
                    </span>
                  </div>

                  {/* Verification status & Checked Date */}
                  <div className="flex items-center gap-2">
                    {scheme.isVerified ? (
                      <span className="text-[11px] font-semibold text-leaf-700 bg-leaf-50 px-2.5 py-0.5 rounded-full border border-leaf-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Checked on {scheme.lastCheckedDate}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Demo Sample Entry
                      </span>
                    )}
                  </div>
                </div>

                {/* Scheme Title & Target Audience */}
                <div className="mb-3">
                  <h3 className="text-xl font-extrabold text-ink-950 hover:text-leaf-700 transition cursor-pointer" onClick={() => onSelectScheme(scheme)}>
                    {scheme.title}
                  </h3>
                  <p className="text-xs font-semibold text-ink-500 mt-0.5">
                    Intended Audience: <span className="text-ink-800 font-bold">{scheme.targetAudience}</span>
                  </p>
                </div>

                {/* Short Explanation */}
                <p className="text-sm text-ink-700 leading-relaxed mb-4">
                  {scheme.shortDescription}
                </p>

                {/* Benefit Summary (Only shown when verified or clearly labeled) */}
                {scheme.benefitSummary && (
                  <div className="mb-4 p-3 bg-cream-50 rounded-2xl border border-cream-200 text-xs text-ink-800">
                    <span className="font-bold text-ink-950">Benefit Summary: </span>
                    <span>{scheme.benefitSummary}</span>
                  </div>
                )}

                {/* Why this appeared section */}
                <div className="mb-5 p-3 rounded-2xl bg-leaf-50/70 border border-leaf-200 text-xs text-leaf-950">
                  <span className="font-bold text-leaf-900">Why this appeared: </span>
                  <span>{scheme.whyAppeared}</span>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-ink-500">Official Source:</span>
                    <a
                      href={scheme.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-leaf-700 hover:text-leaf-800 hover:underline flex items-center gap-1"
                    >
                      <span>{scheme.officialSourceUrl?.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Save for later button */}
                    <button
                      onClick={() => toggleSave(scheme.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
                        isSaved 
                          ? 'border-citrus-400 bg-citrus-50 text-citrus-900' 
                          : 'border-cream-300 bg-white hover:bg-cream-100 text-ink-700'
                      }`}
                      title="Save scheme locally"
                    >
                      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-citrus-700" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    {/* Create Checklist CTA */}
                    <button
                      onClick={() => onCreateChecklist(scheme)}
                      className="px-3.5 py-2 rounded-xl bg-leaf-100 hover:bg-leaf-200 text-leaf-800 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-leaf-700" />
                      <span>Create Checklist</span>
                    </button>

                    {/* View Details CTA */}
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="px-4 py-2 rounded-xl bg-ink-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1.5 active:scale-98"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Respectful No-Match State with Direct Live Scan Button */
        <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-soft space-y-4">
          <div className="w-14 h-14 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto text-ink-600">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-ink-950">
            No Specific Pre-Indexed Schemes in {quizAnswers.district}, {quizAnswers.state}
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            We strictly filtered out schemes from other states. You can scan official state portals to pull live schemes for <strong>{quizAnswers.district}</strong>, browse All-India Central schemes, or contact a volunteer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onTriggerLiveScan && (
              <button
                onClick={onTriggerLiveScan}
                disabled={isScanning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-leaf-600 text-white font-bold text-xs sm:text-sm hover:bg-leaf-700 shadow-soft flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                <span>Scan Official Portals for {quizAnswers.district}</span>
              </button>
            )}
            <button
              onClick={onBrowseAll}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-cream-300 bg-white text-ink-800 text-xs sm:text-sm font-semibold hover:bg-cream-50 transition"
            >
              Browse All Central Schemes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
