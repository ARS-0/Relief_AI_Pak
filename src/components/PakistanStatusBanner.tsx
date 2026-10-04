import React, { useState } from 'react';
import { Radio, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { LIVE_ALERTS } from '../data/pakistanEmergencyData';
import { EmergencyAlert } from '../types';

interface PakistanStatusBannerProps {
  onSelectAlert?: (alert: EmergencyAlert) => void;
}

export const PakistanStatusBanner: React.FC<PakistanStatusBannerProps> = ({ onSelectAlert }) => {
  const [expanded, setExpanded] = useState(false);
  const activeAlertsCount = LIVE_ALERTS.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-[0_8px_30px_rgba(40,80,120,0.06)] p-5 sm:p-6 transition-all">
        
        {/* Main Banner Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-[#172033] font-heading tracking-tight">
                  🇵🇰 Pakistan Emergency Status
                </span>
                <span className="text-xs text-[#64748B] hidden md:inline">· Official Feed</span>
              </div>
              <p className="text-sm sm:text-base text-[#64748B] mt-0.5 leading-relaxed">
                Stay informed about verified emergency advisories and disaster updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Status indicator: 3 active alerts in gentle amber/orange, not harsh red */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
              <span>🟠 {activeAlertsCount} Active Advisories</span>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1.5 text-xs font-semibold text-[#3B82F6] hover:bg-blue-50 rounded-xl border border-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{expanded ? 'Hide Details' : 'View Advisories'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Alert Cards */}
        {expanded && (
          <div className="mt-6 pt-5 border-t border-[#E5EAF0] grid grid-cols-1 md:grid-cols-3 gap-4">
            {LIVE_ALERTS.map((alert) => {
              // Accent color based on category
              const accentColor = 
                alert.category === 'flood' ? 'border-l-4 border-l-cyan-500 bg-cyan-50/20' :
                alert.category === 'earthquake' ? 'border-l-4 border-l-purple-500 bg-purple-50/20' :
                'border-l-4 border-l-blue-500 bg-blue-50/20';

              return (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-xl border border-[#E5EAF0] ${accentColor} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#64748B] mb-1.5">
                      <span className="font-bold text-[#172033]">{alert.source} Alert</span>
                      <span>{alert.timeAgo}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#172033] leading-snug mb-2 font-heading">
                      {alert.title}
                    </h4>

                    <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                      {alert.description}
                    </p>

                    <div className="text-[11px] font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-100 space-y-1">
                      <div className="font-semibold text-[#172033]">Instructions:</div>
                      {alert.instructions.slice(0, 2).map((ins, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[#64748B]">
                          <span className="text-blue-500">•</span>
                          <span>{ins}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 text-[11px] text-[#64748B] flex items-center justify-between border-t border-slate-100">
                    <span className="font-medium text-slate-700">Region: {alert.region}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
