import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Briefcase, 
  Sparkles, 
  Droplets, 
  Pill, 
  FileText, 
  Flashlight, 
  BatteryCharging, 
  Volume2, 
  Utensils, 
  Coins, 
  Shirt, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { EMERGENCY_KIT_ITEMS } from '../data/pakistanEmergencyData';
import { EmergencyKitItem } from '../types';

export const EmergencyKitSection: React.FC = () => {
  const [items, setItems] = useState<EmergencyKitItem[]>(() => {
    try {
      const saved = localStorage.getItem('relief_pk_kit');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return EMERGENCY_KIT_ITEMS;
  });

  const [activeTab, setActiveTab] = useState<'must_have' | 'if_available'>('must_have');
  const [rapidMode, setRapidMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('relief_pk_kit', JSON.stringify(items));
    } catch(e) {}
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Droplets': return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'Pill': return <Pill className="w-4 h-4 text-rose-500" />;
      case 'FileText': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'Flashlight': return <Flashlight className="w-4 h-4 text-amber-500" />;
      case 'BatteryCharging': return <BatteryCharging className="w-4 h-4 text-emerald-500" />;
      case 'Volume2': return <Volume2 className="w-4 h-4 text-purple-500" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'Coins': return <Coins className="w-4 h-4 text-yellow-600" />;
      case 'Shirt': return <Shirt className="w-4 h-4 text-teal-500" />;
      default: return <ShieldCheck className="w-4 h-4 text-slate-500" />;
    }
  };

  const checkedCount = items.filter(i => i.checked).length;
  const totalCount = items.length;
  const mustHaveCount = items.filter(i => i.category === 'must_have').length;
  const checkedMustHave = items.filter(i => i.category === 'must_have' && i.checked).length;

  return (
    <section id="emergency-kit" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft yellow/cream themed container */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF5] via-[#FFFBEB] to-[#FEF3C7]/40 border border-[#FDE68A] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(240,180,40,0.04)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Illustration & Evacuation Rule */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 block">
                  Evacuation Readiness
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172033] font-heading tracking-tight leading-tight">
                  Build Your Emergency Kit
                </h2>
                <p className="text-base sm:text-lg text-[#64748B] mt-2.5 leading-relaxed">
                  A few simple preparations can make a difficult situation easier. Keep a dedicated backpack near your exit door.
                </p>
              </div>

              {/* 3D Kit Illustration */}
              <div className="rounded-2xl overflow-hidden border border-[#FDE68A] bg-white shadow-sm">
                <img
                  src="/src/assets/images/emergency_kit_essentials_1791109054412.jpg"
                  alt="Emergency kit backpack essentials illustration"
                  className="w-full h-auto aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Golden Rule Callout */}
              <div className="p-4 bg-white rounded-2xl border border-amber-200/80 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172033]">
                    Emergency Evacuation Rule: Take Only What You Can Safely Carry
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Never delay evacuation for large televisions or heavy bags. People first, documents and medicine second.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Checklist */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5EAF0] p-5 sm:p-7 shadow-sm space-y-5">
              
              {/* Header with Progress Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-[#172033] font-heading">
                    Go-Bag Checklist
                  </h3>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    {checkedCount} of {totalCount} items prepared ({Math.round((checkedCount/totalCount)*100)}%)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('must_have')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'must_have'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Must Have ({checkedMustHave}/{mustHaveCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('if_available')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'if_available'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    If Available
                  </button>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(checkedCount / totalCount) * 100}%` }}
                />
              </div>

              {/* Checklist Items list */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {items
                  .filter(item => item.category === activeTab)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.checked
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-white border-[#E5EAF0] hover:border-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[15px] sm:text-base font-semibold ${item.checked ? 'text-emerald-950 line-through opacity-80' : 'text-[#172033]'}`}>
                            {item.name}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="shrink-0 p-1.5 bg-slate-50 rounded-lg">
                        {getIcon(item.icon)}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Reset or Rapid Print summary */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                <span>Saved locally on your device for offline reference</span>
                <button
                  onClick={() => setItems(items.map(i => ({ ...i, checked: false })))}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Reset Checklist
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
