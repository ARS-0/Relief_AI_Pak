import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Navigation, 
  ShieldCheck, 
  Hospital, 
  Flame, 
  Home, 
  Shield, 
  Droplet,
  Compass,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { VERIFIED_RESOURCES, PAKISTAN_CITIES } from '../data/pakistanEmergencyData';
import { ResourceType, VerifiedResource } from '../types';

export const NearbyHelpMap: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [activeResource, setActiveResource] = useState<VerifiedResource | null>(VERIFIED_RESOURCES[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Resources', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'shelter', label: 'Shelters', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'hospital', label: 'Hospitals', icon: <Hospital className="w-3.5 h-3.5" /> },
    { id: 'rescue', label: 'Rescue 1122', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'relief_center', label: 'Relief Camps', icon: <Droplet className="w-3.5 h-3.5" /> },
    { id: 'police', label: 'Police', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const handleRequestLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocating(false);
      },
      () => {
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const filteredResources = useMemo(() => {
    return VERIFIED_RESOURCES.filter((res) => {
      const matchType = selectedType === 'all' || res.type === selectedType;
      const matchCity = selectedCity === 'All Cities' || res.city.toLowerCase() === selectedCity.toLowerCase();
      return matchType && matchCity;
    });
  }, [selectedType, selectedCity]);

  const getPinColor = (type: ResourceType) => {
    switch (type) {
      case 'hospital': return 'bg-rose-500 text-white';
      case 'rescue': return 'bg-orange-500 text-white';
      case 'shelter': return 'bg-teal-500 text-white';
      case 'police': return 'bg-blue-600 text-white';
      case 'relief_center': return 'bg-cyan-500 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  const getPinIcon = (type: ResourceType) => {
    switch (type) {
      case 'hospital': return <Hospital className="w-4 h-4" />;
      case 'rescue': return <Flame className="w-4 h-4" />;
      case 'shelter': return <Home className="w-4 h-4" />;
      case 'police': return <Shield className="w-4 h-4" />;
      case 'relief_center': return <Droplet className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <section id="find-help" className="py-16 sm:py-20 bg-[#F3F8F7]/60 border-y border-[#E5EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 block">
              Verified Relief Network
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172033] font-heading tracking-tight leading-tight">
              Nearby Help & Safe Shelters
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg mt-2.5 max-w-xl leading-relaxed">
              Locate open emergency trauma centers, high-ground community shelters, and Rescue 1122 stations across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRequestLocation}
              disabled={locating}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-[#E5EAF0] text-xs font-semibold text-[#172033] shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 text-teal-600 ${locating ? 'animate-spin' : ''}`} />
              <span>{userLocation ? 'GPS Location Set' : locating ? 'Locating...' : 'Use My GPS Location'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedType === tab.id
                    ? 'bg-white text-teal-700 shadow-sm border border-teal-200'
                    : 'text-[#64748B] hover:text-[#172033] hover:bg-white/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E5EAF0] text-xs font-semibold text-[#172033] focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {PAKISTAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive Layout: Left Light Vector Map / Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Light-Themed Interactive Map Canvas */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5EAF0] p-4 sm:p-6 shadow-[0_8px_30px_rgba(40,80,120,0.04)] relative overflow-hidden h-[460px] flex flex-col justify-between">
            
            {/* Map Top Bar */}
            <div className="flex items-center justify-between text-xs text-[#64748B] z-10 pb-3 border-b border-slate-100">
              <span className="font-semibold text-[#172033] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Live Safe Ground Radar
              </span>
              <span>Showing {filteredResources.length} verified locations in {selectedCity}</span>
            </div>

            {/* Stylized Pakistan Light Vector Map Area */}
            <div className="relative flex-1 my-3 bg-[#EEF5F8] rounded-2xl border border-slate-200/80 overflow-hidden flex items-center justify-center p-4">
              
              {/* Subtle map grid lines */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} 
              />

              {/* Stylized River Indus Path */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
                <path
                  d="M 200,20 Q 300,140 380,260 T 520,440"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="8"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Interactive Location Pins scattered geographically across the canvas */}
              {filteredResources.slice(0, 8).map((res, index) => {
                // Approximate coordinate offset for the visual canvas
                const leftPos = `${18 + ((index * 23) % 65)}%`;
                const topPos = `${15 + ((index * 19) % 65)}%`;
                const isSelected = activeResource?.id === res.id;

                return (
                  <button
                    key={res.id}
                    onClick={() => setActiveResource(res)}
                    style={{ left: leftPos, top: topPos }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl shadow-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-teal-400/50 scale-125 z-30 ' + getPinColor(res.type)
                        : 'hover:scale-110 z-20 ' + getPinColor(res.type)
                    }`}
                    title={`${res.name} (${res.city})`}
                  >
                    {getPinIcon(res.type)}
                  </button>
                );
              })}

              {/* Map Info Box overlay */}
              {activeResource && (
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E5EAF0] shadow-md z-30 animate-fade-in">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        {activeResource.type.replace('_', ' ').toUpperCase()} · {activeResource.city}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#172033] mt-0.5 line-clamp-1">
                        {activeResource.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                        {activeResource.address}
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-blue-600 shrink-0">
                      ~{activeResource.distanceKm} km
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`tel:${activeResource.phone}`}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{activeResource.phone}</span>
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${activeResource.lat},${activeResource.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#64748B] pt-2 border-t border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Shelter
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Hospital
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Rescue 1122
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Relief Camp
                </span>
              </div>
              <span className="text-slate-400">Light GIS Pakistan Baseline</span>
            </div>

          </div>

          {/* Right Column: Resource Cards List */}
          <div className="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredResources.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#E5EAF0]">
                <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <div className="text-sm font-bold text-[#172033]">No relief points match your filter</div>
                <p className="text-xs text-[#64748B] mt-1">Try selecting "All Cities" or another resource category.</p>
              </div>
            ) : (
              filteredResources.map((res) => {
                const isSelected = activeResource?.id === res.id;

                return (
                  <div
                    key={res.id}
                    onClick={() => setActiveResource(res)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-teal-400 shadow-md ring-1 ring-teal-200'
                        : 'bg-white border-[#E5EAF0] hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${getPinColor(res.type)}`}>
                          {getPinIcon(res.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-[#172033] leading-snug">
                              {res.name}
                            </h4>
                          </div>
                          <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                            {res.address}, {res.city}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-[#3B82F6]">
                          ~{res.distanceKm} km
                        </span>
                        <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-0.5 mt-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </div>
                      </div>
                    </div>

                    {res.capacityNotes && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg mt-2.5 border border-slate-100">
                        {res.capacityNotes}
                      </p>
                    )}

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <a
                        href={`tel:${res.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call {res.phone}</span>
                      </a>

                      <a
                        href={`https://maps.google.com/?q=${res.lat},${res.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <Navigation className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
