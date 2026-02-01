
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Mail, 
  Lock, 
  Info, 
  RefreshCw, 
  Database,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { CertificationLevel, DataObject } from '../types';
import { askDataAssistant } from '../services/geminiService';

const SAMPLE_OBJECT: DataObject = {
  id: 'cdm-sales-001',
  name: 'CDM_Sales_Order_Header',
  domain: 'Sales',
  certification: CertificationLevel.GOLD,
  sla: 'Near Real Time',
  description: 'The canonical representation of a sales order, aggregated from JD Edwards and Salesforce. Used for quarterly financial reporting and provides a unified view of all sales transactions across the enterprise.',
  steward: {
    name: 'Sarah Jenkins',
    department: 'Finance Department',
    email: 's.jenkins@durablehub.com'
  },
  attributes: {
    pii: 'Low',
    frequency: 'Real-time (CDC)',
    classification: 'Internal Use'
  },
  schema: [
    { name: 'Order_ID', type: 'Varchar(50)', sourceField: 'JDE.F4211.SDDOCO', description: 'Unique identifier for the sales order.' },
    { name: 'Customer_Key', type: 'Integer', sourceField: 'SFDC.Account.Id', description: 'Foreign key to the Customer Master entity.' },
    { name: 'Net_Amount', type: 'Decimal(18,2)', sourceField: 'JDE.F4211.SDAEXP', description: 'Total net amount of the order in local currency.' },
    { name: 'Currency_Code', type: 'Char(3)', sourceField: 'JDE.F4211.SDCRCD', description: 'ISO currency code (e.g., USD, EUR).' },
    { name: 'Product_Sku', type: 'Char(9)', sourceField: 'JDE.F4801.WALITM', description: 'The standardized ID for the final item being produced.' },
    { name: 'Serial_ID', type: 'Integer', sourceField: 'JDE.F4801.WAWR03', description: 'The Sequence of WO for specific Product_SKU.' },
  ]
};

const ObjectDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('context');
  const [aiMessage, setAiMessage] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleAskAI = async () => {
    setIsAsking(true);
    const context = `Object: ${SAMPLE_OBJECT.name}. Description: ${SAMPLE_OBJECT.description}. Schema: ${JSON.stringify(SAMPLE_OBJECT.schema)}`;
    const result = await askDataAssistant("Explain the data quality implications of the source fields used here.", context);
    setAiMessage(result || "Error getting response.");
    setIsAsking(false);
  };

  return (
    <div className="space-y-6 w-full">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to search
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{SAMPLE_OBJECT.name}</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
              <Sparkles size={12} className="mr-1" /> {SAMPLE_OBJECT.certification}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              SLA: {SAMPLE_OBJECT.sla}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              Domain: {SAMPLE_OBJECT.domain}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
            <Search size={16} /> Request Access
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
            <Mail size={16} /> Contact Steward
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
            <ExternalLink size={16} /> View API
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <nav className="flex gap-8">
          {['Business Context', 'Technical Schema', 'Lineage', 'Sample Data'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              className={`pb-4 text-sm font-medium transition-colors relative ${
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'business-context' || activeTab === 'context' ? (
            <>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {SAMPLE_OBJECT.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">PII Sensitivity</p>
                    <p className="text-sm font-bold text-slate-900">{SAMPLE_OBJECT.attributes.pii}</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Safe</span>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Update Frequency</p>
                    <p className="text-sm font-bold text-slate-900">{SAMPLE_OBJECT.attributes.frequency}</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Classification</p>
                    <p className="text-sm font-bold text-slate-900">{SAMPLE_OBJECT.attributes.classification}</p>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'technical-schema' ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Field Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source Field</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-data text-xs">
                  {SAMPLE_OBJECT.schema.map((field, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{field.name}</td>
                      <td className="px-6 py-4 text-slate-500">{field.type}</td>
                      <td className="px-6 py-4 text-blue-600">{field.sourceField}</td>
                      <td className="px-6 py-4 text-slate-600 font-sans">{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'lineage' ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-8">
                
                {/* Node 1: Source */}
                <div className="w-full lg:w-48 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center flex flex-col items-center">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Source</p>
                   <p className="text-xs font-mono-data font-bold text-slate-900 mt-1 break-words w-full">Oracle JDE (F4801)</p>
                </div>

                {/* Connector 1 */}
                <div className="hidden lg:block text-slate-300">
                  <ArrowRight size={24} />
                </div>
                <div className="lg:hidden text-slate-300">
                  <ArrowDown size={24} />
                </div>

                {/* Node 2: Kafka Inputs */}
                <div className="w-full lg:w-64 p-4 bg-orange-50 border border-orange-100 rounded-lg text-center flex flex-col items-center">
                   <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-2">Kafka Input Topics</p>
                   <div className="flex flex-col gap-2 w-full">
                     <div className="bg-white/60 rounded px-2 py-1">
                       <p className="text-[10px] font-mono-data font-bold text-slate-900 break-all">JDE.PRODDTA.F4801</p>
                     </div>
                     <div className="bg-white/60 rounded px-2 py-1">
                       <p className="text-[10px] font-mono-data font-bold text-slate-900 break-all">JDE.PRODDTA.F3112</p>
                     </div>
                     <div className="bg-white/60 rounded px-2 py-1">
                       <p className="text-[10px] font-mono-data font-bold text-slate-900 break-all leading-tight">Sharepoint_Prod_BIProjects_EstCompletion_By_ProdCat</p>
                     </div>
                     <div className="bg-white/60 rounded px-2 py-1">
                       <p className="text-[10px] font-mono-data font-bold text-slate-900 break-all">cdm_item_master</p>
                     </div>
                   </div>
                </div>

                {/* Connector 2 */}
                <div className="hidden lg:block text-slate-300">
                   <ArrowRight size={24} />
                </div>
                <div className="lg:hidden text-slate-300">
                   <ArrowDown size={24} />
                </div>

                {/* Node 3: Flink */}
                <div className="w-full lg:w-48 p-4 bg-purple-50 border border-purple-100 rounded-lg text-center flex flex-col items-center">
                   <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Flink Job</p>
                   <p className="text-[10px] font-mono-data font-bold text-slate-900 mt-1 break-all w-full">cdmwo-e3daf7cd-1c06-4c73-8acd-c58af1fe591f</p>
                </div>

                {/* Connector 3 */}
                <div className="hidden lg:block text-slate-300">
                   <ArrowRight size={24} />
                </div>
                <div className="lg:hidden text-slate-300">
                   <ArrowDown size={24} />
                </div>

                {/* Node 4: Target */}
                <div className="w-full lg:w-48 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-center flex flex-col items-center">
                   <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Kafka Topic</p>
                   <p className="text-xs font-mono-data font-bold text-slate-900 mt-1 break-words w-full">cdm_work_order</p>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden">
               <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                   <span className="ml-2 text-xs font-bold text-slate-400 font-mono-data">payload_preview.json</span>
                 </div>
                 <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Copy JSON</button>
               </div>
               <div className="p-6 overflow-x-auto">
                 <pre className="font-mono-data text-xs text-emerald-400 leading-relaxed">
{`{
  "wo_type": {
    "string": "WO"
  },
  "company": {
    "string": "05000"
  },
  "business_unit": {
    "string": "213"
  },
  "product_sku": {
    "string": "272130001"
  },
  "serial_id": {
    "string": "009"
  },
  "wo_status": {
    "string": "45"
  },
  "vin": {
    "string": "1GR1A902XVE900010"
  },
  "sched_date_400": {
    "int": 20459
  },
  "start_date_400": {
    "int": 20459
  },
  "end_date_800": null,
  "product_model": {
    "string": "ECL"
  },
  "est_completion_date": {
    "int": 20487
  }
}`}
                 </pre>
               </div>
            </div>
          )}

          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <Sparkles className="text-indigo-600" size={18} />
                   <h4 className="font-bold text-indigo-900">AI Data Assistant</h4>
                </div>
                <button 
                  onClick={handleAskAI}
                  disabled={isAsking}
                  className="text-xs font-bold text-indigo-700 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {isAsking ? 'Thinking...' : 'Analyze Health'}
                </button>
             </div>
             {aiMessage ? (
               <div className="prose prose-sm text-indigo-800 max-w-none bg-white/50 p-4 rounded-lg border border-indigo-100">
                  {aiMessage}
               </div>
             ) : (
               <p className="text-xs text-indigo-600">Ask Gemini to analyze lineage risks or explain transformation logic for this entity.</p>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Data Steward</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <span className="font-bold text-lg">SJ</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{SAMPLE_OBJECT.steward.name}</p>
                <p className="text-xs text-slate-500">{SAMPLE_OBJECT.steward.department}</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={16} /> Send Message
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quality Score</h3>
             <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                      Excellent
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-emerald-600">
                      94%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                  <div style={{ width: "94%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                </div>
             </div>
             <p className="text-[10px] text-slate-400">Based on completeness, accuracy, and timeliness metrics across 4 sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetail;
