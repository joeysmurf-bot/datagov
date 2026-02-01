
import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Sparkles, Database, FileText } from 'lucide-react';
import { CertificationLevel, DataObject } from '../types';

interface CdmListProps {
  onSelect: (id: string) => void;
}

const MOCK_CDM_OBJECTS: Partial<DataObject>[] = [
  { id: 'cdm-001', name: 'CDM_Sales_Order_Header', domain: 'Sales', certification: CertificationLevel.GOLD, attributes: { pii: 'Low', frequency: 'Real-time', classification: 'Internal' } },
  { id: 'cdm-002', name: 'CDM_Customer_Master', domain: 'Core', certification: CertificationLevel.GOLD, attributes: { pii: 'High', frequency: 'Daily', classification: 'Restricted' } },
  { id: 'cdm-003', name: 'CDM_Product_Catalog', domain: 'Operations', certification: CertificationLevel.SILVER, attributes: { pii: 'Low', frequency: 'Batch', classification: 'Internal' } },
  { id: 'cdm-004', name: 'CDM_Inventory_Level', domain: 'Operations', certification: CertificationLevel.GOLD, attributes: { pii: 'Low', frequency: 'Real-time', classification: 'Internal' } },
  { id: 'cdm-005', name: 'CDM_Vendor_Master', domain: 'Finance', certification: CertificationLevel.BRONZE, attributes: { pii: 'Medium', frequency: 'Monthly', classification: 'Internal' } },
  { id: 'cdm-006', name: 'CDM_Employee_Records', domain: 'HR', certification: CertificationLevel.GOLD, attributes: { pii: 'High', frequency: 'Near Real-time', classification: 'Highly Confidential' } },
];

const CdmList: React.FC<CdmListProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_CDM_OBJECTS.filter(obj => 
    obj.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    obj.domain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">CDM Registry</h2>
          <p className="text-slate-500">Browse and manage the Canonical Data Model objects in Durable Hub.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter CDM objects..." 
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Object Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Certification</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">PII</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((obj) => (
              <tr 
                key={obj.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onSelect(obj.id!)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block group-hover:text-blue-600 transition-colors font-mono-data">
                        {obj.name}
                      </span>
                      <span className="text-xs text-slate-400">{obj.attributes?.frequency} sync</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 font-medium">{obj.domain}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    obj.certification === CertificationLevel.GOLD ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    obj.certification === CertificationLevel.SILVER ? 'bg-slate-50 text-slate-700 border-slate-200' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {obj.certification === CertificationLevel.GOLD && <Sparkles size={10} className="mr-1" />}
                    {obj.certification}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold ${
                    obj.attributes?.pii === 'High' ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {obj.attributes?.pii}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Database size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No objects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CdmList;
