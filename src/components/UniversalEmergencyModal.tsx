import React from 'react';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { EmergencyGuideStep, Language } from '../types';

interface UniversalEmergencyModalProps {
  guide: EmergencyGuideStep | null;
  onClose: () => void;
  onOpenTrappedMode: () => void;
  onNavigateToMap: () => void;
  currentLang: Language;
}

export const UniversalEmergencyModal: React.FC<UniversalEmergencyModalProps> = ({
  guide,
  onClose,
  onOpenTrappedMode,
  onNavigateToMap,
  currentLang,
}) => {
  if (!guide) return null;

  const isUrdu = currentLang === 'ur';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl border border-[#E5EAF0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50/80 via-white to-teal-50/80 border-b border-[#E5EAF0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚨</span>
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#3B82F6]">
                Verified Emergency Protocol
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#172033] font-heading">
                {isUrdu ? guide.titleUrdu : guide.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body following the Universal Emergency Screen contract */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. What to do now (Immediate Action Hero) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-xs">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
              ⚡ What To Do Right Now
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-950 leading-snug">
              {isUrdu ? guide.immediateActionUrdu : guide.immediateAction}
            </p>
          </div>

          {/* 2. DO (Concrete Actions) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>DO (Crucial Safety Actions)</span>
            </h4>
            <div className="space-y-3">
              {(isUrdu ? guide.dosUrdu : guide.dos).map((action, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-[15px] sm:text-base text-[#172033] flex items-start gap-3.5 leading-[1.6]"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-medium">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. AVOID (Warnings) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5 mb-3">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>AVOID (Life-Threatening Hazards)</span>
            </h4>
            <div className="space-y-3">
              {(isUrdu ? guide.dontsUrdu : guide.donts).map((warning, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 text-[15px] sm:text-base text-rose-950 flex items-start gap-3.5 leading-[1.6]"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span className="font-medium">{warning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. GET HELP (Call and Resources) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              Get Professional Emergency Help
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${guide.priorityPhone}`}
                className="p-3.5 rounded-xl bg-brand-gradient text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {guide.priorityPhoneLabel} ({guide.priorityPhone})</span>
              </a>

              {guide.secondaryPhone && (
                <a
                  href={`tel:${guide.secondaryPhone}`}
                  className="p-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[#172033] font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>Call {guide.secondaryPhoneLabel} ({guide.secondaryPhone})</span>
                </a>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMap();
                }}
                className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate Nearby Safe Shelters & Hospitals</span>
              </button>

              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>

        </div>

        {/* Universal Footer: "Are you safe now?" */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#E5EAF0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#64748B] text-center sm:text-left">
            <span className="font-bold text-[#172033]">Are you safe right now?</span>
            <span className="block sm:inline sm:ml-1">If trapped or injured, switch immediately.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenTrappedMode();
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              🚨 No, I Still Need Help
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              ✓ Yes, I'm Safe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
