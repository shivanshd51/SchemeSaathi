import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Clock, MapPin, CheckCircle2, AlertTriangle, FileCheck, ArrowRight, Bookmark, BookmarkCheck, RotateCcw, RefreshCw, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/schemes';

export default function BrowseSchemes({ 
  schemes, 
  onSelectScheme, 
  onCreateChecklist, 
  selectedPilot,
  onTriggerLiveScan,
  isScanning = false,
  language 
}) {
  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [verificationFilter, setVerificationFilter] = useState('all'); // all, verified, demo
  const [locationScopeFilter, setLocationScopeFilter] = useState('current'); // 'current' or 'all_states'
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);

  const toggleSave = (id) => {
    if (savedSchemeIds.includes(id)) {
      setSavedSchemeIds(savedSchemeIds.filter(item => item !== id));
    } else {
      setSavedSchemeIds([...savedSchemeIds, id]);
    }
  };

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const userState = (selectedPilot?.state || '').trim().toLowerCase();
  const userDistrict = (selectedPilot?.district || '').trim().toLowerCase();

  // Filter schemes
  const filteredSchemes = schemes.filter((scheme) => {
    const schemeState = (scheme.pilotLocation?.state || '').trim().toLowerCase();
    const schemeDistrict = (scheme.pilotLocation?.district || '').trim().toLowerCase();
    const isCentral = scheme.pilotLocation?.scope?.toLowerCase().includes('all india') || 
                      scheme.pilotLocation?.scope?.toLowerCase().includes('national');

    // Location Scope Filter:
    if (locationScopeFilter === 'current') {
      const stateMatches = schemeState === userState;
      if (!isCentral && !stateMatches) {
        return false; // strictly exclude other state schemes
      }
    }

    // 1. Search query
    const matchesSearch = 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;

    // 3. Audience
    const matchesAudience = selectedAudience === 'All' || 
      scheme.targetAudience.toLowerCase().includes(selectedAudience.toLowerCase());

    // 4. Verification
    const matchesVerification = 
      verificationFilter === 'all' ? true :
      verificationFilter === 'verified' ? scheme.isVerified : !scheme.isVerified;

    return matchesSearch && matchesCategory && matchesAudience && matchesVerification;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedAudience('All');
    setVerificationFilter('all');
    setLocationScopeFilter('current');
    setHasError(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title & Stats */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-leaf-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                Scheme Repository • {selectedPilot.district}, {selectedPilot.state}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              Browse Government & Innovation Schemes
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Currently filtering for <strong>{selectedPilot.state}</strong> and All-India programs. No mismatched state records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Live Scan Trigger */}
            {onTriggerLiveScan && (
              <button
                onClick={onTriggerLiveScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold flex items-center gap-1.5 shadow-soft transition disabled:opacity-60"
              >
                {isScanning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Scan Official Portals</span>
              </button>
            )}

            <button
              onClick={handleSimulateLoading}
              className="px-3 py-1.5 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-ink-700 transition"
              title="Test loading skeleton animation"
            >
              Test Loading
            </button>
            <button
              onClick={() => setHasError(!hasError)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                hasError ? 'border-red-400 bg-red-50 text-red-700' : 'border-cream-300 bg-cream-50 text-ink-700 hover:bg-cream-100'
              }`}
            >
              {hasError ? 'Clear Error' : 'Test Error'}
            </button>
          </div>
        </div>

        {/* Live Scan Status Bar */}
        {isScanning && (
          <div className="mt-4 p-3 bg-leaf-50 rounded-2xl border border-leaf-200 text-xs text-leaf-900 flex items-center gap-2.5 animate-pulse">
            <Loader2 className="w-4 h-4 text-leaf-600 animate-spin flex-shrink-0" />
            <div className="flex-1">
              <strong>Querying Government Databases:</strong> Pulling official verified circulars for {selectedPilot.district}, {selectedPilot.state}...
            </div>
          </div>
        )}

        {/* Search Bar & Secondary Filters */}
        <div className="mt-6 pt-5 border-t border-cream-200 grid grid-cols-1 md:grid-cols-12 gap-3.5">
          
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs sm:text-sm text-ink-900 focus:ring-2 focus:ring-leaf-500 font-medium"
            />
          </div>

          {/* Location Scope Toggle */}
          <div className="md:col-span-3">
            <select
              value={locationScopeFilter}
              onChange={(e) => setLocationScopeFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs text-ink-800 font-semibold focus:ring-2 focus:ring-leaf-500"
            >
              <option value="current">Only {selectedPilot.state} & Central</option>
              <option value="all_states">Show All States (Unfiltered)</option>
            </select>
          </div>

          {/* Audience Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs text-ink-800 font-semibold focus:ring-2 focus:ring-leaf-500"
            >
              <option value="All">All Audiences</option>
              <option value="Student">Students & College</option>
              <option value="Youth">Youth & Job Seekers</option>
              <option value="Women">Women Entrepreneurs</option>
              <option value="Founder">Founders & Startups</option>
            </select>
          </div>

          {/* Verification Status Filter */}
          <div className="md:col-span-2">
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs text-ink-800 font-semibold focus:ring-2 focus:ring-leaf-500"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified Official</option>
              <option value="demo">Demo / Samples</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-leaf-600 text-white shadow-sm' 
                  : 'bg-cream-100 hover:bg-cream-200 text-ink-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR STATE */}
      {hasError ? (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-red-950 mb-1">
            Simulated Service Connection Disruption
          </h3>
          <p className="text-xs text-red-700 mb-4 leading-relaxed">
            This state demonstrates how SchemeSaathi gracefully handles network timeouts or regional database maintenance without crashing.
          </p>
          <button
            onClick={() => setHasError(false)}
            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition"
          >
            Recover & Retry Connection
          </button>
        </div>
      ) : isLoading ? (
        /* LOADING SKELETON STATE */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-cream-300 space-y-4">
              <div className="flex justify-between">
                <div className="h-5 bg-cream-200 rounded-full w-24"></div>
                <div className="h-5 bg-cream-200 rounded-full w-20"></div>
              </div>
              <div className="h-6 bg-cream-200 rounded-xl w-3/4"></div>
              <div className="h-14 bg-cream-100 rounded-xl"></div>
              <div className="h-8 bg-cream-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : filteredSchemes.length > 0 ? (
        /* SCHEMES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const isSaved = savedSchemeIds.includes(scheme.id);

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cream-100 text-ink-700 border border-cream-200">
                      {scheme.category}
                    </span>

                    {scheme.isVerified ? (
                      <span className="text-[10px] font-bold text-leaf-700 bg-leaf-50 px-2.5 py-0.5 rounded-full border border-leaf-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {scheme.lastCheckedDate}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Demo Sample
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectScheme(scheme)}
                    className="text-lg font-bold text-ink-950 hover:text-leaf-700 transition cursor-pointer leading-snug mb-1"
                  >
                    {scheme.title}
                  </h3>

                  {/* Audience & Location */}
                  <div className="space-y-0.5 text-xs text-ink-500 mb-3">
                    <p>
                      Audience: <strong className="text-ink-800">{scheme.targetAudience}</strong>
                    </p>
                    <p className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-ink-400" />
                      {scheme.pilotLocation?.district ? `${scheme.pilotLocation.district}, ${scheme.pilotLocation.state}` : scheme.pilotLocation?.state}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-ink-700 leading-relaxed line-clamp-3 mb-4">
                    {scheme.shortDescription}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-cream-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <a
                      href={scheme.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-leaf-700 font-semibold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => toggleSave(scheme.id)}
                      className="text-ink-500 hover:text-ink-900 text-xs font-medium flex items-center gap-1"
                    >
                      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-citrus-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onCreateChecklist(scheme)}
                      className="w-full py-2 rounded-xl bg-leaf-50 hover:bg-leaf-100 text-leaf-800 text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Checklist</span>
                    </button>
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="w-full py-2 rounded-xl bg-ink-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY SEARCH STATE */
        <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 text-center max-w-md mx-auto shadow-soft space-y-4">
          <Search className="w-12 h-12 text-ink-400 mx-auto" />
          <h3 className="text-lg font-bold text-ink-950">
            No Schemes Found for {selectedPilot.state}
          </h3>
          <p className="text-xs text-ink-600 leading-relaxed">
            No pre-indexed records matched your search query. Click below to scan official state portals for {selectedPilot.district}, {selectedPilot.state}.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {onTriggerLiveScan && (
              <button
                onClick={onTriggerLiveScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl bg-leaf-600 text-white font-bold text-xs hover:bg-leaf-700 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isScanning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Scan Official Portals</span>
              </button>
            )}
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-ink-900 text-white font-bold text-xs hover:bg-black transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
