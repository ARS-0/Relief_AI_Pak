export type Language = 'en' | 'ur' | 'roman_ur';

export type EmergencyCategory = 
  | 'flood' 
  | 'earthquake' 
  | 'fire' 
  | 'medical' 
  | 'landslide' 
  | 'weather' 
  | 'accident' 
  | 'other';

export interface EmergencyGuideStep {
  id: string;
  category: EmergencyCategory;
  title: string;
  titleUrdu: string;
  subtitle: string;
  immediateAction: string;
  immediateActionUrdu: string;
  dos: string[];
  dosUrdu: string[];
  donts: string[];
  dontsUrdu: string[];
  priorityPhone: string;
  priorityPhoneLabel: string;
  secondaryPhone?: string;
  secondaryPhoneLabel?: string;
  evacuationTrigger?: string;
  iconName: string;
}

export type ResourceType = 'hospital' | 'rescue' | 'shelter' | 'police' | 'relief_center';

export interface VerifiedResource {
  id: string;
  name: string;
  type: ResourceType;
  city: string;
  province: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  verified: boolean;
  status: 'Open' | 'Operating' | 'High Capacity' | 'Standby';
  capacityNotes?: string;
  distanceKm?: number;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  source: 'NDMA' | 'PMD' | 'PDMA' | 'Rescue 1122';
  severity: 'critical' | 'advisory' | 'info';
  category: 'flood' | 'earthquake' | 'weather' | 'heatwave';
  region: string;
  timeAgo: string;
  description: string;
  instructions: string[];
}

export type FamilyStatus = 'safe' | 'checking' | 'need_help' | 'unknown';

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  status: FamilyStatus;
  lastUpdated: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  styleType?: 'normal' | 'critical_action' | 'danger' | 'verified_info';
  suggestedActions?: {
    label: string;
    actionType: 'emergency_mode' | 'call' | 'guide' | 'shelters';
    payload?: string;
  }[];
  quickOptions?: string[];
  emergencyCategory?: EmergencyCategory;
}

export interface EmergencyKitItem {
  id: string;
  name: string;
  nameUrdu: string;
  category: 'must_have' | 'if_available';
  icon: string;
  checked: boolean;
  description: string;
}
