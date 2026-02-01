
import React from 'react';
import { 
  Search, 
  LayoutDashboard, 
  Database, 
  GitBranch, 
  ShieldCheck, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Boxes,
  Lock
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMinimized: boolean;
  toggleMinimize: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMinimized, toggleMinimize }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'cdm-list', label: 'CDM Objects', icon: Boxes },
    { id: 'domains-list', label: 'Domains', icon: Database },
    { id: 'lineage', label: 'Data Lineage', icon: GitBranch },
    { id: 'council', label: 'Governance Council', icon: ShieldCheck },
  ];

  return (
    <div className={`${isMinimized ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 z-30`}>
      <div className={`p-6 flex items-center ${isMinimized ? 'justify-center' : 'gap-3'}`}>
        <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <Database className="text-white" size={24} />
        </div>
        {!isMinimized && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-slate-900 text-lg leading-tight">DataGov</h1>
            <p className="text-xs text-slate-500">Durable Hub</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {!isMinimized && (
          <p className="px-2 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider overflow-hidden whitespace-nowrap">Discovery</p>
        )}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            title={isMinimized ? item.label : undefined}
            className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === item.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={18} className="shrink-0" />
            {!isMinimized && <span className="overflow-hidden whitespace-nowrap">{item.label}</span>}
          </button>
        ))}

        <div className="pt-8">
          {!isMinimized && (
            <p className="px-2 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider overflow-hidden whitespace-nowrap">Configuration</p>
          )}
          <button
            onClick={() => setView('admin')}
            title={isMinimized ? "Admin Console" : undefined}
            className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'admin' 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Lock size={18} className="shrink-0" />
            {!isMinimized && <span className="overflow-hidden whitespace-nowrap">Admin Console</span>}
          </button>
          <button
            onClick={() => setView('dashboard')}
            title={isMinimized ? "Settings" : undefined}
            className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mt-1`}
          >
            <Settings size={18} className="shrink-0" />
            {!isMinimized && <span className="overflow-hidden whitespace-nowrap">Settings</span>}
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 flex flex-col items-center gap-4">
        {!isMinimized && (
          <div className="flex items-center gap-2 px-2 py-1 w-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
            <span className="text-[11px] font-medium text-slate-500 overflow-hidden whitespace-nowrap">API Online</span>
          </div>
        )}
        <button 
          onClick={toggleMinimize}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
