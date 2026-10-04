import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Share2, 
  Phone, 
  Sparkles,
  Check
} from 'lucide-react';
import { FamilyMember, FamilyStatus } from '../types';

export const FamilySafetySection: React.FC = () => {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 'fam-1',
      name: 'Tariq Mehmood (Father)',
      relation: 'Father',
      phone: '0300-1234567',
      status: 'safe',
      lastUpdated: '10 mins ago',
      notes: 'At home in Gulberg, generator running'
    },
    {
      id: 'fam-2',
      name: 'Amina Bibi (Mother)',
      relation: 'Mother',
      phone: '0321-7654321',
      status: 'safe',
      lastUpdated: '10 mins ago',
      notes: 'Together with father'
    },
    {
      id: 'fam-3',
      name: 'Bilal (Brother)',
      relation: 'Brother',
      phone: '0333-9876543',
      status: 'checking',
      lastUpdated: '35 mins ago',
      notes: 'Commuting from office, heavy rain'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [meetingPoint, setMeetingPoint] = useState('Central Community Park / Model Town High School Ground');
  const [copiedShare, setCopiedShare] = useState(false);

  // Status badge config
  const statusStyles: Record<FamilyStatus, { label: string; badge: string; icon: React.ReactNode }> = {
    safe: {
      label: 'Safe',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
    },
    checking: {
      label: 'Checking',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
    },
    need_help: {
      label: 'Need Help',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
    },
    unknown: {
      label: 'Unknown',
      badge: 'bg-slate-50 text-slate-600 border-slate-200',
      icon: <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
    }
  };

  const handleStatusChange = (id: string, newStatus: FamilyStatus) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus, lastUpdated: 'Just now' } : m));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: newName.trim(),
      relation: newRelation.trim() || 'Family',
      phone: newPhone.trim() || 'N/A',
      status: 'unknown',
      lastUpdated: 'Just now'
    };

    setMembers(prev => [...prev, newMember]);
    setNewName('');
    setNewRelation('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const safeCount = members.filter(m => m.status === 'safe').length;
  const progressPercent = Math.round((safeCount / Math.max(1, members.length)) * 100);

  const handleBroadcastSafety = () => {
    const summary = `🇵🇰 RELIEF AI PAKISTAN - FAMILY SAFETY UPDATE:\nMeeting Point: ${meetingPoint}\nStatus:\n${members.map(m => `• ${m.name}: ${m.status.toUpperCase()}`).join('\n')}\nSent via Relief AI Pakistan.`;
    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <section id="family-safety" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with soft peach/warm background accent */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FFF9F5] via-[#FFF5F2] to-[#FDF4F8] border border-[#FDE8E1] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(240,120,80,0.04)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Illustration & Stats */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 block">
                  Reassurance & Connection
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172033] font-heading tracking-tight leading-tight">
                  Keep Your Family Connected
                </h2>
                <p className="text-base sm:text-lg text-[#64748B] mt-2.5 leading-relaxed">
                  Establish a shared reunion plan, register family contacts, and broadcast verified safety status without causing panic.
                </p>
              </div>

              {/* Family Reassurance Image */}
              <div className="rounded-2xl overflow-hidden border border-[#FDE8E1] bg-white shadow-sm">
                <img
                  src="/src/assets/images/family_safety_reassurance_1791109040606.jpg"
                  alt="Pakistani family standing safely together"
                  className="w-full h-auto aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Progress Card */}
              <div className="p-4 bg-white rounded-2xl border border-[#FDE8E1] shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#172033] mb-2">
                  <span>Family Safety Status</span>
                  <span className="text-emerald-600">{safeCount} of {members.length} Confirmed Safe ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Family Roster & Meeting Point */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5EAF0] p-5 sm:p-7 shadow-sm space-y-6">
              
              {/* Meeting Point Box */}
              <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#172033]">Designated Safe Meeting Point</span>
                    <p className="text-xs text-[#64748B] mt-0.5">{meetingPoint}</p>
                  </div>
                </div>

                <button
                  onClick={handleBroadcastSafety}
                  className="px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-xs font-bold text-orange-700 hover:bg-orange-50 transition-colors flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedShare ? 'Copied Update!' : 'Broadcast Status'}</span>
                </button>
              </div>

              {/* Family Members Header */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3B82F6]" />
                  <h3 className="text-base font-bold text-[#172033] font-heading">
                    Registered Family Members
                  </h3>
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#3B82F6] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Add Member Form */}
              {showAddForm && (
                <form onSubmit={handleAddMember} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
                  <div className="text-xs font-bold text-[#172033]">Add Family Contact</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Relation (e.g. Sister)"
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (0300-...)"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                    >
                      Save Member
                    </button>
                  </div>
                </form>
              )}

              {/* Member Cards List */}
              <div className="space-y-3">
                {members.map((member) => {
                  const statusInfo = statusStyles[member.status];

                  return (
                    <div
                      key={member.id}
                      className="p-3.5 rounded-xl border border-[#E5EAF0] bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#172033]">{member.name}</span>
                          <span className="text-xs text-[#64748B]">· {member.relation}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#64748B] mt-1">
                          <a href={`tel:${member.phone}`} className="flex items-center gap-1 hover:text-blue-600 font-medium">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </a>
                          <span>· Updated {member.lastUpdated}</span>
                        </div>
                        {member.notes && (
                          <div className="text-[11px] text-slate-500 mt-1 italic">
                            "{member.notes}"
                          </div>
                        )}
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <select
                          value={member.status}
                          onChange={(e) => handleStatusChange(member.id, e.target.value as FamilyStatus)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none transition-all cursor-pointer ${statusInfo.badge}`}
                        >
                          <option value="safe">🟢 Confirmed Safe</option>
                          <option value="checking">🟡 Checking Status</option>
                          <option value="need_help">🔴 Needs Help</option>
                          <option value="unknown">⚪ Unknown</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
