import { EmergencyGuideStep, VerifiedResource, EmergencyAlert, EmergencyKitItem } from '../types';

export const PAKISTAN_HOTLINES = [
  { name: 'Rescue 1122', number: '1122', purpose: 'National Ambulance, Fire & Disaster Rescue', highlight: true, color: '#F43F5E' },
  { name: 'Edhi Emergency', number: '115', purpose: 'Nationwide Ambulance & Relief', highlight: false, color: '#3B82F6' },
  { name: 'Police Helpline', number: '15', purpose: 'Immediate Police Assistance', highlight: false, color: '#14B8A6' },
  { name: 'Chhipa Ambulance', number: '1020', purpose: 'Emergency Medical Transport', highlight: false, color: '#38BDF8' },
  { name: 'NDMA Crisis Cell', number: '051-111-157-157', purpose: 'National Disaster Management Authority', highlight: false, color: '#8B5CF6' },
  { name: 'Fire Brigade', number: '16', purpose: 'Municipal Fire Departments', highlight: false, color: '#F97316' },
  { name: 'Motorway Police', number: '130', purpose: 'National Highways & Motorways NHMP', highlight: false, color: '#10B981' },
  { name: 'Red Crescent (Hilal-e-Ahmar)', number: '1030', purpose: 'Humanitarian & First Aid Relief', highlight: false, color: '#EF4444' }
];

