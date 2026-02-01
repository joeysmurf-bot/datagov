
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  ExternalLink,
  Lock,
  History,
  Activity,
  Clipboard,
  ArrowRight
} from 'lucide-react';

interface ProposedEntity {
  id: string;
  name: string;
  definition: string;
  proposer: string;
  status: 'New' | 'Review' | 'Approved' | 'Revision';
  attributes: string[];
  technicalGap: boolean;
}

interface GovernanceCouncilProps {
  onViewCharter?: () => void;
  onSelectPolicy?: (id: string) => void;
}

const MOCK_PROPOSED: ProposedEntity[] = [
  { 
    id: 'PE-001', 
    name: 'Work_Order', 
    definition: 'A formal request for production or maintenance activity, identifying the asset, labor, and parts required.',
    proposer: 'Robert Miller (Ops)',
    status: 'Review',
    attributes: ['WorkOrder_ID', 'Asset_ID', 'Start_Date', 'Status'],
    technicalGap: true
  },
  { 
    id: 'PE-002', 
    name: 'Customer_Contact', 
    definition: 'An individual associated with a Customer account, including communication preferences and roles.',
    proposer: 'Sarah Chen (Sales)',
    status: 'New',
    attributes: ['Contact_ID', 'Email', 'Primary_Phone', 'Role_Code'],
    technicalGap: false
  }
];

const DOMAIN_HEALTH = [
  { name: 'Finance', status: 'Healthy', score: 98, owner: 'Emma Wilson' },
  { name: 'Sales', status: 'Healthy', score: 94, owner: 'Sarah Jenkins' },
  { name: 'Production', status: 'Warning', score: 82, owner: 'Robert Miller' },
  { name: 'Logistics', status: 'Critical', score: 45, owner: 'Unassigned' },
  { name: 'Core Master', status: 'Healthy', score: 96, owner: 'John Smith' },
  { name: 'HR', status: 'Healthy', score: 91, owner: 'David Lee' },
];

