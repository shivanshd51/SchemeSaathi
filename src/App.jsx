import React, { useState, useEffect } from 'react';
import TrustBanner from './components/TrustBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PilotAreaSection from './components/PilotAreaSection';
import EligibilityQuiz from './components/EligibilityQuiz';
import MatchResults from './components/MatchResults';
import SchemeModal from './components/SchemeModal';
import DocumentChecklist from './components/DocumentChecklist';
import ApplicationGuide from './components/ApplicationGuide';
import BrowseSchemes from './components/BrowseSchemes';
import ImpactAbout from './components/ImpactAbout';
import AdminDataInspector from './components/AdminDataInspector';
import VolunteerModal from './components/VolunteerModal';
import CustomLocationModal from './components/CustomLocationModal';
import Footer from './components/Footer';

import { SCHEMES_DATABASE, PILOT_REGIONS } from './data/schemes';
import { autoDiscoverLocationSchemes, getCachedDiscoveredSchemes } from './services/geminiService';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  
  // Pilot / Custom Location Selection
  const [selectedPilot, setSelectedPilot] = useState(PILOT_REGIONS[0]); // Maharashtra - Pune by default
  const [customLocationModalOpen, setCustomLocationModalOpen] = useState(false);
  const [allSchemes, setAllSchemes] = useState(SCHEMES_DATABASE);
  const [isScanning, setIsScanning] = useState(false);

  // Questionnaire / Matches State
  const [quizAnswers, setQuizAnswers] = useState({
    state: 'Maharashtra',
    district: 'Pune',
    ageRange: '18-24',
    occupation: 'student',
    incomeBracket: 'under_2.5l',
    interests: ['Government Schemes', 'Skill & Employment'],
    saveQuizAnswersLocally: false
  });

  // Modal & Checklist State
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [activeChecklistScheme, setActiveChecklistScheme] = useState(allSchemes[0]);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [volunteerTargetScheme, setVolunteerTargetScheme] = useState(null);

  // Automatically scan official state portals when location changes if not already cached
  const scanLocationPortals = async (state, district, occupation = "student") => {
    if (!state || !district) return;
    
    // Check if we already have specific state schemes in the active database
    const hasExistingStateSchemes = allSchemes.some(
      s => s.pilotLocation?.state?.toLowerCase() === state.toLowerCase() &&
           !s.pilotLocation?.scope?.toLowerCase().includes('all india')
    );

    // If already has schemes, check cache to see if more were saved
    const cached = getCachedDiscoveredSchemes(state, district);
    if (cached && cached.length > 0) {
      const existingIds = new Set(allSchemes.map(s => s.id));
      const fresh = cached.filter(s => !existingIds.has(s.id));
      if (fresh.length > 0) {
        setAllSchemes(prev => [...fresh, ...prev]);
      }
      return;
    }

    // If new state/district without local schemes, trigger automatic scan
    if (!hasExistingStateSchemes) {
      setIsScanning(true);
      try {
        const discovered = await autoDiscoverLocationSchemes({ state, district, occupation });
        if (discovered && discovered.length > 0) {
          const existingIds = new Set(allSchemes.map(s => s.id));
          const fresh = discovered.filter(s => !existingIds.has(s.id));
          if (fresh.length > 0) {
            setAllSchemes(prev => [...fresh, ...prev]);
            setActiveChecklistScheme(fresh[0]);
          }
        }
      } catch (err) {
        console.warn("Background portal scan notice:", err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleStartQuiz = () => {
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteQuiz = (answers) => {
    setQuizAnswers(answers);
    const newLoc = {
      state: answers.state,
      district: answers.district,
      activePilot: PILOT_REGIONS.some(
        p => p.state.toLowerCase() === answers.state.toLowerCase() && 
             p.district.toLowerCase() === answers.district.toLowerCase()
      )
    };
    setSelectedPilot(newLoc);
    // Trigger automatic portal scan in the background
    scanLocationPortals(answers.state, answers.district, answers.occupation);
    setCurrentTab('matches');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCustomLocation = (newLoc) => {
    setSelectedPilot(newLoc);
    setQuizAnswers(prev => ({
      ...prev,
      state: newLoc.state,
      district: newLoc.district
    }));
    // Trigger automatic background scan for the new location
    scanLocationPortals(newLoc.state, newLoc.district, quizAnswers.occupation);
  };

  const handleTriggerManualScan = () => {
    setIsScanning(true);
    autoDiscoverLocationSchemes({
      state: selectedPilot.state,
      district: selectedPilot.district,
      occupation: quizAnswers.occupation
    }).then((discovered) => {
      if (discovered && discovered.length > 0) {
        const existingIds = new Set(allSchemes.map(s => s.id));
        const fresh = discovered.filter(s => !existingIds.has(s.id));
        if (fresh.length > 0) {
          setAllSchemes(prev => [...fresh, ...prev]);
          setActiveChecklistScheme(fresh[0]);
        }
      }
    }).catch((err) => {
      console.warn("Manual scan notice:", err);
    }).finally(() => {
      setIsScanning(false);
    });
  };

  const handleOpenSchemeDetails = (scheme) => {
    setActiveModalScheme(scheme);
  };

  const handleCreateChecklist = (scheme) => {
    setActiveChecklistScheme(scheme);
    setCurrentTab('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVolunteerHelp = (scheme = null) => {
    setVolunteerTargetScheme(scheme);
    setVolunteerModalOpen(true);
  };

  const handleAddScheme = (newScheme) => {
    setAllSchemes([newScheme, ...allSchemes]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-ink-900 selection:bg-leaf-200 selection:text-leaf-900 font-sans">
      
      {/* Top Informational Guidance & Trust Banner */}
      <TrustBanner language={language} />

      {/* Main Responsive Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        selectedPilot={selectedPilot}
        onOpenCustomLocationModal={() => setCustomLocationModalOpen(true)}
      />

      {/* Dynamic View Router */}
      <main className="flex-1">
        
        {/* 1. HOME VIEW */}
        {currentTab === 'home' && (
          <>
            <Hero
              onStartQuiz={handleStartQuiz}
              onBrowseSchemes={() => {
                setCurrentTab('browse');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewChecklist={() => {
                setCurrentTab('checklist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              selectedPilot={selectedPilot}
              language={language}
            />

            <PilotAreaSection
              selectedPilot={selectedPilot}
              setSelectedPilot={handleSaveCustomLocation}
              pilotRegions={PILOT_REGIONS}
              onStartQuiz={handleStartQuiz}
              onOpenCustomLocationModal={() => setCustomLocationModalOpen(true)}
              language={language}
            />
          </>
        )}

        {/* 2. ELIGIBILITY FINDER QUESTIONNAIRE */}
        {currentTab === 'quiz' && (
          <EligibilityQuiz
            selectedPilot={selectedPilot}
            onCompleteQuiz={handleCompleteQuiz}
            onCancel={() => setCurrentTab('home')}
            language={language}
          />
        )}

        {/* 3. MATCH RESULTS */}
        {currentTab === 'matches' && (
          <MatchResults
            quizAnswers={quizAnswers}
            allSchemes={allSchemes}
            onSelectScheme={handleOpenSchemeDetails}
            onCreateChecklist={handleCreateChecklist}
            onRetakeQuiz={() => setCurrentTab('quiz')}
            onBrowseAll={() => setCurrentTab('browse')}
            onOpenVolunteerHelp={handleOpenVolunteerHelp}
            onOpenCustomLocationModal={() => setCustomLocationModalOpen(true)}
            onTriggerLiveScan={handleTriggerManualScan}
            isScanning={isScanning}
            language={language}
          />
        )}

        {/* 4. BROWSE SCHEMES */}
        {currentTab === 'browse' && (
          <BrowseSchemes
            schemes={allSchemes}
            onSelectScheme={handleOpenSchemeDetails}
            onCreateChecklist={handleCreateChecklist}
            selectedPilot={selectedPilot}
            onTriggerLiveScan={handleTriggerManualScan}
            isScanning={isScanning}
            language={language}
          />
        )}

        {/* 5. PERSONALIZED DOCUMENT CHECKLIST */}
        {currentTab === 'checklist' && (
          <DocumentChecklist
            selectedScheme={activeChecklistScheme}
            allSchemes={allSchemes}
            onSelectScheme={setActiveChecklistScheme}
            onOpenVolunteerHelp={handleOpenVolunteerHelp}
            language={language}
          />
        )}

        {/* 6. APPLICATION GUIDE & JARGON BUSTER */}
        {currentTab === 'guide' && (
          <ApplicationGuide
            schemes={allSchemes}
            onSelectScheme={handleOpenSchemeDetails}
            onOpenVolunteerHelp={handleOpenVolunteerHelp}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {/* 7. ABOUT & IMPACT DASHBOARD */}
        {currentTab === 'impact' && (
          <ImpactAbout
            onStartQuiz={handleStartQuiz}
            onBrowseSchemes={() => setCurrentTab('browse')}
            pilotDistrict={selectedPilot.district}
            language={language}
          />
        )}

        {/* 8. ADMIN / DATA SCHEMA */}
        {currentTab === 'admin' && (
          <AdminDataInspector
            schemes={allSchemes}
            onAddScheme={handleAddScheme}
            language={language}
          />
        )}

      </main>

      {/* Custom Location Input Modal (Any State & District) */}
      <CustomLocationModal
        isOpen={customLocationModalOpen}
        onClose={() => setCustomLocationModalOpen(false)}
        currentLocation={selectedPilot}
        onSaveLocation={handleSaveCustomLocation}
      />

      {/* Scheme Details Modal */}
      {activeModalScheme && (
        <SchemeModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
          onCreateChecklist={handleCreateChecklist}
          onOpenVolunteerHelp={handleOpenVolunteerHelp}
          language={language}
        />
      )}

      {/* Campus Volunteer Assistance Request Modal */}
      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
        preselectedScheme={volunteerTargetScheme}
        pilotDistrict={selectedPilot.district}
      />

      {/* Global Footer with Statutory Disclaimers */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedPilot={selectedPilot}
        language={language}
      />

    </div>
  );
}
