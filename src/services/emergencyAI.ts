import { GoogleGenAI } from '@google/genai';
import { ChatMessage, EmergencyCategory } from '../types';

export interface TriageResult {
  category: EmergencyCategory;
  urgency: 'critical' | 'high' | 'medium' | 'info';
  immediateAdvice: string;
  dos: string[];
  donts: string[];
  suggestEmergencyMode: boolean;
  priorityHelpline: string;
  helplineName: string;
}

// Ultra-fast zero-latency local triage dictionary for English, Urdu, and Roman Urdu
export function analyzeEmergencyText(text: string): TriageResult {
  const lower = text.toLowerCase();

  // Critical trapped or drowning cues
  const isTrapped = 
    lower.includes('trapped') || 
    lower.includes('phans gaya') || 
    lower.includes('phansa') || 
    lower.includes('stuck') || 
    lower.includes('chhat pe') || 
    lower.includes('roof') || 
    lower.includes('drowning') || 
    lower.includes('doob raha') ||
    lower.includes('madad karo') ||
    lower.includes('help me') ||
    lower.includes('بچاؤ') ||
    lower.includes('پھنس گیا');

  // Flood cues
  if (
    lower.includes('flood') || 
    lower.includes('pani') || 
    lower.includes('water') || 
    lower.includes('sailab') || 
    lower.includes('selab') || 
    lower.includes('سیلاب') || 
    lower.includes('بارش') ||
    lower.includes('nullah') || 
    lower.includes('inundat')
  ) {
    return {
      category: 'flood',
      urgency: isTrapped ? 'critical' : 'high',
      immediateAdvice: isTrapped 
        ? '⚠️ DO NOT panic. Move to the highest accessible reinforced point immediately. Do not step into moving water. Signal rescuers.' 
        : '🌊 Water Hazard Detected. Disconnect main power switches immediately. Move essential items and medicines to upper floor.',
      dos: [
        'Turn off main electricity breaker and gas valves before water touches sockets.',
        'Move yourself and family to upper floor or sturdy roof if ground floor takes water.',
        'Keep emergency whistle, clean water, and phone elevated with you in a waterproof pouch.'
      ],
      donts: [
        'NEVER attempt to walk or drive through flowing water. 6 inches can sweep an adult.',
        'Do not touch electrical poles, meter boxes, or sub-merged cables.',
        'Do not stay in basements or single-story mud/adobe rooms in active floodway.'
      ],
      suggestEmergencyMode: isTrapped,
      priorityHelpline: '1122',
      helplineName: 'Rescue 1122 Disaster Squad'
    };
  }

  // Earthquake cues
  if (
    lower.includes('earthquake') || 
    lower.includes('zalzala') || 
    lower.includes('quake') || 
    lower.includes('shaking') || 
    lower.includes('زلزلہ') || 
    lower.includes('jhatke') ||
    lower.includes('hil rahi')
  ) {
    return {
      category: 'earthquake',
      urgency: isTrapped ? 'critical' : 'high',
      immediateAdvice: '🌎 DROP, COVER, AND HOLD ON. Protect your head under sturdy furniture until shaking stops.',
      dos: [
        'DROP down onto your hands and knees.',
        'COVER your head and neck with your arms or under a sturdy table.',
        'HOLD ON until ground movement completely ceases.'
      ],
      donts: [
        'Do NOT use elevators or rush panic-stricken onto stairwells during shaking.',
        'Do NOT run outside if already in a multi-story building where bricks can fall.',
        'Do NOT ignite lighters or stoves; gas lines might be cracked.'
      ],
      suggestEmergencyMode: isTrapped,
      priorityHelpline: '1122',
      helplineName: 'Rescue 1122'
    };
  }

  // Fire cues
  if (
    lower.includes('fire') || 
    lower.includes('aag') || 
    lower.includes('smoke') || 
    lower.includes('dhuan') || 
    lower.includes('آگ') || 
    lower.includes('gas leak') || 
    lower.includes('cylinder') ||
    lower.includes('jal raha')
  ) {
    return {
      category: 'fire',
      urgency: 'critical',
      immediateAdvice: '🔥 GET OUT IMMEDIATELY. Stay low to avoid inhaling toxic smoke. Cover mouth with damp cloth.',
      dos: [
        'Crawl low under smoke towards the nearest unobstructed exit.',
        'Touch doors with the back of your hand before opening—if hot, find another exit.',
        'Close doors behind you to slow flame spread, assemble outside safely, and call 16 or 1122.'
      ],
      donts: [
        'Do NOT use elevators under any circumstances.',
        'Do NOT re-enter a burning home to save documents or jewelry.',
        'Do NOT pour water on electrical appliances or cooking oil fires.'
      ],
      suggestEmergencyMode: true,
      priorityHelpline: '16',
      helplineName: 'Fire Brigade (16) & Rescue 1122'
    };
  }

  // Medical cues
  if (
    lower.includes('medical') || 
    lower.includes('heart') || 
    lower.includes('breathing') || 
    lower.includes('bleed') || 
    lower.includes('khun') || 
    lower.includes('behosh') || 
    lower.includes('unconscious') || 
    lower.includes('heatstroke') || 
    lower.includes('chot') || 
    lower.includes('ambulance') ||
    lower.includes('بیمار') ||
    lower.includes('زخمی')
  ) {
    return {
      category: 'medical',
      urgency: 'high',
      immediateAdvice: '🏥 MEDICAL PRIORITY. Check responsiveness and breathing. Call 1122 or 115 immediately.',
      dos: [
        'Apply firm direct pressure with clean cloth over bleeding wounds.',
        'For heatstroke: move to cold shade, loosen clothes, apply cool water to forehead and neck.',
        'Keep patient calm, lying flat, and ensure airway is clear of vomit or obstruction.'
      ],
      donts: [
        'Do NOT administer oral food or water to an unconscious or fitting person.',
        'Do NOT move a patient with suspected spinal or neck injury unless in immediate fire danger.',
        'Do NOT delay calling professional paramedics.'
      ],
      suggestEmergencyMode: false,
      priorityHelpline: '1122',
      helplineName: 'Rescue 1122 Ambulance'
    };
  }

  // Landslide cues
  if (
    lower.includes('landslide') || 
    lower.includes('tooda') || 
    lower.includes('pathar') || 
    lower.includes('rockfall') || 
    lower.includes('mountain') ||
    lower.includes('kkh') ||
    lower.includes('لینڈ سلائیڈنگ')
  ) {
    return {
      category: 'landslide',
      urgency: 'high',
      immediateAdvice: '⛰️ LANDSLIDE HAZARD. Move laterally away from mountain slopes and ravines immediately.',
      dos: [
        'Listen for rumbling sounds or snapping trees which signal sliding earth.',
        'Park vehicles away from overhanging rock faces.',
        'Seek high, stable bedrock away from the mudflow channel.'
      ],
      donts: [
        'Do NOT approach recent landslide debris; secondary collapses are common.',
        'Do NOT stop your car underneath cracked cliffs to record videos.',
        'Do NOT cross bridges that have been struck by mud boulders.'
      ],
      suggestEmergencyMode: isTrapped,
      priorityHelpline: '130',
      helplineName: 'Motorway Police (130)'
    };
  }

  // Generic or trapped default
  return {
    category: 'other',
    urgency: isTrapped ? 'critical' : 'medium',
    immediateAdvice: isTrapped 
      ? '🚨 STAY CALM. You are not alone. Focus on signaling your location and conserving energy.' 
      : '🇵🇰 Relief AI Pakistan is ready to assist. Please state your exact situation or select an emergency category below.',
    dos: [
      'Share your verified GPS coordinates or prominent landmark with family and Rescue 1122.',
      'Keep battery saver mode active on your phone.',
      'Stay near a sturdy wall or elevated safety zone.'
    ],
    donts: [
      'Do not panic or deplete your phone battery on long video calls.',
      'Do not spread unverified hearsay.',
      'Do not attempt hazardous crossings in darkness.'
    ],
    suggestEmergencyMode: isTrapped,
    priorityHelpline: '1122',
    helplineName: 'Rescue 1122 Emergency'
  };
}

