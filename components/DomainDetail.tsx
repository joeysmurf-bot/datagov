
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Database, 
  Boxes, 
  FileText, 
  BarChart3, 
  Cpu, 
  AlertCircle, 
  Plus, 
  ExternalLink,
  MessageSquare,
  Clock,
  ShieldAlert,
  Server
} from 'lucide-react';
import { FreshserviceTicket, DomainAsset } from '../types';

interface DomainDetailProps {
  domainId: string;
  onBack: () => void;
  onSelectAsset?: (id: string) => void;
}

const MOCK_TICKETS: FreshserviceTicket[] = [
  { id: 'SR-57159', subject: 'Change report with new page : Power BI Request', requester: 'Pam Whitman', state: 'Response Due', status: 'Open', priority: 'Medium', openedAt: '5 days ago' },
  { id: 'SR-57130', subject: 'Update Dataset with new Data', requester: 'Mike Jones', state: 'Response Due', status: 'Open', priority: 'Medium', openedAt: '6 days ago' },
  { id: 'SR-57099', subject: 'Hendrickson axle serials - Customer', requester: 'Fred Jones', state: '-', status: 'Waiting', priority: 'Low', openedAt: '12 days ago' },
];

const PRIORITIZED_REQUESTS = [
  { id: 'PR-102', description: 'Extend CDM_Customer with Salesforce Account Tiers', priority: 1, requester: 'Sarah Chen', status: 'Building' },
  { id: 'PR-105', description: 'New Dashboard: Real-time Sales Pipeline Metrics', priority: 2, requester: 'Mike Ross', status: 'Planning' },
  { id: 'PR-110', description: 'JDE Inventory Levels - FTP Sync Optimization', priority: 4, requester: 'Alice Wong', status: 'In Review' },
];

const ASSETS: DomainAsset[] = [
  { id: 'cdm-sales-001', name: 'CDM_Sales_Order_Header', type: 'CDM', status: 'Active' },
  { id: 'a2', name: 'Salesforce CRM', type: 'Source System', platform: 'Salesforce', status: 'Connected' },
  { id: 'a3', name: 'Oracle JDE World', type: 'Source System', platform: 'JDE', status: 'Connected' },
  { id: 'a4', name: 'Sales_Performance_Q4', type: 'Report', platform: 'Power BI', status: 'Published' },
  { id: 'a5', name: 'Customer_Churn_Predictor', type: 'AI Model', platform: 'Vertex AI', status: 'Staging' },
  { id: 'a6', name: 'Global_Accounts_Master', type: 'Dataset', platform: 'BigQuery', status: 'Gold' },
];

const DomainDetail: React.FC<DomainDetailProps> = ({ domainId, onBack, onSelectAsset }) => {
  const [activeTab, setActiveTab] = useState('assets');

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Urgent': return 'bg-rose-100 text-rose-700';
      case 'High': return 'bg-amber-100 text-amber-700';
      case 'Medium': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Domains
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Sales & Marketing</h2>
          <p className="text-slate-500 mt-1">Strategic oversight of revenue-generating data assets and customer insights.</p>
          <div className="flex gap-4 mt-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <Database size={14} className="text-blue-600" />
                <span className="text-xs font-bold text-slate-700">42 Assets</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <AlertCircle size={14} className="text-rose-600" />
                <span className="text-xs font-bold text-slate-700">3 Open Issues</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[280px]">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
            SJ
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Domain Steward</p>
            <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
            <div className="flex gap-2 mt-1">
              <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Email Steward">
                <MessageSquare size={14} />
              </button>
              <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="View Profile">
                <Users size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <nav className="flex gap-8">
          {['Assets', 'Open Issues', 'Prioritized Requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.toLowerCase().replace(' ', '-') 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase().replace(' ', '-') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'assets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASSETS.map((asset) => (
              <div 
                key={asset.id} 
                className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group ${asset.type === 'CDM' ? 'cursor-pointer hover:shadow-md' : ''}`}
                onClick={() => {
                  if (asset.type === 'CDM' && onSelectAsset) {
                    onSelectAsset(asset.id);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${
                    asset.type === 'CDM' ? 'bg-amber-50 text-amber-600' :
                    asset.type === 'Source System' ? 'bg-indigo-50 text-indigo-600' :
                    asset.type === 'Report' ? 'bg-blue-50 text-blue-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {asset.type === 'CDM' ? <Boxes size={20} /> :
                     asset.type === 'Source System' ? <Server size={20} /> :
                     asset.type === 'Report' ? <BarChart3 size={20} /> :
                     <Cpu size={20} />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.type}</span>
                </div>
                <h4 className={`font-bold text-slate-900 font-mono-data text-sm transition-colors ${asset.type === 'CDM' ? 'group-hover:text-blue-600 underline decoration-dotted underline-offset-4' : ''}`}>
                  {asset.name}
                </h4>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-500 font-medium">{asset.status}</span>
                   </div>
                   {asset.platform && <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">{asset.platform}</span>}
                </div>
              </div>
            ))}
            <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all gap-2">
              <Plus size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">Register New Asset</span>
            </button>
          </div>
        )}

        {activeTab === 'open-issues' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-500">Active tickets tracked in Freshservice for this domain.</p>
              <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-xs font-bold shadow-sm">
                <ShieldAlert size={14} /> Open Issue Ticket
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject & ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Requester</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_TICKETS.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</span>
                          <span className="text-[11px] text-slate-400 font-mono-data mt-0.5">#{ticket.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                              {ticket.requester.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-slate-700">{ticket.requester}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         {ticket.state !== '-' ? (
                           <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider border border-rose-100">
                             {ticket.state}
                           </span>
                         ) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{ticket.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${ticket.priority === 'High' ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
                          <span className="text-sm text-slate-700">{ticket.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs text-slate-400 flex items-center justify-end gap-1">
                          <Clock size={12} /> {ticket.openedAt}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'prioritized-requests' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-500">Planned build-out of new data assets and analytics for this domain.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Request Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Requested By</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PRIORITIZED_REQUESTS.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                          {req.priority}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900">{req.description}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{req.requester}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          req.status === 'Building' ? 'bg-emerald-100 text-emerald-700' : 
                          req.status === 'Planning' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainDetail;
