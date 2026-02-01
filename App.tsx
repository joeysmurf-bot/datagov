
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ObjectDetail from './components/ObjectDetail';
import CdmList from './components/CdmList';
import DomainList from './components/DomainList';
import DomainDetail from './components/DomainDetail';
import Admin from './components/Admin';
import GovernanceCouncil from './components/GovernanceCouncil';
import Charter from './components/Charter';
import PolicyDetail from './components/PolicyDetail';
import { ViewState } from './types';
import { Bell, Search, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const handleSelectObject = (id: string) => {
    setSelectedObjectId(id);
    setCurrentView('detail');
  };

  const handleSelectDomain = (id: string) => {
    setSelectedDomainId(id);
    setCurrentView('domain-detail');
  };

  const handleSelectPolicy = (id: string) => {
    setSelectedPolicyId(id);
    setCurrentView('policy-detail');
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'cdm-list':
        return <CdmList onSelect={handleSelectObject} />;
      case 'domains-list':
        return <DomainList onSelect={handleSelectDomain} />;
      case 'domain-detail':
        return <DomainDetail 
          domainId={selectedDomainId || ''} 
          onBack={() => setCurrentView('domains-list')}
          onSelectAsset={handleSelectObject}
        />;
      case 'council':
        return <GovernanceCouncil 
          onViewCharter={() => setCurrentView('charter')} 
          onSelectPolicy={handleSelectPolicy}
        />;
      case 'charter':
        return <Charter onBack={() => setCurrentView('council')} />;
      case 'policy-detail':
        return <PolicyDetail policyId={selectedPolicyId || ''} onBack={() => setCurrentView('council')} />;
      case 'admin':
        return <Admin />;
      case 'search':
        return <CdmList onSelect={handleSelectObject} />;
      case 'detail':
        return <ObjectDetail onBack={() => setCurrentView('cdm-list')} />;
      default:
        return (
          <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
            <h2 className="text-xl font-medium mb-2">{currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')} view coming soon</h2>
            <p>This module is currently being built based on the governance roadmap.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        setView={(v) => {
          setCurrentView(v);
          setSelectedObjectId(null);
          setSelectedDomainId(null);
          setSelectedPolicyId(null);
        }} 
        isMinimized={isSidebarMinimized}
        toggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
      />
      
      <main className={`flex-1 ${isSidebarMinimized ? 'ml-20' : 'ml-64'} p-8 transition-all duration-300`}>
        <header className="flex justify-between items-center mb-8 sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm py-4">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data assets, schemas, tables..." 
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                <Bell size={20} />
              </button>
              <div className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-50"></div>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Lead Data Steward</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                SJ
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
