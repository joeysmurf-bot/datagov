
import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  Compass, 
  Scale, 
  FileText, 
  Users, 
  Database, 
  Layers, 
  Lock, 
  Clock,
  Briefcase
} from 'lucide-react';

interface CharterProps {
  onBack: () => void;
}

const Charter: React.FC<CharterProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Council
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-10 text-center text-white relative overflow-hidden">
          <ShieldCheck size={160} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          <h1 className="text-3xl font-bold relative z-10 mb-2">Durable Hub Data Governance Charter</h1>
          <div className="flex justify-center gap-6 text-slate-400 text-sm font-mono-data mt-4 relative z-10">
            <span>Version: 1.0</span>
            <span>•</span>
            <span>Effective: July 2025</span>
            <span>•</span>
            <span>Review: Annual</span>
          </div>
        </div>

        <div className="p-10 space-y-12">
          
          {/* 1. Mission */}
          <section>
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Target size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Mission & Mandate</h2>
            </div>
            <p className="text-slate-600 leading-relaxed pl-2 mb-4">
              The Data Governance Council (DGC) is established to create, maintain, and protect the <strong className="text-slate-900">Canonical Data Model (CDM)</strong> as the single source of truth for the enterprise.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 pl-6 border-l-4 border-l-blue-500">
              <h3 className="font-bold text-slate-900 mb-2">Our Intent</h3>
              <p className="text-slate-600">
                To move from reactive data fixing to proactive stewardship. We treat data as a strategic asset that supports our "Unified Durable Hub," ensuring interoperability across Manufacturing, Finance, Sales, and Engineering without creating bureaucratic bottlenecks.
              </p>
            </div>
          </section>

          {/* 2. Scope */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Compass size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Governance Scope</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Canonical Data Model', icon: Database, desc: 'All definitions, attributes, and logic residing in the S3/Iceberg "Silver" layer and Snowflake "Gold" layer.' },
                { title: 'Reporting & Semantics', icon: FileText, desc: 'All measures, KPIs, and semantic logic defined in DBT and exposed via Power BI.' },
                { title: 'Integration Standards', icon: Layers, desc: 'The rules for ingesting data via Confluent (Kafka/Connect) and transforming it via Flink.' },
                { title: 'Security & Access', icon: Lock, desc: 'Role-Based Access Control (RBAC), PII masking, and row-level security policies enforced in Snowflake and AWS.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="shrink-0 mt-1 text-slate-400">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Structure */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Users size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Governance Structure</h2>
            </div>
            <div className="space-y-6">
              {[
                { 
                  role: '3.1 Executive Leadership Team (ELT)', 
                  focus: 'Strategic Oversight & Escalation',
                  cadence: 'Quarterly',
                  items: ['Approves Charter and major policy changes.', 'Final decision authority for disputes.', 'Aligns data strategy with corporate goals.'] 
                },
                { 
                  role: '3.2 Data Governance Council (DGC)', 
                  focus: 'Operational Authority',
                  cadence: 'Monthly',
                  items: ['Approves new CDM objects/attributes.', 'Standardizes business definitions.', 'Prioritizes technical data debt.'] 
                },
                { 
                  role: '3.3 Data Stewards (Domain Experts)', 
                  focus: 'Execution & Quality',
                  cadence: 'Continuous',
                  items: ['SMEs for verticals (Ops, Finance, Sales).', 'Responsible for definition, quality, and PII classification.', 'First line approval for access.'] 
                },
                { 
                  role: '3.4 Data Engineering Team', 
                  focus: 'Technical Enablement',
                  cadence: 'Sprint-based',
                  items: ['Implements policies via IaC (Terraform, DBT).', 'Manages platform (Confluent, Snowflake, AWS).'] 
                }
              ].map((group, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="md:w-1/3">
                    <h3 className="font-bold text-slate-900">{group.role}</h3>
                    <p className="text-sm text-blue-600 font-medium mt-1">{group.focus}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 bg-slate-100 w-fit px-2 py-1 rounded">
                      <Clock size={12} /> {group.cadence}
                    </div>
                  </div>
                  <div className="md:w-2/3 border-l border-slate-100 pl-4">
                    <ul className="list-disc ml-4 space-y-1 text-sm text-slate-600 marker:text-slate-300">
                      {group.items.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. RACI Matrix */}
          <section>
             <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Scale size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">4. Decision Rights Matrix (RACI)</h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-3">Decision / Activity</th>
                    <th className="px-6 py-3 text-center">Steward</th>
                    <th className="px-6 py-3 text-center">Engineering</th>
                    <th className="px-6 py-3 text-center">DGC</th>
                    <th className="px-6 py-3 text-center">ELT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { activity: 'Approve new CDM Object', steward: 'R', eng: 'C', dgc: 'A', elt: 'I' },
                    { activity: 'Change Reporting Logic (DBT)', steward: 'R', eng: 'R', dgc: 'A', elt: 'I' },
                    { activity: 'Assign Data Stewards', steward: 'C', eng: 'I', dgc: 'A', elt: 'R' },
                    { activity: 'Dispute Resolution', steward: 'C', eng: 'C', dgc: 'R', elt: 'A' },
                    { activity: 'Approve Security Policy', steward: 'C', eng: 'C', dgc: 'R', elt: 'A' },
                    { activity: 'Approve Budget (> $X)', steward: 'I', eng: 'R', dgc: 'R', elt: 'A' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">{row.activity}</td>
                      <td className="px-6 py-3 text-center font-mono-data font-bold text-slate-700">{row.steward}</td>
                      <td className="px-6 py-3 text-center font-mono-data font-bold text-slate-700">{row.eng}</td>
                      <td className="px-6 py-3 text-center font-mono-data font-bold text-slate-700">{row.dgc}</td>
                      <td className="px-6 py-3 text-center font-mono-data font-bold text-slate-700">{row.elt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-slate-400 flex gap-4 justify-end">
              <span><strong>R</strong>: Responsible</span>
              <span><strong>A</strong>: Accountable</span>
              <span><strong>C</strong>: Consulted</span>
              <span><strong>I</strong>: Informed</span>
            </div>
          </section>

          {/* 5. Policies */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">5. Operating Policies</h2>
            </div>
            <div className="grid gap-6">
              <div className="border-l-4 border-amber-400 bg-amber-50/50 p-4 rounded-r-lg">
                <h3 className="font-bold text-slate-900 mb-2">5.1 The "Gold Standard" Rule</h3>
                <p className="text-sm text-slate-700 mb-3">
                  No data asset shall be used in Executive Reporting (Power BI) or External Financials until it is certified as <strong>"Gold"</strong> in the Durable Hub.
                </p>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> <strong>Silver:</strong> Cleaned, Iceberg, CDM standard.</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> <strong>Gold:</strong> Validated by Steward, DBT logic applied, documented.</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                   <h3 className="font-bold text-slate-900 mb-2">5.2 Change Management</h3>
                   <p className="text-sm text-slate-600 mb-2">Modifications to CDM Attributes require a <strong>Change Proposal</strong>.</p>
                   <ul className="text-sm text-slate-600 list-disc ml-4 space-y-1">
                     <li><strong>Minor:</strong> Approved by Steward.</li>
                     <li><strong>Major:</strong> (e.g. logic change) Requires DGC vote.</li>
                   </ul>
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 mb-2">5.3 Data Intake</h3>
                   <p className="text-sm text-slate-600 mb-2">New data must have a <strong>Definition Intake Form</strong>:</p>
                   <ul className="text-sm text-slate-600 list-disc ml-4 space-y-1">
                     <li>Business Definition & Owner</li>
                     <li>Security Level (PII)</li>
                     <li>Lineage Source -{'>'} Target</li>
                   </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Technology & Roadmap */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <Layers size={20} className="text-slate-400" /> Technology Alignment
              </h2>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Metadata & Discovery</span>
                   <span className="font-semibold text-slate-900">AWS Glue / DBT Docs</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Policy Enforcement</span>
                   <span className="font-semibold text-slate-900">Snowflake RBAC</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Lineage</span>
                   <span className="font-semibold text-slate-900">DBT + Confluent</span>
                </div>
              </div>
            </section>

             <section>
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-slate-400" /> Budget & Resources
              </h2>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Cloud Infra</span>
                   <span className="font-semibold text-slate-900">$30k - $75k / yr</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Tooling</span>
                   <span className="font-semibold text-slate-900">$7k - $15k / yr</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Personnel</span>
                   <span className="font-semibold text-slate-900">0.5 - 1.0 FTE</span>
                </div>
              </div>
            </section>
          </div>

          <section>
             <h2 className="font-bold text-slate-900 text-lg mb-4">Implementation Roadmap</h2>
             <div className="grid md:grid-cols-3 gap-4">
               {[
                 { phase: 'Phase 1: Foundation', time: 'Weeks 1-4', desc: 'Establish DGC, Charter, AWS/Snowflake basics. Pilot domain selection.' },
                 { phase: 'Phase 2: Pilot', time: 'Weeks 5-12', desc: 'Build MVP CDM. Gold status for Pilot. First Power BI dashboard.' },
                 { phase: 'Phase 3: Scale', time: 'Month 3+', desc: 'Onboard 2nd/3rd verticals. Formalize quarterly ELT reviews.' }
               ].map((p, i) => (
                 <div key={i} className="border border-slate-200 rounded-lg p-4">
                   <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{p.time}</div>
                   <h3 className="font-bold text-slate-900 text-sm mb-2">{p.phase}</h3>
                   <p className="text-xs text-slate-500">{p.desc}</p>
                 </div>
               ))}
             </div>
          </section>

          {/* Signatures */}
          <div className="pt-12 mt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-8 w-full md:w-auto">
               <div className="border-b border-slate-900 w-64"></div>
               <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">ELT Chair</div>
            </div>
            <div className="space-y-8 w-full md:w-auto">
               <div className="border-b border-slate-900 w-64"></div>
               <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">DGC Chair</div>
            </div>
          </div>

          {/* Appendix */}
          <div className="mt-12 bg-slate-50 rounded-xl p-8 border border-slate-200">
             <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Appendix: Governance Templates</h3>
             <div className="grid md:grid-cols-2 gap-8">
               <div>
                 <h4 className="font-bold text-slate-700 text-sm mb-2">A. Data Intake Form</h4>
                 <ul className="text-xs text-slate-500 list-disc ml-4 space-y-1 font-mono-data">
                   <li>Object Name</li>
                   <li>Business Definition</li>
                   <li>Source System</li>
                   <li>Owner/Steward</li>
                   <li>Sensitivity (PII)</li>
                   <li>Transformation Logic</li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-bold text-slate-700 text-sm mb-2">B. Change Proposal Form</h4>
                 <ul className="text-xs text-slate-500 list-disc ml-4 space-y-1 font-mono-data">
                   <li>Attribute Name</li>
                   <li>Proposed Change</li>
                   <li>Business Reason</li>
                   <li>Impact Analysis</li>
                   <li>Rollback Plan</li>
                 </ul>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Charter;
