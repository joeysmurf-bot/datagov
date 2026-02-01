
import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Lock, Clock, Shield } from 'lucide-react';

interface PolicyDetailProps {
  policyId: string;
  onBack: () => void;
}

const MOCK_POLICIES: Record<string, any> = {
  'pol-001': {
    name: 'Kafka Raw Ingest Retention',
    status: 'Compliant',
    lastAudit: '2 days ago',
    owner: 'Infrastructure Team',
    description: 'Defines the storage duration and lifecycle management for raw event streams ingested via Kafka before transformation into the CDM.',
    rules: [
      { rule: 'Retention Period', value: '7 Days', description: 'Raw topics must expire data after 7 days to manage storage costs and enforce T+1 processing.' },
      { rule: 'Replication Factor', value: 'Min 3', description: 'All production topics must be replicated across at least 3 brokers.' },
      { rule: 'Compression', value: 'Snappy', description: 'Producers must use Snappy compression for network efficiency.' }
    ]
  },
  'pol-002': {
    name: 'CDM Financials Retention',
    status: 'Compliant',
    lastAudit: '1 month ago',
    owner: 'Finance Dept',
    description: 'Governance standards for long-term storage of certified financial records used in regulatory reporting.',
    rules: [
      { rule: 'Retention Period', value: '7 Years', description: 'Legal requirement for audit trail maintenance.' },
      { rule: 'Immutability', value: 'WORM Storage', description: 'Records must be stored in Write Once Read Many object storage.' },
      { rule: 'Access Control', value: 'Role Based', description: 'Access restricted to "Finance_Auditor" IAM group.' }
    ]
  },
  'pol-003': {
    name: 'PII Data Masking',
    status: 'Review Needed',
    lastAudit: 'Yesterday',
    owner: 'Security Council',
    description: 'Mandatory masking and tokenization rules for Personally Identifiable Information across all environments.',
    rules: [
      { rule: 'Email Addresses', value: 'Masked', description: 'Must be masked as x***@domain.com in non-production environments.' },
      { rule: 'SSN / Tax ID', value: 'Tokenized', description: 'Must be replaced with a deterministic token in all analytics layers.' },
      { rule: 'Right to be Forgotten', value: '30 Days', description: 'System must support purging of user data within 30 days of request.' }
    ]
  }
};

const PolicyDetail: React.FC<PolicyDetailProps> = ({ policyId, onBack }) => {
  const policy = MOCK_POLICIES[policyId] || MOCK_POLICIES['pol-001'];
  const isCompliant = policy.status === 'Compliant';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Policies
      </button>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isCompliant 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                {isCompliant ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                {policy.status}
              </span>
              <span className="text-xs text-slate-400 font-mono-data">#{policyId.toUpperCase()}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{policy.name}</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-end">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Last Audit</span>
              <span className="font-semibold text-slate-700">{policy.lastAudit}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Owner</span>
              <span className="font-semibold text-slate-700">{policy.owner}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" /> Description
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {policy.description}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield size={16} className="text-blue-600" /> Enforcement Rules
            </h3>
            <div className="grid gap-4">
              {policy.rules.map((rule: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="md:w-1/3">
                    <p className="font-bold text-slate-900 text-sm">{rule.rule}</p>
                    <p className="font-mono-data text-xs text-blue-600 mt-1">{rule.value}</p>
                  </div>
                  <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-4">
                    <p className="text-sm text-slate-600">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start gap-4">
            <Lock className="text-blue-600 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">Automated Compliance</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                This policy is enforced via Infrastructure-as-Code (Terraform) and Durable Hub Data Contracts. 
                Violations will block deployment pipelines automatically.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;
