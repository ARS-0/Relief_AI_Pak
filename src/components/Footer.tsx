import React from 'react';
import { PhoneCall, ShieldCheck, ExternalLink, Heart, Globe, ArrowUpRight } from 'lucide-react';
import { PAKISTAN_HOTLINES } from '../data/pakistanEmergencyData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTrappedMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrappedMode }) => {
  return (
    <footer className="bg-white border-t border-[#E5EAF0] pt-16 pb-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Hotlines Strip */}
        <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-teal-50/70 border border-[#E5EAF0] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-500/20">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#172033] font-heading">
                Pakistan 24/7 Verified Emergency Dispatchers
              </div>
              <p className="text-xs text-[#64748B]">
                Toll-free emergency lines accessible from any mobile or landline network.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PAKISTAN_HOTLINES.slice(0, 4).map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100/80 border border-slate-200 text-[#172033] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span className="text-blue-600">{h.name}:</span>
                <span className="font-extrabold text-slate-900 font-mono-numbers">{h.number}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Mandate Column (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <BrandLogo variant="footer" onClick={() => onNavigate('hero')} />
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-sm">
              An intelligent, public-safety technology initiative built to help citizens across all provinces prepare, stay calm, and take verified action during disasters.
            </p>

            <div className="pt-2 text-xs text-[#64748B] space-y-1.5">
              <div className="font-bold text-[#172033]">Data Sources & Affiliations:</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                <span className="flex items-center gap-1 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  NDMA Pakistan
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Rescue 1122
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  PMD Weather
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Edhi / Chhipa
                </span>
              </div>
            </div>
          </div>

          {/* Action Guides Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider font-heading">
              Emergency Action Guides
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Flood & Nullah Overflow Protocol
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Earthquake Drop, Cover & Hold
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Building Fire & Gas Leak Escape
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Highland Highway Landslide Safety
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Severe Monsoon & Heatwave Aid
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  First Aid Bleeding & CPR Triage
                </button>
              </li>
            </ul>
          </div>

          {/* Life-Saving Tools Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider font-heading">
              Safety & Survival Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>
                <button 
                  onClick={onOpenTrappedMode} 
                  className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 py-0.5"
                >
                  <span>🚨 "I'm Trapped" Emergency Mode</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Urdu & Roman Urdu AI Triage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('find-help')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Nearby Safe Shelter Radar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('family-safety')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Family Safety & Reunion Plan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('emergency-kit')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Go-Bag Survival Checklist
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('alerts')} 
                  className="hover:text-blue-600 transition-colors text-left py-0.5"
                >
                  Live PMD & NDMA Advisories
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Network Coverage Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider font-heading">
              Coverage Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-[#64748B]">
              <li>Punjab (Rescue 1122)</li>
              <li>Sindh (Karachi / Sukkur)</li>
              <li>Khyber Pakhtunkhwa</li>
              <li>Balochistan (Quetta)</li>
              <li>Islamabad Capital (ICT)</li>
              <li>Gilgit-Baltistan (GB)</li>
              <li>Azad Jammu & Kashmir</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean, Decent & Dignified */}
        <div className="pt-8 border-t border-[#E5EAF0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>© 2026 Relief AI Pakistan · Stay Calm. Stay Safe. Get Help.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Non-profit public safety utility. In immediate life threat, always dial <a href="tel:1122" className="text-slate-600 font-bold hover:underline">1122</a> or <a href="tel:15" className="text-slate-600 font-bold hover:underline">15</a>.
          </div>
        </div>

      </div>
    </footer>
  );
};
