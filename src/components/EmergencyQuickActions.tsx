import React from 'react';
import { 
  Waves, 
  Activity, 
  Flame, 
  HeartPulse, 
  Mountain, 
  CloudLightning, 
  Car, 
  ShieldAlert, 
  ArrowRight 
} from 'lucide-react';
import { EmergencyCategory, EmergencyGuideStep } from '../types';
import { EMERGENCY_GUIDES } from '../data/pakistanEmergencyData';

interface EmergencyQuickActionsProps {
  onSelectCategory: (guide: EmergencyGuideStep) => void;
  onOpenTrappedMode: () => void;
}

export const EmergencyQuickActions: React.FC<EmergencyQuickActionsProps> = ({
  onSelectCategory,
  onOpenTrappedMode,
}) => {
  // Category styling specifications from prompt
  const categoryConfig: Record<
    EmergencyCategory, 
    { icon: React.ReactNode; iconBg: string; accentColor: string; description: string }
  > = {
    flood: {
      icon: <Waves className="w-6 h-6 text-cyan-600" />,
      iconBg: 'bg-gradient-to-br from-cyan-100 to-blue-100',
      accentColor: 'hover:border-cyan-400',
      description: 'Get evacuation and flood safety guidance.'
    },
    earthquake: {
      icon: <Activity className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      accentColor: 'hover:border-purple-400',
      description: 'Drop, Cover, and Hold On protocols.'
    },
    fire: {
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100',
      accentColor: 'hover:border-orange-400',
      description: 'Immediate escape and smoke avoidance.'
    },
    medical: {
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      iconBg: 'bg-gradient-to-br from-pink-100 to-rose-100',
      accentColor: 'hover:border-rose-400',
      description: 'First aid, CPR, heatstroke, and trauma.'
    },
    landslide: {
      icon: <Mountain className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-gradient-to-br from-yellow-100 to-amber-100',
      accentColor: 'hover:border-amber-400',
      description: 'Rockfall and mountain highway safety.'
    },
    weather: {
      icon: <CloudLightning className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-gradient-to-br from-sky-100 to-blue-100',
      accentColor: 'hover:border-blue-400',
      description: 'Monsoon storms, lightning, and heat.'
    },
    accident: {
      icon: <Car className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-gradient-to-br from-emerald-100 to-teal-100',
      accentColor: 'hover:border-emerald-400',
      description: 'Traffic crash response and cordoning.'
    },
    other: {
      icon: <ShieldAlert className="w-6 h-6 text-slate-700" />,
      iconBg: 'bg-gradient-to-br from-slate-100 to-slate-200',
      accentColor: 'hover:border-slate-400',
      description: 'Trapped, building collapse, and alerts.'
    }
  };

  return (
    <section id="guide" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider mb-2 block">
            Emergency Triage Guide
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172033] tracking-tight font-heading leading-tight">
            What do you need help with?
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg mt-2.5 max-w-xl leading-relaxed">
            Choose an emergency to get immediate safety guidance, verified action steps, and direct dispatch numbers.
          </p>
        </div>

        {/* Rapid SOS Entry point */}
        <button
          onClick={onOpenTrappedMode}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>In immediate danger? Open Trapped Mode</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4-Column Desktop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {EMERGENCY_GUIDES.map((guide) => {
          const config = categoryConfig[guide.category];

          return (
            <div
              key={guide.id}
              onClick={() => onSelectCategory(guide)}
              className="card-relief p-6 flex flex-col justify-between cursor-pointer group text-left"
            >
              <div>
                {/* Icon Container with subtle gradient */}
                <div className={`w-12 h-12 rounded-2xl ${config.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200`}>
                  {config.icon}
                </div>

                {/* Heading */}
                <h3 className="text-xl font-bold text-[#172033] group-hover:text-blue-600 transition-colors font-heading mb-2">
                  {guide.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] sm:text-base text-[#64748B] leading-relaxed mb-4">
                  {config.description}
                </p>
              </div>

              {/* Card Footer with single action affordance */}
              <div className="pt-3 border-t border-[#E5EAF0] flex items-center justify-between text-xs font-semibold text-[#3B82F6]">
                <span>View Action Steps</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
