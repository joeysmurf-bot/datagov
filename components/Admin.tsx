
import React, { useState } from 'react';
import { Plus, Settings, Users, Shield, Save, Trash2, Edit2, CheckCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assets');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Console</h2>
        <p className="text-slate-500">Manage platform configuration, user roles, and data asset registrations.</p>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { id: 'assets', label: 'Asset Registry', icon: Shield },
          { id: 'domains', label: 'Domains', icon: Settings },
          { id: 'users', label: 'User Roles', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Manage Registered Assets</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-bold">
                <Plus size={14} /> New CDM Object
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'CDM_Sales_Order_Header', steward: 'Sarah Jenkins', lastUpdate: '2h ago' },
                { name: 'CDM_Customer_Master', steward: 'John Smith', lastUpdate: '1d ago' },
                { name: 'CDM_Inventory_Level', steward: 'Sarah Jenkins', lastUpdate: '5h ago' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-mono-data">{item.name}</p>
                      <p className="text-xs text-slate-400">Steward: {item.steward} • Updated {item.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Asset Indexing</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle size={12} /> Optimized
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Steward Coverage</span>
                <span className="text-xs font-bold text-slate-900">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Pipeline Latency</span>
                <span className="text-xs font-bold text-slate-900">14ms</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <Save size={16} /> Save Configuration
            </button>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg">
             <h4 className="font-bold mb-2">Governance Alert</h4>
             <p className="text-xs text-blue-100 leading-relaxed mb-4">
               There are 4 new certification requests pending review by the Governance Council.
             </p>
             <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
               Review Pending Requests
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
