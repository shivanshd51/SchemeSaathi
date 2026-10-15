import React, { useState } from 'react';
import { Compass, FileCheck, Layers, BookOpen, BarChart3, Database, Globe, Menu, X, ArrowRight, MapPin, Edit3 } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  language, 
  setLanguage,
  selectedPilot,
  onOpenCustomLocationModal,
  checklistCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: language === 'hi' ? 'होम' : 'Home' },
    { id: 'quiz', label: language === 'hi' ? 'पात्रता खोजें' : 'Eligibility Finder' },
    { id: 'browse', label: language === 'hi' ? 'सभी योजनाएं' : 'Browse Schemes' },
    { id: 'checklist', label: language === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 'Document Checklist', badge: checklistCount > 0 ? checklistCount : null },
    { id: 'guide', label: language === 'hi' ? 'आवेदन गाइड' : 'Application Guide' },
    { id: 'impact', label: language === 'hi' ? 'प्रभाव व परिचय' : 'About / Impact' },
    { id: 'admin', label: language === 'hi' ? 'डेटा स्कीमा' : 'Admin / Data' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & Student Initiative Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-leaf-600 flex items-center justify-center text-white shadow-soft group-hover:bg-leaf-700 transition">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-ink-900">
                    Scheme<span className="text-leaf-600">Saathi</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-citrus-100 text-citrus-700 border border-citrus-200">
                    Pilot
                  </span>
                </div>
                <p className="text-[11px] font-medium text-ink-500 leading-tight">
                  Yuva Shakti Think Tank Initiative
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                    active 
                      ? 'bg-leaf-100 text-leaf-800' 
                      : 'text-ink-700 hover:text-ink-950 hover:bg-cream-200/80'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 bg-leaf-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Custom Location Trigger, Language & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Any Location Selector Button */}
            <button
              onClick={onOpenCustomLocationModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cream-300 bg-white hover:bg-cream-100 text-xs font-semibold text-ink-800 shadow-sm transition group"
              title="Click to change or enter any state and district"
            >
              <MapPin className="w-3.5 h-3.5 text-leaf-600 group-hover:scale-110 transition" />
              <span>{selectedPilot.district}, {selectedPilot.state.slice(0, 12)}</span>
              <Edit3 className="w-3 h-3 text-ink-400 group-hover:text-ink-800" />
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-cream-300 bg-white text-xs font-semibold text-ink-700 hover:bg-cream-100 shadow-sm"
              title="Toggle English / Hindi Draft translation"
            >
              <Globe className="w-3.5 h-3.5 text-ink-500" />
              <span>{language === 'en' ? 'हिंदी (Draft)' : 'English'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setCurrentTab('quiz')}
              className="bg-leaf-600 hover:bg-leaf-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-soft flex items-center gap-1.5 transition active:scale-98"
            >
              <span>{language === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCustomLocationModal}
              className="p-1.5 rounded border border-cream-300 bg-white text-xs font-bold text-ink-800 flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-leaf-600" />
              <span className="truncate max-w-[80px]">{selectedPilot.district}</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-1.5 rounded border border-cream-300 bg-white text-xs font-bold text-ink-700"
            >
              {language === 'en' ? 'HI' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ink-700 hover:bg-cream-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-cream-50 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomLocationModal();
            }}
            className="mb-3 p-3 bg-cream-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:bg-cream-300 transition"
          >
            <div className="text-xs">
              <span className="text-ink-500 font-medium">Selected Location (Tap to change):</span>
              <p className="font-bold text-ink-900">{selectedPilot.district}, {selectedPilot.state}</p>
            </div>
            <span className="text-[10px] font-bold bg-white text-ink-800 border border-cream-300 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Edit3 className="w-2.5 h-2.5" /> Edit
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === item.id 
                    ? 'bg-leaf-600 text-white' 
                    : 'text-ink-800 hover:bg-cream-200'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-white text-leaf-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-cream-200">
            <button
              onClick={() => {
                setCurrentTab('quiz');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-leaf-600 text-white font-semibold py-2.5 rounded-xl text-center shadow-soft flex items-center justify-center gap-2"
            >
              <span>{language === 'hi' ? 'पात्रता खोजें' : 'Check Eligibility Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
