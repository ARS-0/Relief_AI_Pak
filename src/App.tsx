/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PakistanStatusBanner } from './components/PakistanStatusBanner';
import { EmergencyQuickActions } from './components/EmergencyQuickActions';
import { AiAssistantSection } from './components/AiAssistantSection';
import { NearbyHelpMap } from './components/NearbyHelpMap';
import { FamilySafetySection } from './components/FamilySafetySection';
import { EmergencyKitSection } from './components/EmergencyKitSection';
import { UniversalEmergencyModal } from './components/UniversalEmergencyModal';
import { TrappedEmergencyMode } from './components/TrappedEmergencyMode';
import { OfflineModal } from './components/OfflineModal';
import { Footer } from './components/Footer';
import { Language, EmergencyGuideStep } from './types';
import { EMERGENCY_GUIDES } from './data/pakistanEmergencyData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeGuide, setActiveGuide] = useState<EmergencyGuideStep | null>(null);
  const [isTrappedModeOpen, setIsTrappedModeOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);

  // Monitor real browser online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      setIsOfflineModalOpen(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggleOfflineSimulator = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    if (nextState) {
      setIsOfflineModalOpen(true);
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FBFF] text-[#172033] flex flex-col font-sans ${currentLang === 'ur' ? 'font-urdu' : ''}`}>
      
      {/* Offline Alert Strip if offline */}
      {isOffline && (
        <div className="bg-amber-500 text-white text-xs font-bold py-2 px-4 text-center sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2">
          <span>⚠️ You are in Offline Mode. Live alerts are paused. Emergency guides and telephone numbers remain active.</span>
          <button
            onClick={() => setIsOfflineModalOpen(true)}
            className="underline hover:opacity-80 cursor-pointer ml-1"
          >
            View Offline Manual
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenTrappedMode={() => setIsTrappedModeOpen(true)}
        onNavigate={handleNavigate}
        isOffline={isOffline}
        onToggleOfflineSimulator={handleToggleOfflineSimulator}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onOpenTrappedMode={() => setIsTrappedModeOpen(true)}
          onScrollToAi={() => handleNavigate('ai-assistant')}
          onScrollToGuides={() => handleNavigate('guide')}
        />

        {/* 2. Live Pakistan Emergency Status Banner */}
        <PakistanStatusBanner />

        {/* 3. Emergency Quick Actions Grid ("What do you need help with?") */}
        <EmergencyQuickActions
          onSelectCategory={(guide) => setActiveGuide(guide)}
          onOpenTrappedMode={() => setIsTrappedModeOpen(true)}
        />

        {/* 4. AI Emergency Assistant Section ("Meet Your Emergency AI") */}
        <AiAssistantSection
          onOpenTrappedMode={() => setIsTrappedModeOpen(true)}
          onNavigateToMap={() => handleNavigate('find-help')}
        />

        {/* 5. Nearby Help & Safe Places Map */}
        <NearbyHelpMap />

        {/* 6. Family Safety & Connection Plan */}
        <FamilySafetySection />

        {/* 7. Emergency Kit & "What Should I Take?" Checklist */}
        <EmergencyKitSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrappedMode={() => setIsTrappedModeOpen(true)}
      />

      {/* Universal Emergency Action Modal (when any disaster category is clicked) */}
      <UniversalEmergencyModal
        guide={activeGuide}
        onClose={() => setActiveGuide(null)}
        onOpenTrappedMode={() => {
          setActiveGuide(null);
          setIsTrappedModeOpen(true);
        }}
        onNavigateToMap={() => handleNavigate('find-help')}
        currentLang={currentLang}
      />

      {/* 🚨 Fullscreen "I'M TRAPPED" Emergency Mode */}
      {isTrappedModeOpen && (
        <TrappedEmergencyMode
          onClose={() => setIsTrappedModeOpen(false)}
          onNavigateToMap={() => {
            setIsTrappedModeOpen(false);
            handleNavigate('find-help');
          }}
          onNavigateToFamily={() => {
            setIsTrappedModeOpen(false);
            handleNavigate('family-safety');
          }}
        />
      )}

      {/* Offline Mode Information Modal */}
      <OfflineModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        onSelectGuide={(guide) => setActiveGuide(guide)}
      />

      {/* Floating Emergency SOS Button on Mobile */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden">
        <button
          onClick={() => setIsTrappedModeOpen(true)}
          className="w-14 h-14 rounded-full bg-[#F43F5E] text-white flex items-center justify-center shadow-lg shadow-rose-500/40 text-xl active:scale-95 transition-transform"
          aria-label="Open Emergency Mode"
        >
          🚨
        </button>
      </div>

    </div>
  );
}
