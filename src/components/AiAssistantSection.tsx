import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  RotateCcw,
  Mic,
  Volume2
} from 'lucide-react';
import { ChatMessage, EmergencyCategory } from '../types';
import { getEmergencyAiResponse } from '../services/emergencyAI';

interface AiAssistantSectionProps {
  onOpenTrappedMode: () => void;
  onNavigateToMap: () => void;
  onSelectCategory?: (category: EmergencyCategory) => void;
}

export const AiAssistantSection: React.FC<AiAssistantSectionProps> = ({
  onOpenTrappedMode,
  onNavigateToMap,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Salam. I am Relief AI Pakistan. Tell me what is happening around you right now in English, Roman Urdu, or Urdu. If you are in immediate danger, I will provide instant life-saving actions.',
      timestamp: 'Just now',
      styleType: 'verified_info',
      suggestedActions: [
        { label: '🌊 Flood near me', actionType: 'guide' },
        { label: "🚨 I'm trapped", actionType: 'emergency_mode' },
        { label: '🌎 Earthquake just happened', actionType: 'guide' },
        { label: '📍 Find a shelter', actionType: 'shelters' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Pani ghar mein aa raha hai',
    'Main phans gaya hun madad chahiye',
    'Earthquake shaking right now',
    'Fire on second floor',
    'Someone is unconscious and not breathing',
    'Find nearest verified relief camp'
  ];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    try {
      const aiResponse = await getEmergencyAiResponse(textToSend, messages);
      
      const newAssistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiResponse.text || 'Keep your phone charged and stay on high ground.',
        timestamp: 'Just now',
        styleType: aiResponse.styleType || 'verified_info',
        suggestedActions: aiResponse.suggestedActions,
        emergencyCategory: aiResponse.emergencyCategory
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: 'Immediate assistance: Call Rescue 1122 immediately on your phone.',
          timestamp: 'Just now',
          styleType: 'danger',
          suggestedActions: [
            { label: '📞 Call Rescue 1122', actionType: 'call', payload: '1122' }
          ]
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActionClick = (action: { actionType: string; payload?: string }) => {
    if (action.actionType === 'emergency_mode') {
      onOpenTrappedMode();
    } else if (action.actionType === 'shelters') {
      onNavigateToMap();
    } else if (action.actionType === 'call' && action.payload) {
      window.location.href = `tel:${action.payload}`;
    }
  };

  const handleSpeechToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your emergency.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-PK';
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        setIsListening(false);
        recognition.stop();
      }
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with soft gradient backdrop */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F8FAFF] via-[#EEF5FF] to-[#F3F0FF] border border-[#E5EAF0] shadow-[0_12px_40px_rgba(40,80,120,0.06)] p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left AI Column: Explanatory & Reassurance */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-blue-200 text-blue-700 text-xs font-semibold shadow-sm mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Real-time Triage Assistant</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172033] font-heading tracking-tight leading-tight mb-4">
                  Meet Your Emergency AI
                </h2>

                <p className="text-base sm:text-lg text-[#64748B] leading-[1.65] mb-6">
                  Tell us what is happening. We will help you figure out what to do next without long wait times or confusing questions.
                </p>

                {/* Anti-ChatGPT specialization cards */}
                <div className="space-y-3 mb-6 text-sm text-[#172033]">
                  <div className="p-3.5 bg-white rounded-xl border border-[#E5EAF0] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      🇵🇰
                    </span>
                    <span className="leading-snug">Recognizes Urdu, Roman Urdu & English terms naturally.</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E5EAF0] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0">
                      ⚡
                    </span>
                    <span className="leading-snug">Prioritizes immediate DO / AVOID action steps first.</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E5EAF0] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </span>
                    <span className="leading-snug">Direct one-click connection to Rescue 1122 and Edhi.</span>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Badges */}
              <div>
                <div className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
                  Sample Emergency Phrases
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.slice(0, 4).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#E5EAF0] text-xs font-medium text-slate-700 hover:text-blue-600 shadow-sm transition-all text-left cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Interactive Chat Interface */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5EAF0] shadow-sm flex flex-col h-[580px] overflow-hidden">
              
              {/* Chat Window Header */}
              <div className="px-5 py-3.5 border-b border-[#E5EAF0] bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#172033]">
                      Relief AI Pakistan
                    </div>
                    <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Active 24/7 · Emergency Mode Connected
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMessages([messages[0]])}
                  title="Reset conversation"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Scroll Area */}
              <div 
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8FBFF]/50"
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';

                  // Visual style based on prompt rules:
                  // User: soft blue gradient
                  // Assistant: White card
                  // Critical action: Light teal
                  // Danger: Soft coral
                  // Verified: Soft green
                  let bubbleClasses = 'bg-white border border-[#E5EAF0] text-[#172033] shadow-sm';
                  if (isUser) {
                    bubbleClasses = 'bg-gradient-to-r from-blue-600 to-blue-500 text-white ml-auto max-w-[85%]';
                  } else if (msg.styleType === 'danger') {
                    bubbleClasses = 'bg-rose-50/90 border border-rose-200 text-rose-950';
                  } else if (msg.styleType === 'critical_action') {
                    bubbleClasses = 'bg-teal-50/90 border border-teal-200 text-teal-950';
                  } else if (msg.styleType === 'verified_info') {
                    bubbleClasses = 'bg-white border border-[#E5EAF0] text-[#172033]';
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
                    >
                      <div className={`p-4 sm:p-5 rounded-2xl ${bubbleClasses} text-[15px] sm:text-base leading-[1.65] whitespace-pre-line`}>
                        {msg.text}

                        {/* Interactive Action Buttons inside assistant reply */}
                        {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                          <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex flex-wrap gap-2">
                            {msg.suggestedActions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(action)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  action.actionType === 'emergency_mode'
                                    ? 'bg-[#F43F5E] hover:bg-[#E11D48] text-white shadow-sm'
                                    : action.actionType === 'call'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-white hover:bg-slate-100 text-[#172033] border border-slate-200'
                                }`}
                              >
                                {action.actionType === 'call' && <PhoneCall className="w-3.5 h-3.5" />}
                                {action.actionType === 'shelters' && <MapPin className="w-3.5 h-3.5 text-teal-600" />}
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#64748B] mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Animated typing indicator */}
                {isProcessing && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E5EAF0] max-w-fit shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-[#64748B] ml-1">Analyzing emergency triage...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#E5EAF0]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={handleSpeechToggle}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isListening
                        ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                        : 'bg-slate-50 hover:bg-slate-100 text-[#64748B] border-slate-200'
                    }`}
                    title="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tell me what happened (e.g. Flood near me, I'm trapped)..."
                    className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#172033] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isProcessing}
                    className="p-2.5 bg-brand-gradient text-white rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-2 px-1">
                  <span>Urdu / Roman Urdu / English understood</span>
                  <span className="text-slate-400">Emergency AI doesn't replace Rescue 1122</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
