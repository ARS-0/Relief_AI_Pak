import React from 'react';
import { WifiOff, PhoneCall, BookOpen, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { PAKISTAN_HOTLINES, EMERGENCY_GUIDES } from '../data/pakistanEmergencyData';
import { EmergencyGuideStep } from '../types';

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGuide: (guide: EmergencyGuideStep) => void;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({
  isOpen,
  onClose,
  onSelectGuide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-amber-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Offline Mode Active
              </span>
              <h3 className="text-xl font-bold text-[#172033] font-heading">
                Cellular / Internet Connection Unavailable
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning notification */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            You are currently offline. Live radar and dynamic map distance calculations are paused. All emergency guides, telephone dispatch numbers, and family contact plans are <strong>fully cached and functional</strong>.
          </span>
        </div>

        {/* Direct Call Strip */}
        <div>
          <div className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2.5">
            Voice Phone Calls Work Without Internet
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAKISTAN_HOTLINES.slice(0, 4).map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 text-center block transition-all"
              >
                <div className="text-sm font-extrabold text-[#172033]">{h.number}</div>
                <div className="text-[10px] text-[#64748B] line-clamp-1">{h.name}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Cached Emergency Guides list */}
        <div>
          <div className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Cached Offline Safety Guides</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EMERGENCY_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => {
                  onClose();
                  onSelectGuide(guide);
                }}
                className="p-3 text-left bg-white hover:bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#172033]">{guide.title}</div>
                  <div className="text-[10px] text-[#64748B]">{guide.subtitle}</div>
                </div>
                <span className="text-xs text-blue-600 font-semibold">Open →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Local storage storage valid
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Continue in Offline Mode
          </button>
        </div>

      </div>
    </div>
  );
};