// Generate smart response using Gemini API or instant fallback
export async function getEmergencyAiResponse(
  userQuery: string,
  history: ChatMessage[]
): Promise<Partial<ChatMessage>> {
  const triage = analyzeEmergencyText(userQuery);

  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  // If apiKey is available, attempt Gemini enhancement for human, caring, and context-specific advice
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Relief AI Pakistan, an authoritative, reassuring, and life-saving emergency assistant for citizens across Pakistan.
User emergency query: "${userQuery}"

Detected Triage Category: ${triage.category}, Urgency: ${triage.urgency}

RULES:
1. Speak in a calm, confident, reassuring tone. (If user asks in Roman Urdu or Urdu, respond with clear Roman Urdu / Urdu; otherwise English).
2. NEVER stall or give long academic lectures. Provide immediate action FIRST.
3. List 3 concrete "DO THIS NOW" steps and 2 crucial "AVOID" warnings.
4. Emphasize verified Pakistan emergency numbers: Rescue 1122, Edhi 115, Chhipa 1020, Motorway Police 130, NDMA 051-111-157-157.
5. Keep response under 120 words. No robotic preamble like "I am an AI". Start directly with the safety instruction.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      if (responseText.trim().length > 10) {
        return {
          text: responseText.trim(),
          styleType: triage.urgency === 'critical' ? 'danger' : triage.urgency === 'high' ? 'critical_action' : 'verified_info',
          emergencyCategory: triage.category,
          suggestedActions: [
            ...(triage.suggestEmergencyMode ? [{ label: "🚨 Open I'm Trapped Mode", actionType: 'emergency_mode' as const }] : []),
            { label: `📞 Call ${triage.helplineName} (${triage.priorityHelpline})`, actionType: 'call' as const, payload: triage.priorityHelpline },
            { label: '📍 Find Nearby Shelters', actionType: 'shelters' as const }
          ]
        };
      }
    } catch (e) {
      console.warn('Gemini API call skipped or errored, using zero-latency verified triage engine:', e);
    }
  }

  // Instant verified fallback
  const dosText = triage.dos.map(d => `• ${d}`).join('\n');
  const dontsText = triage.donts.map(d => `• ${d}`).join('\n');

  const text = `${triage.immediateAdvice}\n\nDO THIS NOW:\n${dosText}\n\nAVOID:\n${dontsText}\n\nVerified Assistance: Call ${triage.helplineName} on ${triage.priorityHelpline}.`;

  return {
    text,
    styleType: triage.urgency === 'critical' ? 'danger' : triage.urgency === 'high' ? 'critical_action' : 'verified_info',
    emergencyCategory: triage.category,
    suggestedActions: [
      ...(triage.suggestEmergencyMode ? [{ label: "🚨 Open I'm Trapped Mode", actionType: 'emergency_mode' as const }] : []),
      { label: `📞 Call ${triage.helplineName} (${triage.priorityHelpline})`, actionType: 'call' as const, payload: triage.priorityHelpline },
      { label: '📍 Find Nearby Shelters', actionType: 'shelters' as const }
    ]
  };
}
