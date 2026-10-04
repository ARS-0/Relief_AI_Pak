import React from 'react';
import { ArrowRight, Bot, ShieldCheck, MapPin, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  currentLang: Language;
  onOpenTrappedMode: () => void;
  onScrollToAi: () => void;
  onScrollToGuides: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onOpenTrappedMode,
  onScrollToAi,
  onScrollToGuides,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 bg-[#F8FAFC]">
      {/* Extremely subtle blue atmospheric glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-32 right-10 w-[500px] h-[500px] rounded-full blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle at 75% 30%, rgba(37,99,235,0.06), transparent 50%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-xs text-[13px] font-[650] text-[#344054] mb-6">
              <span className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-[10px]">PK</span>
              <span>Built for Pakistan · Verified Disaster Relief</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-[750] text-[#111827] tracking-[-2.5px] leading-[1.05] mb-7 max-w-[680px] font-heading">
              When Every Second Matters,{' '}
              <span className="text-[#2563EB] block sm:inline">
                Know What To Do.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-[17px] sm:text-[19px] font-[450] text-[#667085] max-w-[620px] leading-[1.7] mb-9">
              {currentLang === 'ur'
                ? 'ہنگامی حالات کے لیے فوری رہنمائی، تصدیق شدہ شیلٹرز، اور لائیو ریسکیو معلومات تاکہ آپ پرسکون رہ کر فوری حفاظتی قدم اٹھا سکیں۔'
                : 'AI-powered emergency guidance, verified resources, and safety tools designed to help you stay calm and act quickly across all provinces.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenTrappedMode}
                className="h-[52px] px-6 rounded-xl text-white font-[700] text-[15px] bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-all flex items-center justify-center gap-2.5 shadow-[0_6px_18px_rgba(37,99,235,0.18)] cursor-pointer"
              >
                <span>🚨</span>
                <span>Get Emergency Help</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onScrollToAi}
                className="h-[52px] px-6 rounded-xl text-[#111827] font-[650] text-[15px] bg-white hover:bg-[#F7F9FC] border border-[#D9E0EA] hover:border-[#BFC9D8] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
              >
                <Bot className="w-5 h-5 text-[#2563EB]" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Emergency Hotline Quick Strip */}
            <div className="w-full pt-5 border-t border-[#E4E7EC] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#667085]">
              <span className="font-semibold text-[#111827] flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#F43F5E]" />
                Immediate Hotlines:
              </span>
              <a href="tel:1122" className="hover:text-[#2563EB] font-medium">Rescue 1122</a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="tel:115" className="hover:text-[#2563EB] font-medium">Edhi 115</a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="tel:15" className="hover:text-[#2563EB] font-medium">Police 15</a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="tel:1020" className="hover:text-[#2563EB] font-medium">Chhipa 1020</a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href="tel:130" className="hover:text-[#2563EB] font-medium">Motorway 130</a>
            </div>

          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Panel Container */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Illustration Panel */}
              <div className="overflow-hidden rounded-[28px] border border-[#E6EAF0] bg-white shadow-[0_20px_50px_rgba(16,24,40,0.08)]">
                <img
                  src="/images/hero_relief_pakistan_visual.jpg"
                  alt="Relief AI Pakistan illustration of safety, verified rescue teams, and emergency assistance"
                  className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Card 1: Verified Help */}
              <div className="absolute -top-3 -left-3 sm:-left-6 bg-white/96 backdrop-blur-md px-4 py-3 rounded-[14px] border border-[#E5E7EB] shadow-[0_10px_30px_rgba(16,24,40,0.08)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-[650] text-[#111827]">Verified Help</div>
                  <div className="text-[11px] font-[500] text-[#667085]">NDMA & 1122 Synced</div>
                </div>
              </div>

              {/* Floating Card 2: Nearby Safe Places */}
              <div className="absolute -bottom-4 -left-2 sm:left-4 bg-white/96 backdrop-blur-md px-4 py-3 rounded-[14px] border border-[#E5E7EB] shadow-[0_10px_30px_rgba(16,24,40,0.08)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F9F9A] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-[650] text-[#111827]">Nearby Safe Places</div>
                  <div className="text-[11px] font-[500] text-[#667085]">Hospitals & Shelters Open</div>
                </div>
              </div>

              {/* Floating Card 3: AI Guidance */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/96 backdrop-blur-md px-4 py-3 rounded-[14px] border border-[#E5E7EB] shadow-[0_10px_30px_rgba(16,24,40,0.08)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-[650] text-[#111827]">AI Guidance</div>
                  <div className="text-[11px] font-[500] text-[#667085]">Urdu & Roman Urdu</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