const GovernanceCouncil: React.FC<GovernanceCouncilProps> = ({ onViewCharter, onSelectPolicy }) => {
  const [selectedEntity, setSelectedEntity] = useState<ProposedEntity | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            Governance Council
          </h2>
          <p className="text-slate-500">Executing strategic oversight and defining the Hub's Single Source of Truth.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hub Trust Score</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-600">92.4%</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CDM Adoption</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-blue-600">74.1%</span>
              <Activity size={16} className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CDM Approval Portal */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Clipboard size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">CDM Approval Portal</h3>
                  <p className="text-xs text-slate-500">Approve new business entities for the Hub</p>
                </div>
              </div>
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                {MOCK_PROPOSED.length} Pending
              </span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {MOCK_PROPOSED.map((entity) => (
                <div key={entity.id} className="p-6 hover:bg-slate-50 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-md font-bold text-slate-900 font-mono-data group-hover:text-blue-600 transition-colors">{entity.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Proposed by {entity.proposer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {entity.technicalGap && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                          <AlertTriangle size={10} /> Lineage Gap
                        </span>
                      )}
                      <button 
                        onClick={() => setSelectedEntity(entity)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 underline px-2 py-1"
                      >
                        Review Definition
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 italic mb-4">
                    "{entity.definition}"
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                      <ThumbsUp size={14} /> Approve Standard
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                      <ThumbsDown size={14} /> Request Revision
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Domain Health Heatmap */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Domain Governance Heatmap</h3>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Healthy</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Warning</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Critical</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DOMAIN_HEALTH.map((domain, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer shadow-sm ${
                    domain.status === 'Healthy' ? 'bg-white border-slate-200 border-l-4 border-l-emerald-500' :
                    domain.status === 'Warning' ? 'bg-white border-slate-200 border-l-4 border-l-amber-500' :
                    'bg-white border-slate-200 border-l-4 border-l-rose-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-slate-900 text-sm">{domain.name}</h4>
                    <span className="text-xs font-bold text-slate-400">{domain.score}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {domain.owner.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{domain.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Policy & Compliance Library */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                  <Lock size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Governance Policies</h3>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All Policies</button>
            </div>
            <div className="p-0">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-3">Policy Name</th>
                    <th className="px-6 py-3">Retention</th>
                    <th className="px-6 py-3">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr 
                    onClick={() => onSelectPolicy && onSelectPolicy('pol-001')}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700 group-hover:text-blue-600 flex items-center gap-2">
                      Kafka Raw Ingest
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-400" />
                    </td>
                    <td className="px-6 py-4 text-slate-500">7 Days</td>
                    <td className="px-6 py-4"><span className="text-emerald-600 flex items-center gap-1 font-bold text-xs"><CheckCircle2 size={12}/> Compliant</span></td>
                  </tr>
                  <tr 
                    onClick={() => onSelectPolicy && onSelectPolicy('pol-002')}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700 group-hover:text-blue-600 flex items-center gap-2">
                      CDM Financials
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-400" />
                    </td>
                    <td className="px-6 py-4 text-slate-500">7 Years</td>
                    <td className="px-6 py-4"><span className="text-emerald-600 flex items-center gap-1 font-bold text-xs"><CheckCircle2 size={12}/> Compliant</span></td>
                  </tr>
                  <tr 
                    onClick={() => onSelectPolicy && onSelectPolicy('pol-003')}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700 group-hover:text-blue-600 flex items-center gap-2">
                      PII Data Masking
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-400" />
                    </td>
                    <td className="px-6 py-4 text-slate-500">Immediate</td>
                    <td className="px-6 py-4"><span className="text-amber-600 flex items-center gap-1 font-bold text-xs"><AlertTriangle size={12}/> Review Needed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Column 3: Sidebar Widgets */}
        <div className="space-y-8">
          
          {/* Council Charter */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Q1 Focus</h3>
              <p className="text-blue-100 text-xs leading-relaxed mb-4">
                "Onboarding the Supply Chain domain into the CDM while standardizing PII handling across Kafka streams."
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-lg w-fit">
                  <Calendar size={12} /> Next Meeting: Feb 12
                </div>
                <button 
                  onClick={onViewCharter}
                  className="mt-2 text-xs font-bold bg-white text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 w-full"
                >
                  <FileText size={14} /> View Founding Charter
                </button>
              </div>
            </div>
            <ShieldCheck size={120} className="absolute -bottom-8 -right-8 text-white/10" />
          </div>

          {/* Member Roster */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users size={18} className="text-blue-600" />
              Council Members
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Executive Sponsors</p>
                <div className="flex -space-x-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                      SP
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +1
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Domain Owners</p>
                <div className="space-y-3">
                  {['Sarah Jenkins', 'Robert Miller', 'Emma Wilson'].map((name, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-slate-700 font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conflict Resolution Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <AlertTriangle size={16} className="text-rose-500" />
                Definition Conflicts
              </h3>
              <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-100">1</span>
            </div>
            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
              <p className="text-xs font-bold text-rose-900 mb-1">Definition: Gross Margin</p>
              <p className="text-[10px] text-rose-700 leading-relaxed mb-3">
                Sales (Post-Discount) vs Finance (Pre-Discount). Adjudication required for Finance Reporting Hub.
              </p>
              <button className="w-full py-2 bg-white text-rose-700 text-[10px] font-bold rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors">
                Resolve Conflict
              </button>
            </div>
          </div>

          {/* Meeting Archive */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
              <History size={16} className="text-slate-400" />
              Meeting Minutes
            </h3>
            <div className="space-y-3">
              {[
                { date: 'Jan 28, 2025', subject: 'Logistics Domain Veto' },
                { date: 'Jan 14, 2025', subject: 'Quarterly Audit Review' }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">{m.subject}</p>
                    <p className="text-[10px] text-slate-400">{m.date}</p>
                  </div>
                  <FileText size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Slide-over for Entity Review (Simplified) */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedEntity(null)}></div>
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest border border-blue-100">CDM Nomination</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2 font-mono-data">{selectedEntity.name}</h2>
              </div>
              <button onClick={() => setSelectedEntity(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <ExternalLink size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-8 flex-1 overflow-y-auto pr-2">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Info size={14} /> Business Definition
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{selectedEntity.definition}"
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Critical Attributes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedEntity.attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-100 rounded-lg shadow-sm">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span className="text-xs font-mono-data font-medium text-slate-700">{attr}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3">Governance Mapping</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-indigo-700">Business Glossary Linked</span>
                    <span className="font-bold text-emerald-600">YES</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-indigo-700">Technical Lineage Proven</span>
                    <span className={`font-bold ${selectedEntity.technicalGap ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {selectedEntity.technicalGap ? 'MISSING' : 'VALIDATED'}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className="pt-8 border-t border-slate-100 flex gap-4">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                Approve Definition
              </button>
              <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Return for Revision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceCouncil;