export const EMERGENCY_GUIDES: EmergencyGuideStep[] = [
  {
    id: 'flood',
    category: 'flood',
    title: 'Flood & Flash Floods',
    titleUrdu: 'سیلاب اور تیز بہاؤ',
    subtitle: 'Evacuation, rising water, and flash flood safety protocols.',
    immediateAction: 'Move to higher ground immediately only if safe. Never walk or drive through moving water.',
    immediateActionUrdu: 'اگر محفوظ ہو تو فوری طور پر اونچی جگہ منتقل ہوں۔ بہتے پانی میں ہرگز نہ چلیں اور نہ ہی گاڑی چلائیں۔',
    dos: [
      'Disconnect main electrical switches and gas cylinders before evacuating.',
      'Head to designated community elevated shelters or reinforced multistory buildings.',
      'Keep your emergency grab-kit, clean drinking water, and essential medicines elevated with you.'
    ],
    dosUrdu: [
      'گھر چھوڑنے سے پہلے بجلی کا مین سوئچ اور گیس سیلنڈر بند کریں۔',
      'مقررہ اونچی محفوظ عمارت یا کمیونٹی شیلٹر کی طرف جائیں۔',
      'پینے کا صاف پانی اور ضروری ادویات اونچی جگہ پر محفوظ رکھیں۔'
    ],
    donts: [
      'Do NOT walk through moving water even if it appears ankle-deep (6 inches can knock you down).',
      'Do NOT attempt to drive through flooded roads or underpasses.',
      'Do NOT touch fallen electric poles, dangling wires, or standing water near transformers.'
    ],
    dontsUrdu: [
      'بہتے پانی میں ہرگز نہ چلیں، صرف ۶ انچ گہرا تیز بہاؤ انسان کو گرا سکتا ہے۔',
      'پانی سے بھری سڑکوں یا انڈرپاسز سے گاڑی نہ گزاریں۔',
      'گرے ہوئے بجلی کے کھمبوں اور تاروں کو ہاتھ نہ لگائیں۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'Rescue 1122 Disaster Team',
    secondaryPhone: '051-111-157-157',
    secondaryPhoneLabel: 'NDMA Control Room',
    evacuationTrigger: 'Water entering the ground floor or community alert siren sounding',
    iconName: 'Waves'
  },
  {
    id: 'earthquake',
    category: 'earthquake',
    title: 'Earthquake',
    titleUrdu: 'زلزلہ',
    subtitle: 'Drop, Cover, and Hold On. Protect your head and prepare for aftershocks.',
    immediateAction: 'DROP to your hands and knees. COVER your head and neck under a sturdy table. HOLD ON until shaking stops.',
    immediateActionUrdu: 'جھکیں (DROP)، سر کو مضبوط میز کے نیچے چھپائیں (COVER)، اور لرزش رکنے تک مضبوطی سے پکڑے رکھیں (HOLD ON)۔',
    dos: [
      'If indoors, stay inside. Protect your head from falling glass, fans, and plaster.',
      'If outdoors, move to an open clearing away from tall power lines, billboards, and brick walls.',
      'Check yourself and family for injuries and check for gas leaks before using lighters or matches.'
    ],
    dosUrdu: [
      'اگر عمارت کے اندر ہیں تو وہیں رہیں۔ سر اور گردن کو گرنے والے ملبے سے بچائیں۔',
      'اگر باہر ہیں تو بجلی کے تاروں، اونچی دیواروں اور بل بورڈز سے دور کھلی جگہ پر جائیں۔',
      'زلزلے کے بعد گیس لیکیج کی جانچ کریں اور ماچس یا آگ کا استعمال نہ کریں۔'
    ],
    donts: [
      'Do NOT rush towards elevators or crowded narrow stairwells while shaking is active.',
      'Do NOT stand under heavy ceiling fans, chandeliers, or unsecured brick parapets.',
      'Do NOT spread unverified rumours or panic messages on WhatsApp.'
    ],
    dontsUrdu: [
      'لرزش کے دوران لفٹ کا استعمال ہرگز نہ کریں اور نہ ہی سیڑھیوں پر بھگدڑ مچائیں۔',
      'بھاری پنکھوں یا شیشے کی کھڑکیوں کے قریب نہ کھڑے ہوں۔',
      'غیر تصدیق شدہ افواہیں یا خوف و ہراس نہ پھیلائیں۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'Rescue 1122',
    secondaryPhone: '115',
    secondaryPhoneLabel: 'Edhi Ambulance',
    iconName: 'Activity'
  },
  {
    id: 'fire',
    category: 'fire',
    title: 'Fire & Gas Leak',
    titleUrdu: 'آگ اور گیس لیکیج',
    subtitle: 'Rapid evacuation, smoke inhalation protection, and call for fire brigade.',
    immediateAction: 'GET OUT immediately. Stay low to the ground beneath the rising smoke. Close doors behind you.',
    immediateActionUrdu: 'فوری طور پر باہر نکلیں۔ دھوئیں سے بچنے کے لیے فرش کے قریب جھک کر چلیں۔',
    dos: [
      'Crawl low under smoke towards the nearest safe exterior exit.',
      'Cover your nose and mouth with a damp cloth if available.',
      'Once safely outside, stay outside in a clear assembly area and call Rescue 1122 / 16.'
    ],
    dosUrdu: [
      'دھوئیں سے بچنے کے لیے جھک کر قریبی دروازے کی طرف بڑھیں۔',
      'اگر ممکن ہو تو نم کپڑے سے ناک اور منہ ڈھانپیں۔',
      'ایک بار باہر نکلنے کے بعد دوبارہ اندر ہرگز نہ جائیں۔'
    ],
    donts: [
      'Do NOT use elevators under any circumstances during a fire alarm.',
      'Do NOT re-enter a burning building to retrieve belongings or pets.',
      'Do NOT throw water on grease or electrical fires; use dry powder or a heavy blanket.'
    ],
    dontsUrdu: [
      'آگ لگنے پر لفٹ کا استعمال ہرگز نہ کریں۔',
      'سامان لینے کے لیے جلتی عمارت میں واپس نہ جائیں۔',
      'بجلی یا تیل کی آگ پر پانی مت پھینکیں۔'
    ],
    priorityPhone: '16',
    priorityPhoneLabel: 'Fire Brigade (16)',
    secondaryPhone: '1122',
    secondaryPhoneLabel: 'Rescue 1122 Emergency',
    iconName: 'Flame'
  },
  {
    id: 'medical',
    category: 'medical',
    title: 'Medical Emergency',
    titleUrdu: 'طبی ہنگامی صورتحال',
    subtitle: 'First response for cardiac arrest, severe bleeding, burns, or heatstroke.',
    immediateAction: 'Check responsiveness and airway. Call emergency medical dispatch immediately.',
    immediateActionUrdu: 'ہوش اور سانس کی جانچ کریں۔ فوری طور پر ایمبولینس کو کال کریں۔',
    dos: [
      'Apply direct firm pressure with a clean cloth over severe bleeding wounds.',
      'If heatstroke is suspected (dizziness, high temperature, no sweating), move to shade and apply cool damp cloths to neck and armpits.',
      'Keep the patient calm, lying down, and comfortable until certified paramedics arrive.'
    ],
    dosUrdu: [
      'شدید خون بہنے کی صورت میں صاف کپڑے سے زخم کو مضبوطی سے دبائیں۔',
      'لو لگنے (ہیٹ اسٹروک) کی صورت میں مریض کو فوری سائے میں لے جائیں اور ٹھنڈے پانی کی پٹیاں رکھیں۔',
      'پیشہ ور طبی عملے کی آمد تک مریض کو پرسکون اور لیٹا رکھیں۔'
    ],
    donts: [
      'Do NOT give liquids or solids by mouth to an unconscious or drowsy person.',
      'Do NOT move a patient suspected of having a spinal or neck fracture unless in immediate fire danger.',
      'Do NOT delay calling professional medical help (1122 or 115).'
    ],
    dontsUrdu: [
      'بے ہوش یا غنودگی والے شخص کے منہ میں کوئی مشروب یا خوراک نہ ڈالیں۔',
      'گردن یا ریڑھ کی ہڈی کی چوٹ کی صورت میں مریض کو غیر ضروری طور پر نہ ہلائیں۔',
      'طبی عملے کو کال کرنے میں تاخیر نہ کریں۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'Rescue 1122 Ambulance',
    secondaryPhone: '115',
    secondaryPhoneLabel: 'Edhi Medical Service',
    iconName: 'HeartPulse'
  },
  {
    id: 'landslide',
    category: 'landslide',
    title: 'Landslide & Rockfall',
    titleUrdu: 'لینڈ سلائیڈنگ اور چٹانوں کا گرنا',
    subtitle: 'Highland safety along northern Pakistan highways (Karakoram, Murree, Swat).',
    immediateAction: 'Move away immediately from steep slopes, ravines, and drainage paths. Stay alert for rumbling sounds.',
    immediateActionUrdu: 'فوری طور پر ڈھلوانوں اور کھائیوں سے دور ہٹیں۔ گڑگڑاہٹ کی آوازوں پر الرٹ رہیں۔',
    dos: [
      'Listen for unusual sounds like trees cracking or boulders knocking together.',
      'If in a vehicle, park away from cliffs or unstable overhangs.',
      'Watch for sudden increases or decreases in mountain stream water flow.'
    ],
    dosUrdu: [
      'درختوں کے ٹوٹنے یا پتھروں کے گرنے کی غیر معمولی آوازوں پر دھیان دیں۔',
      'گاڑی کو پہاڑی چٹانوں کے بالکل نیچے کھڑا نہ کریں۔',
      'پہاڑی ندی نالوں کے پانی کی سطح میں اچانک تبدیلی پر نظر رکھیں۔'
    ],
    donts: [
      'Do NOT approach fresh landslide debris; secondary slides are frequent and dangerous.',
      'Do NOT stop your car directly underneath unstable rocky embankments.',
      'Do NOT cross bridges that appear undermined or shaken.'
    ],
    dontsUrdu: [
      'تازہ تودے کے قریب نہ جائیں، دوبارہ تودہ گرنے کا خطرہ رہتا ہے۔',
      'خستہ حال پلوں کو پار نہ کریں۔',
      'ڈھلوان کے کنارے کھڑے ہو کر ویڈیو بنانے سے گریز کریں۔'
    ],
    priorityPhone: '130',
    priorityPhoneLabel: 'Motorway Police (130)',
    secondaryPhone: '1122',
    secondaryPhoneLabel: 'Rescue 1122 Highland Unit',
    iconName: 'Mountain'
  },
  {
    id: 'weather',
    category: 'weather',
    title: 'Severe Weather & Heatwave',
    titleUrdu: 'شدید موسم اور ہیٹ ویو',
    subtitle: 'Lightning, torrential monsoon rainfall, dust storms, and extreme 45°C+ heatwaves.',
    immediateAction: 'Seek sheltered indoor shelter immediately. Stay well hydrated and away from metal objects during lightning.',
    immediateActionUrdu: 'فوری طور پر محفوظ عمارت میں پناہ لیں۔ پانی کا زیادہ استعمال کریں اور آسمانی بجلی کے وقت کھلے میدان سے دور رہیں۔',
    dos: [
      'During extreme heat, drink oral rehydration solutions (ORS) and wear light, loose cotton clothing.',
      'Unplug sensitive electronics during violent thunderstorms.',
      'Secure loose rooftop sheet iron, water tanks, and solar panels before high winds arrive.'
    ],
    dosUrdu: [
      'شدید گرمی میں او آر ایس (نمکول) کا استعمال کریں اور ہلکے سوتی کپڑے پہنیں۔',
      'آندھی اور طوفان سے پہلے چھت پر موجود اشیاء اور سولر پینلز کو محفوظ کریں۔',
      'آسمانی بجلی کے دوران کھڑکیوں اور برقی آلات سے دور رہیں۔'
    ],
    donts: [
      'Do NOT stand under solitary tall trees during lightning strikes.',
      'Do NOT leave children or pets inside parked vehicles during daytime heat.',
      'Do NOT venture out on two-wheelers during heavy monsoon gale warnings.'
    ],
    dontsUrdu: [
      'آسمانی بجلی چمکنے کے دوران اکیلے اونچے درخت کے نیچے نہ کھڑے ہوں۔',
      'گرمی میں بچوں کو بند گاڑی میں ہرگز اکیلا نہ چھوڑیں۔',
      'تیز آندھی اور بارش میں موٹر سائیکل چلانے سے پرہیز کریں۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'Rescue 1122 Weather Aid',
    secondaryPhone: '051-111-157-157',
    secondaryPhoneLabel: 'PMD / NDMA Info',
    iconName: 'CloudLightning'
  },
  {
    id: 'accident',
    category: 'accident',
    title: 'Traffic & Highway Accident',
    titleUrdu: 'روڈ اور ہائی وے حادثات',
    subtitle: 'Safe cordon, vehicle hazard warnings, and rapid trauma extraction.',
    immediateAction: 'Ensure scene safety first. Turn on hazard flashers, place warning triangle, and call 1122 or 130.',
    immediateActionUrdu: 'پہلے اپنی اور جگہ کی حفاظت یقینی بنائیں۔ ہیزرڈ لائٹس جلائیں اور ۱۱۲۲ یا ۱۳۰ پر کال کریں۔',
    dos: [
      'Turn off ignitions of all crashed vehicles to eliminate fuel fire risks.',
      'Set emergency reflector triangles 50 meters behind the crash location.',
      'Provide clear landmarks or motorway kilometer markers when reporting location.'
    ],
    dosUrdu: [
      'آگ کے خطرے سے بچنے کے لیے گاڑیوں کا سوئچ بند کریں۔',
      'حادثے سے ۵۰ میٹر پیچھے وارننگ ریفلیکٹر لگائیں تاکہ دوسری گاڑیاں نہ ٹکرائیں۔',
      'کال کرتے وقت موٹروے کا کلومیٹر مارکر یا قریبی سنگ میل واضح بتائیں۔'
    ],
    donts: [
      'Do NOT violently yank an injured person out of a vehicle unless there is an imminent fire hazard.',
      'Do NOT stand in active high-speed motorway lanes to inspect vehicle damage.',
      'Do NOT give water to victims who may require immediate surgery.'
    ],
    dontsUrdu: [
      'اگر آگ کا خطرہ نہ ہو تو زخمی شخص کو زبردستی کھینچ کر گاڑی سے نہ نکالیں۔',
      'ہائی وے کی تیز رفتار لین میں کھڑے نہ ہوں۔',
      'مریض کو فوری پانی نہ پلائیں اگر سرجری کا امکان ہو۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'Rescue 1122 Highway',
    secondaryPhone: '130',
    secondaryPhoneLabel: 'Motorway Police (130)',
    iconName: 'Car'
  },
  {
    id: 'other',
    category: 'other',
    title: 'General Crisis & Trap Triage',
    titleUrdu: 'دیگر ہنگامی صورتحال',
    subtitle: 'Building collapse, electrical hazards, gas explosion, or community isolation.',
    immediateAction: 'Calm yourself. Assess immediate exits. Make noise to signal rescuers. Conserve phone battery.',
    immediateActionUrdu: 'پرسکون رہیں۔ محفوظ راستے تلاش کریں۔ مددگاروں کو آواز دینے کے لیے شور مچائیں اور موبائل بیٹری بچائیں۔',
    dos: [
      'Tap on metal pipes or wall structures with a stone to alert acoustic rescue sensors.',
      'Keep your emergency whistle ready; whistling takes far less energy than screaming.',
      'Turn phone on battery saver mode and text rather than making long voice calls.'
    ],
    dosUrdu: [
      'ملبے میں پھنسنے کی صورت میں پائپ یا دیوار پر پتھر مار کر آواز پیدا کریں۔',
      'سیٹی (Whistle) کا استعمال کریں کیونکہ اس میں گلے کی توانائی کم خرچ ہوتی ہے۔',
      'موبائل فون کو پاور سیور موڈ پر لگائیں اور طویل کالز کے بجائے ایس ایم ایس کریں۔'
    ],
    donts: [
      'Do NOT light matches or cigarette lighters if gas or toxic fumes might be present.',
      'Do NOT panic and deplete your air or water supply unnecessarily.',
      'Do NOT move heavy concrete debris if it appears load-bearing.'
    ],
    dontsUrdu: [
      'گیس لیکیج کے خطرے کے پیش نظر ماچس یا لائٹر نہ جلائیں۔',
      'خوفزدہ ہو کر سانسیں تیز نہ کریں، آکسیجن اور توانائی بچائیں۔',
      'بنیادی سہارے والے بھاری ستونوں کو مت چھیڑیں۔'
    ],
    priorityPhone: '1122',
    priorityPhoneLabel: 'National Rescue Helpline',
    secondaryPhone: '15',
    secondaryPhoneLabel: 'Police Help',
    iconName: 'ShieldAlert'
  }
];

export const VERIFIED_RESOURCES: VerifiedResource[] = [
  {
    id: 'res-1',
    name: 'Rescue 1122 Central Command Station',
    type: 'rescue',
    city: 'Lahore',
    province: 'Punjab',
    address: 'Muslim Town Morr, Ferozepur Road, Lahore',
    lat: 31.5204,
    lng: 74.3587,
    phone: '1122',
    verified: true,
    status: 'Operating',
    capacityNotes: '24/7 Rapid Disaster Response & Boat Rescue Fleet',
    distanceKm: 1.8
  },
  {
    id: 'res-2',
    name: 'Jinnah Postgraduate Medical Centre (JPMC)',
    type: 'hospital',
    city: 'Karachi',
    province: 'Sindh',
    address: 'Rafiqui Shaheed Road, Karachi Cantonment',
    lat: 24.8532,
    lng: 67.0456,
    phone: '021-99201300',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Level-1 Emergency Trauma Centre & Burn Unit',
    distanceKm: 2.4
  },
  {
    id: 'res-3',
    name: 'Edhi Super Highway Emergency Village & Relief Camp',
    type: 'shelter',
    city: 'Karachi',
    province: 'Sindh',
    address: 'M-9 Motorway, Gadap Town, Karachi',
    lat: 24.9920,
    lng: 67.1420,
    phone: '115',
    verified: true,
    status: 'Open',
    capacityNotes: '1,200 person capacity, clean drinking water, hot meals & medical camp',
    distanceKm: 4.1
  },
  {
    id: 'res-4',
    name: 'Pakistan Institute of Medical Sciences (PIMS)',
    type: 'hospital',
    city: 'Islamabad',
    province: 'ICT',
    address: 'Sector G-8/3, Islamabad',
    lat: 33.7032,
    lng: 73.0538,
    phone: '051-9261170',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Tertiary Trauma Center, Pediatric Emergency, 24/7 Blood Bank',
    distanceKm: 3.2
  },
  {
    id: 'res-5',
    name: 'Rescue 1122 Divisional Headquarters Rawalpindi',
    type: 'rescue',
    city: 'Rawalpindi',
    province: 'Punjab',
    address: 'Rawal Road, Chandni Chowk, Rawalpindi',
    lat: 33.6124,
    lng: 73.0694,
    phone: '1122',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Specialized Nullah Lai Flood Monitoring & Scuba Squad',
    distanceKm: 2.1
  },
  {
    id: 'res-6',
    name: 'Lady Reading Hospital (LRH) Emergency Complex',
    type: 'hospital',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    address: 'Soekarno Square, LRH Road, Peshawar',
    lat: 34.0151,
    lng: 71.5785,
    phone: '091-9211430',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Major Provincial Emergency & Triage Facility',
    distanceKm: 1.5
  },
  {
    id: 'res-7',
    name: 'Chhipa Welfare Centre & Disaster Dispatch',
    type: 'relief_center',
    city: 'Karachi',
    province: 'Sindh',
    address: 'Opposite FTC, Shahrah-e-Faisal, Karachi',
    lat: 24.8615,
    lng: 67.0652,
    phone: '1020',
    verified: true,
    status: 'Open',
    capacityNotes: 'Free emergency ambulance, ration distribution, drinking water tanker dispatch',
    distanceKm: 2.9
  },
  {
    id: 'res-8',
    name: 'Bolan Medical College Hospital (BMC)',
    type: 'hospital',
    city: 'Quetta',
    province: 'Balochistan',
    address: 'Brewery Road, Quetta',
    lat: 30.1798,
    lng: 66.9750,
    phone: '081-9213070',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Primary Emergency Referral & Winter Shelter Aid',
    distanceKm: 3.8
  },
  {
    id: 'res-9',
    name: 'Sports Complex Humanitarian Shelter Center',
    type: 'shelter',
    city: 'Lahore',
    province: 'Punjab',
    address: 'Nishtar Park Sports Complex, Ferozepur Road, Lahore',
    lat: 31.5132,
    lng: 74.3312,
    phone: '042-99230154',
    verified: true,
    status: 'Open',
    capacityNotes: 'Spacious flood & rain refuge hall, bedding, sanitation and baby supplies',
    distanceKm: 3.5
  },
  {
    id: 'res-10',
    name: 'Sukkur Barrage Flood Relief Camp & Safe Island',
    type: 'shelter',
    city: 'Sukkur',
    province: 'Sindh',
    address: 'Old Sukkur Road, Near Circuit House, Sukkur',
    lat: 27.6975,
    lng: 68.8574,
    phone: '071-9310612',
    verified: true,
    status: 'Open',
    capacityNotes: 'PDMA Sindh Verified Elevated Shelter, Rescue Boats on site',
    distanceKm: 5.2
  },
  {
    id: 'res-11',
    name: 'Sindh Police 15 Central Control Center',
    type: 'police',
    city: 'Karachi',
    province: 'Sindh',
    address: 'Central Police Office (CPO), I.I. Chundrigar Road, Karachi',
    lat: 24.8510,
    lng: 67.0090,
    phone: '15',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Emergency patrol dispatch, crowd safety, route clearance',
    distanceKm: 3.0
  },
  {
    id: 'res-12',
    name: 'Gilgit-Baltistan Disaster Management Base',
    type: 'relief_center',
    city: 'Gilgit',
    province: 'Gilgit-Baltistan',
    address: 'River Road, Near City Bridge, Gilgit',
    lat: 35.9221,
    lng: 74.3087,
    phone: '05811-920258',
    verified: true,
    status: 'Operating',
    capacityNotes: 'Mountain rescue coordination, thermal blankets, satellite link',
    distanceKm: 4.8
  }
];

export const LIVE_ALERTS: EmergencyAlert[] = [
  {
    id: 'alt-1',
    title: 'Monsoon Heavy Rainfall & Urban Flooding Advisory',
    source: 'PMD',
    severity: 'advisory',
    category: 'weather',
    region: 'Rawalpindi, Lahore, Gujranwala & Karachi Divisions',
    timeAgo: 'Updated 22 mins ago',
    description: 'Pakistan Meteorological Department warns of moderate to heavy precipitation. Risk of localized ponding in low-lying roads and rise in Nullah Lai water levels.',
    instructions: [
      'Avoid parking vehicles near storm drains or electrical substations.',
      'Residents in low-lying settlements should keep essentials packed on upper floors.',
      'Keep mobile phones fully charged in case of preventive power shutdowns.'
    ]
  },
  {
    id: 'alt-2',
    title: 'River Indus & Chenab Upstream Flow Monitoring',
    source: 'NDMA',
    severity: 'info',
    category: 'flood',
    region: 'Tarbela, Chashma, Guddu Barrage Sectors',
    timeAgo: 'Updated 1 hour ago',
    description: 'Normal to low flood flow currently reported at major barrages. Rescue 1122 water rescue units on 24-hour preventive alert in riverine catchments.',
    instructions: [
      'Riverbank farming communities advised not to leave livestock in floodway zones.',
      'Check official NDMA bulletin updates before traveling on river ferry links.'
    ]
  },
  {
    id: 'alt-3',
    title: 'Karakoram Highway (KKH) Landslide Clearing Operation',
    source: 'PDMA',
    severity: 'advisory',
    category: 'earthquake',
    region: 'Kohistan to Hunza Corridor (Section Km 312)',
    timeAgo: 'Updated 2 hours ago',
    description: 'Frontier Works Organization (FWO) heavy machinery deployed for debris clearance following rockfall. One-way traffic open with caution.',
    instructions: [
      'Avoid night-time travel on steep mountain sections until daylight verification.',
      'Follow Motorway Police helpline 130 for real-time clearance status.'
    ]
  }
];

export const EMERGENCY_KIT_ITEMS: EmergencyKitItem[] = [
  {
    id: 'kit-1',
    name: 'Clean Drinking Water (3L per person)',
    nameUrdu: 'پینے کا صاف پانی (۳ لیٹر فی کس)',
    category: 'must_have',
    icon: 'Droplets',
    checked: true,
    description: 'Keep sealed plastic bottles. Sufficient for at least 48 to 72 hours.'
  },
  {
    id: 'kit-2',
    name: 'Prescription Medicines & Basic First Aid',
    nameUrdu: 'ضروری ادویات اور فرسٹ ایڈ کٹ',
    category: 'must_have',
    icon: 'Pill',
    checked: true,
    description: '7-day supply of insulin, BP, asthma inhalers, bandages, antiseptic, and painkillers.'
  },
  {
    id: 'kit-3',
    name: 'CNIC, Nikahnama & Property Deeds (in waterproof ziplock)',
    nameUrdu: 'شناختی کارڈ، نکاح نامہ اور اہم دستاویزات',
    category: 'must_have',
    icon: 'FileText',
    checked: false,
    description: 'Original CNICs, child B-forms, and photocopies in airtight waterproof plastic.'
  },
  {
    id: 'kit-4',
    name: 'High-Power LED Flashlight & Spare Batteries',
    nameUrdu: 'ٹارچ اور اضافی سیل',
    category: 'must_have',
    icon: 'Flashlight',
    checked: true,
    description: 'Vital during grid power outage or night rescue signaling.'
  },
  {
    id: 'kit-5',
    name: 'Fully Charged Power Bank & Multi-Cable',
    nameUrdu: 'پاور بینک اور چارجنگ کیبل',
    category: 'must_have',
    icon: 'BatteryCharging',
    checked: true,
    description: 'Keeps communication alive with family and Rescue 1122.'
  },
  {
    id: 'kit-6',
    name: 'Emergency Safety Whistle',
    nameUrdu: 'ایمرجنسی سیٹی',
    category: 'must_have',
    icon: 'Volume2',
    checked: false,
    description: 'Audible up to 500m under rubble or flood noise without losing breath.'
  },
  {
    id: 'kit-7',
    name: 'Non-Perishable Food (Dates, roasted grams, dry biscuits)',
    nameUrdu: 'خشک خوراک (کھجور، بھنے چنے، بسکٹ)',
    category: 'if_available',
    icon: 'Utensils',
    checked: false,
    description: 'High-energy, lightweight food requiring no stove or refrigeration.'
  },
  {
    id: 'kit-8',
    name: 'Small Cash in Small Currency Notes',
    nameUrdu: 'نقد رقم (چھوٹے نوٹ)',
    category: 'if_available',
    icon: 'Coins',
    checked: false,
    description: 'ATMs and internet banking shut down during power failures.'
  },
  {
    id: 'kit-9',
    name: 'Spare Warm Clothing / Rain Poncho',
    nameUrdu: 'اضافی کپڑے یا بارش سے بچاؤ کا کوٹ',
    category: 'if_available',
    icon: 'Shirt',
    checked: false,
    description: 'Prevents hypothermia when soaked in cold monsoon water.'
  },
  {
    id: 'kit-10',
    name: 'Oral Rehydration Salts (ORS packets) & Water Purification Tabs',
    nameUrdu: 'او آر ایس اور پانی صاف کرنے کی گولیاں',
    category: 'if_available',
    icon: 'Shield',
    checked: false,
    description: 'Prevents life-threatening cholera and waterborne dehydration.'
  }
];

export const PAKISTAN_CITIES = [
  'All Cities',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
  'Sukkur',
  'Hyderabad',
  'Gilgit',
  'Abbottabad'
];
