import React, { useState, useEffect } from 'react';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  Share2, 
  AlertOctagon, 
  Volume2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';
import { PAKISTAN_HOTLINES } from '../data/pakistanEmergencyData';

interface TrappedEmergencyModeProps {
  onClose: () => void;
  onNavigateToMap: () => void;
  onNavigateToFamily: () => void;
}

export const TrappedEmergencyMode: React.FC<TrappedEmergencyModeProps> = ({
  onClose,
  onNavigateToMap,
  onNavigateToFamily,
}) => {
  // Step 1: initial danger choice | Step 2: situation triage | Step 3: immediate action
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [initialChoice, setInitialChoice] = useState<'trapped' | 'move' | 'injured'>('trapped');
  const [locationType, setLocationType] = useState<string>('Inside a building');
  const [isInjured, setIsInjured] = useState<boolean>(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [isWhistleActive, setIsWhistleActive] = useState(false);

  // Attempt to acquire geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoordinates({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5))
          });
        },
        (err) => {
          setLocationError('GPS permission was denied or unavailable. You can manually share nearby landmarks.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Audio whistle synthesizer using Web Audio API
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;
    let interval: any = null;

    if (isWhistleActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
        gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.connect(audioCtx.destination);

        // Pulsing whistle sound: 3 short bursts (SOS pattern)
        let state = 0;
        interval = setInterval(() => {
          if (!audioCtx || !gain) return;
          if (state % 2 === 0) {
            osc = audioCtx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(2800, audioCtx.currentTime);
            osc.connect(gain);
            osc.start();
            setTimeout(() => {
              try { osc?.stop(); } catch(e) {}
            }, 300);
          }
          state++;
        }, 600);
      } catch (e) {
        console.error('Audio not supported', e);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      try { audioCtx?.close(); } catch(e) {}
    };
  }, [isWhistleActive]);

  const handleChoiceStep1 = (choice: 'trapped' | 'move' | 'injured') => {
    setInitialChoice(choice);
    if (choice === 'injured') {
      setIsInjured(true);
    }
    setStep(2);
  };

  const handleProceedToStep3 = () => {
    setStep(3);
  };

  const emergencySmsText = `🚨 EMERGENCY RELIEF PAKISTAN: I AM ${initialChoice.toUpperCase()} at ${locationType}. ${
    isInjured ? 'Injuries present.' : 'No major injuries.'
  } Coordinates: ${gpsCoordinates ? `https://maps.google.com/?q=${gpsCoordinates.lat},${gpsCoordinates.lng}` : 'Coordinates pending'}. Please dispatch Rescue 1122.`;

  const copyDistressMessage = () => {
    navigator.clipboard.writeText(emergencySmsText);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-4 border-b border-rose-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F43F5E] animate-ping" />
          <span className="text-xs sm:text-sm font-extrabold text-[#F43F5E] tracking-wider uppercase">
            Emergency Mode Active
          </span>
        </div>

        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-xs sm:text-sm font-semibold text-[#172033] hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4 text-slate-500" />
          <span>Exit Emergency Mode</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto w-full py-8 my-auto">
        
        {/* Step 1: Immediate Danger Choices */}
        {step === 1 && (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="inline-flex p-3 rounded-2xl bg-rose-100 text-[#F43F5E] mb-2">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033] tracking-tight font-heading leading-tight">
              Stay Calm.<br />
              <span className="text-[#F43F5E]">Let's Get You Safe.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B]">
              Take a slow, deep breath. Choose your current condition to get instant guidance:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <button
                onClick={() => handleChoiceStep1('trapped')}
                className="p-6 rounded-2xl bg-white border-2 border-rose-300 hover:border-[#F43F5E] hover:bg-rose-50/50 shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group"
              >
                <div className="text-2xl mb-3">📍</div>
                <div>
                  <div className="text-lg font-bold text-[#172033] group-hover:text-rose-600">
                    I'm Trapped
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">
                    Cannot exit or reach ground level safely
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleChoiceStep1('move')}
                className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group"
              >
                <div className="text-2xl mb-3">🏃</div>
                <div>
                  <div className="text-lg font-bold text-[#172033] group-hover:text-blue-600">
                    I Can Move
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">
                    Able to walk towards higher ground or exit
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleChoiceStep1('injured')}
                className="p-6 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group"
              >
                <div className="text-2xl mb-3">🩹</div>
                <div>
                  <div className="text-lg font-bold text-[#172033] group-hover:text-amber-600">
                    I'm Injured
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">
                    Bleeding, fractures, or pain present
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Situation Detail */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#172033] mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] font-heading">
                Where are you right now?
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                We only ask what directly changes your safety instructions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Inside a building',
                'On a roof',
                'In a vehicle',
                'In floodwater',
                'Outdoors clearing',
                'Other location'
              ].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationType(loc)}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer text-left ${
                    locationType === loc
                      ? 'border-[#F43F5E] bg-white text-[#F43F5E] shadow-sm ring-2 ring-rose-200'
                      : 'border-slate-200 bg-white/80 text-[#172033] hover:bg-white'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-rose-200">
              <label className="text-sm font-bold text-[#172033] block mb-2">
                Are you or someone with you injured?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsInjured(true)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    isInjured
                      ? 'border-[#F43F5E] bg-rose-50 text-[#F43F5E] ring-2 ring-rose-200'
                      : 'border-slate-200 bg-white text-[#172033]'
                  }`}
                >
                  Yes, Injured
                </button>
                <button
                  onClick={() => setIsInjured(false)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    !isInjured
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white text-[#172033]'
                  }`}
                >
                  No Injuries
                </button>
              </div>
            </div>

            <button
              onClick={handleProceedToStep3}
              className="w-full py-4 rounded-xl text-white font-bold text-base bg-[#F43F5E] hover:bg-[#E11D48] shadow-md transition-all cursor-pointer"
            >
              Show Immediate Safety Action →
            </button>
          </div>
        )}

        {/* Step 3: Immediate Life-Saving Action */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Badge */}
            <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-[#F43F5E] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#172033] font-heading">
                  DO THIS RIGHT NOW
                </h3>
                <p className="text-xs text-[#64748B]">
                  Tailored for: {locationType} · {isInjured ? 'Injured' : 'No Major Injury'}
                </p>
              </div>
            </div>

            {/* Concrete Action Checklist */}
            <div className="bg-white rounded-2xl border border-rose-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-[16px] sm:text-[17px] font-semibold text-[#172033] leading-[1.6]">
                  Move away from windows, cracking concrete walls, and dangling electrical wires.
                </p>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-[16px] sm:text-[17px] font-semibold text-[#172033] leading-[1.6]">
                  {locationType.includes('roof') || locationType.includes('building')
                    ? 'Stay in an open roof clearing or doorway. Wave a brightly colored cloth to alert airborne and ground rescue.'
                    : 'Do not step into moving water even if it appears shallow. Keep phone and flashlight elevated.'}
                </p>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-[16px] sm:text-[17px] font-semibold text-[#172033] leading-[1.6]">
                  Conserve phone battery: switch to Battery Saver mode, reduce screen brightness, and use SMS/WhatsApp text instead of voice calls.
                </p>
              </div>

              {isInjured && (
                <div className="flex items-start gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-sm leading-relaxed">
                  <span className="font-bold">Medical Rule:</span>
                  <span>Apply clean cloth direct compression on bleeding. Keep victim calm and warm.</span>
                </div>
              )}
            </div>

            {/* GPS & Location Sharing Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#172033] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#3B82F6]" />
                  <span>Your GPS Location</span>
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {gpsCoordinates
                    ? `Lat: ${gpsCoordinates.lat}, Long: ${gpsCoordinates.lng} (Verified)`
                    : locationError || 'Detecting accurate coordinates...'}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={copyDistressMessage}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLocation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLocation ? 'Copied to Clipboard!' : 'Copy Distress SMS'}</span>
                </button>
              </div>
            </div>

            {/* Audible SOS Whistle Generator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isWhistleActive ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#172033]">
                    Emergency Audio Whistle
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    Plays a high-pitch pulsing signal for rescue teams
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsWhistleActive(!isWhistleActive)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isWhistleActive
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#172033]'
                }`}
              >
                {isWhistleActive ? 'Stop Whistle' : 'Start Whistle'}
              </button>
            </div>

            {/* Large Primary Emergency Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:1122"
                className="p-4 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-center flex items-center justify-center gap-2.5 shadow-md shadow-rose-500/20 active:scale-[0.98] transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call Rescue 1122</span>
              </a>

              <a
                href="tel:115"
                className="p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-center flex items-center justify-center gap-2.5 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call Edhi 115</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToMap();
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#172033] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Find Safe Elevated Shelter</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToFamily();
                }}
                className="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#172033] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-purple-600" />
                <span>Notify Family Safety</span>
              </button>
            </div>

            {/* Are you safe now prompt */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-[#172033]">Are you safe now?</span>
                <p className="text-[11px] text-[#64748B]">You can return to the main dashboard when immediate danger clears.</p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes, I'm Safe Now</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Footer reassurance */}
      <div className="max-w-2xl mx-auto w-full text-center text-xs text-[#64748B] pt-4">
        Rescue dispatch systems prioritize live phone calls: 1122 (Punjab, KP, Sindh) · 15 (Police) · 115 (Edhi)
      </div>

    </div>
  );
};
