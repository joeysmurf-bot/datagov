
import React from 'react';
import { Database, GitBranch, AlertCircle, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity } from '../types';

const dataQuality = [
  { name: 'Customer', score: 94 },
  { name: 'Sales', score: 87 },
  { name: 'Marketing', score: 76 },
  { name: 'Finance', score: 91 },
  { name: 'Operations', score: 83 },
];

const recentActivity: Activity[] = [
  { id: '1', type: 'Schema updated', asset: 'customer_orders', user: 'John Smith', timestamp: '2 hours ago', status: 'Validated' },
  { id: '2', type: 'New data source added', asset: 'marketing_analytics', user: 'Sarah Chen', timestamp: '4 hours ago', status: 'Pending' },
  { id: '3', type: 'Lineage documented', asset: 'sales_pipeline', user: 'Mike Johnson', timestamp: '6 hours ago', status: 'Validated' },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="flex items-center gap-1">
      <span className={`text-xs font-semibold ${change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
        {change}
      </span>
      <span className="text-xs text-slate-400">vs last month</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Overview of your data governance metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Data Assets" value="2,847" change="+12%" icon={Database} color="bg-blue-50 text-blue-600" />
        <StatCard title="Active CDM Objects" value="8" change="2 pending review" icon={Layers} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Lineage Connections" value="1,234" change="+8%" icon={GitBranch} color="bg-sky-50 text-sky-600" />
        <StatCard title="Data Issues" value="23" change="-5%" icon={AlertCircle} color="bg-rose-50 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">{item.type}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-blue-600 font-mono-data">{item.asset}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{item.user}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Validated' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Data Quality by Domain</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataQuality} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                  {dataQuality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 90 ? '#10b981' : entry.score > 80 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
