
import React, { useState } from 'react';
import { Search, Users, Layers, Boxes, AlertCircle, ChevronRight, Filter, Database } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  steward: {
    name: string;
    email: string;
  };
  datasetCount: number;
  cdmCount: number;
  openIssues: number;
  qualityScore: number;
}

const MOCK_DOMAINS: Domain[] = [
  { id: 'dom-01', name: 'Sales & Marketing', steward: { name: 'Sarah Jenkins', email: 's.jenkins@durablehub.com' }, datasetCount: 42, cdmCount: 12, openIssues: 3, qualityScore: 94 },
  { id: 'dom-02', name: 'Operations', steward: { name: 'John Smith', email: 'j.smith@durablehub.com' }, datasetCount: 89, cdmCount: 8, openIssues: 1, qualityScore: 98 },
  { id: 'dom-03', name: 'Supply Chain', steward: { name: 'Mike Johnson', email: 'm.johnson@durablehub.com' }, datasetCount: 256, cdmCount: 15, openIssues: 12, qualityScore: 78 },
  { id: 'dom-04', name: 'Finance', steward: { name: 'Emma Wilson', email: 'e.wilson@durablehub.com' }, datasetCount: 112, cdmCount: 6, openIssues: 0, qualityScore: 96 },
  { id: 'dom-05', name: 'Human Resources', steward: { name: 'David Lee', email: 'd.lee@durablehub.com' }, datasetCount: 45, cdmCount: 4, openIssues: 2, qualityScore: 88 },
  { id: 'dom-06', name: 'Marketing Analytics', steward: { name: 'Lisa Chen', email: 'l.chen@durablehub.com' }, datasetCount: 18, cdmCount: 4, openIssues: 7, qualityScore: 82 },
  { id: 'dom-07', name: 'Engineering', steward: { name: 'Lisa Chen', email: 'l.chen@durablehub.com' }, datasetCount: 98, cdmCount: 9, openIssues: 1, qualityScore: 92 },
];

const DomainList: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_DOMAINS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.steward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Data Domains</h2>
          <p className="text-slate-500">Strategic oversight of data assets grouped by business function.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter domains..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Steward</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assets</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">CDM Objects</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Open Issues</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quality Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((domain) => (
                <tr 
                  key={domain.id} 
                  className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => onSelect(domain.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Layers size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{domain.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700 font-medium">{domain.steward.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono-data">{domain.steward.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Database size={14} className="text-slate-400" />
                      <span className="text-sm font-semibold">{domain.datasetCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Boxes size={14} className="text-slate-400" />
                      <span className="text-sm font-semibold">{domain.cdmCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      domain.openIssues > 5 ? 'bg-rose-100 text-rose-700' : 
                      domain.openIssues > 0 ? 'bg-amber-100 text-amber-700' : 
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      <AlertCircle size={10} />
                      {domain.openIssues}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[100px] flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            domain.qualityScore > 90 ? 'bg-emerald-500' : 
                            domain.qualityScore > 80 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${domain.qualityScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{domain.qualityScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 group-hover:text-blue-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DomainList;
