import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, WifiOff, ChevronDown, Check, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenTrappedMode: () => void;
  onNavigate: (sectionId: string) => void;
  isOffline: boolean;
  onToggleOfflineSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  onOpenTrappedMode,
  onNavigate,
  isOffline,
  onToggleOfflineSimulator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'guide', label: currentLang === 'ur' ? 'گائیڈ' : 'Emergency Guide' },
    { id: 'ai-assistant', label: currentLang === 'ur' ? 'اے آئی معاون' : 'AI Assistant' },
    { id: 'alerts', label: currentLang === 'ur' ? 'الرٹس' : 'Live Alerts' },
    { id: 'find-help', label: currentLang === 'ur' ? 'شیلٹرز' : 'Find Shelters' },
    { id: 'family-safety', label: currentLang === 'ur' ? 'خاندان' : 'Family Safety' },
    { id: 'emergency-kit', label: currentLang === 'ur' ? 'کِٹ' : 'Go-Bag Kit' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getLangLabel = () => {
    switch (currentLang) {
      case 'ur': return 'اردو';
      case 'roman_ur': return 'Roman Urdu';
      default: return 'English';
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
      scrolled 
        ? 'border-b border-[#E9EEF5] shadow-[0_2px_12px_rgba(16,24,40,0.04)]' 
        : 'border-b border-[#E9EEF5]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] flex items-center justify-between gap-8">
        
        {/* Official Brand Logo */}
        <BrandLogo variant="navbar" onClick={() => onNavigate('hero')} />

        {/* Navigation Links — 14px font-size, 550 weight */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-[14px] font-[550] text-[#475467]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="px-3.5 py-2 rounded-lg hover:text-[#111827] hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Offline simulator toggle */}
          <button
            onClick={onToggleOfflineSimulator}
            title={isOffline ? "You are simulating Offline Mode" : "Simulate cellular network outage"}
            className={`px-3 py-2 rounded-xl text-xs font-[600] transition-all flex items-center gap-1.5 cursor-pointer ${
              isOffline
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-[#667085] hover:text-[#111827] hover:bg-slate-100 border border-[#E4E7EC]'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">
              {isOffline ? 'Offline Active' : 'Test Offline'}
            </span>
          </button>

          {/* Language dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-[600] text-[#111827] bg-white hover:bg-slate-50 rounded-xl border border-[#E4E7EC] transition-colors cursor-pointer"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="min-w-[48px] text-left">{getLangLabel()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-[#E4E7EC] py-1.5 z-50 animate-fade-in">
                  <button
                    onClick={() => {
                      onSelectLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      currentLang === 'en' ? 'font-bold text-[#2563EB] bg-blue-50/70' : 'text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                  <button
                    onClick={() => {
                      onSelectLang('ur');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between font-urdu ${
                      currentLang === 'ur' ? 'font-bold text-[#2563EB] bg-blue-50/70' : 'text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <span>اردو (Urdu)</span>
                    {currentLang === 'ur' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                  <button
                    onClick={() => {
                      onSelectLang('roman_ur');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      currentLang === 'roman_ur' ? 'font-bold text-[#2563EB] bg-blue-50/70' : 'text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <span>Roman Urdu</span>
                    {currentLang === 'roman_ur' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Emergency Help Button — Solid Coral #F43F5E, height 48px, radius 12px, font-weight 700 */}
          <button
            onClick={onOpenTrappedMode}
            className="px-4 py-2.5 h-12 text-[14px] font-[700] text-white bg-[#F43F5E] hover:bg-[#E11D48] active:scale-[0.98] rounded-xl shadow-sm shadow-rose-500/20 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
            <span>Emergency Help</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 bg-white border-t border-[#E9EEF5] flex flex-col gap-1 w-full shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left px-3 py-2.5 text-sm font-semibold text-[#111827] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
