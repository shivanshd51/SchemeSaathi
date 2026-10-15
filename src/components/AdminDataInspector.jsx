import React, { useState } from 'react';
import { Database, Plus, Copy, Check, Download, AlertTriangle, ShieldCheck, Code, Layers } from 'lucide-react';

export default function AdminDataInspector({ 
  schemes, 
  onAddScheme,
  language 
}) {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('schema'); // 'schema', 'json', 'add'
  
  // New Scheme Form State
  const [newScheme, setNewScheme] = useState({
    id: `scheme-${Date.now()}`,
    title: '',
    shortDescription: '',
    category: 'Government Schemes',
    targetAudience: '',
    state: 'Maharashtra',
    district: 'Pune',
    isVerified: true,
    lastCheckedDate: new Date().toISOString().split('T')[0],
    officialSourceUrl: 'https://',
    responsibleDepartment: '',
    contactDetails: '',
    benefitSummary: '',
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(schemes, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schemes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `schemesaathi_schemes_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCreateScheme = (e) => {
    e.preventDefault();
    if (!newScheme.title || !newScheme.shortDescription) return;

    const formattedScheme = {
      ...newScheme,
      pilotLocation: {
        state: newScheme.state,
        district: newScheme.district,
        scope: `${newScheme.district} District Pilot`
      },
      verificationStatus: newScheme.isVerified ? "Verified Government Record" : "Sample / Demo Record (Unverified)",
      matchRules: {
        minAge: 18,
        maxAge: 35,
        occupations: ["student", "job-seeking"],
        states: [newScheme.state],
        categories: [newScheme.category]
      },
      whyMatchedReason: `Matches criteria for ${newScheme.category} in ${newScheme.district}.`,
      eligibilityCriteria: {
        confirmed: ["Applicant meets residency and baseline criteria as published."],
        userShouldVerify: ["Confirm exact quota and fee reimbursement rules with department."]
      },
      documents: [
        { id: `doc-id-${Date.now()}`, name: "Valid Photo ID Proof", isMandatory: true, status: "Official Requirement", tip: "Government issued identity proof" },
        { id: `doc-inc-${Date.now()}`, name: "Income / Category Certificate", isMandatory: false, status: "Check with office", tip: "If claiming quota or fee waiver" }
      ],
      applicationSteps: [
        {
          stepNumber: 1,
          title: "Portal Registration",
          action: `Register on the official portal (${newScheme.officialSourceUrl})`,
          notes: "Verify mobile OTP",
          officialPortalLink: newScheme.officialSourceUrl
        }
      ]
    };

    onAddScheme(formattedScheme);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveSubTab('json');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-leaf-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                Data Architecture & Admin Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-950">
              Scheme Catalogue Management
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Inspect the structured schema, export JSON records, or replace sample demo entries with verified government circulars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 hover:bg-cream-100 text-xs font-bold text-ink-800 flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-leaf-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-4 py-2 rounded-xl bg-ink-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition shadow-soft"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Schema JSON</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-cream-200 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveSubTab('schema')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeSubTab === 'schema' ? 'bg-leaf-600 text-white' : 'bg-cream-100 text-ink-700 hover:bg-cream-200'
            }`}
          >
            Schema Specification
          </button>
          <button
            onClick={() => setActiveSubTab('json')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeSubTab === 'json' ? 'bg-leaf-600 text-white' : 'bg-cream-100 text-ink-700 hover:bg-cream-200'
            }`}
          >
            Live JSON Database ({schemes.length} records)
          </button>
          <button
            onClick={() => setActiveSubTab('add')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
              activeSubTab === 'add' ? 'bg-leaf-600 text-white' : 'bg-cream-100 text-ink-700 hover:bg-cream-200'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span>Add / Edit Scheme</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SCHEMA SPECIFICATION */}
      {activeSubTab === 'schema' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-6">
          <h2 className="text-lg font-bold text-ink-950">
            Admin-Friendly Scheme Data Model
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Every scheme in SchemeSaathi conforms to this strict, auditable schema. Field workers and administrators can update records without altering application code:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-cream-300 bg-cream-50 text-ink-900 font-bold">
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Purpose & Trust Constraint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 text-ink-700">
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">title</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">string</td>
                  <td className="py-2 px-3">Official scheme title as published in government gazette or department portal.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">pilotLocation</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">object</td>
                  <td className="py-2 px-3">State, district, and jurisdiction scope (e.g. Pune District Pilot vs Central).</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">targetAudience</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">string</td>
                  <td className="py-2 px-3">Target demographics (Students, First-time Job Seekers, Women Entrepreneurs).</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">eligibilityCriteria</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">object</td>
                  <td className="py-2 px-3">Strictly split into <code>confirmed</code> criteria and <code>userShouldVerify</code> items.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">documents</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">array</td>
                  <td className="py-2 px-3">Checklist items marked with <code>isMandatory</code> and plain-language guidance.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">applicationSteps</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">array</td>
                  <td className="py-2 px-3">Numbered phases with direct official URLs and practical tips.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">officialSourceUrl</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">string (URL)</td>
                  <td className="py-2 px-3">Mandatory verified government link ending in .gov.in or .nic.in.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">lastCheckedDate</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">string (ISO Date)</td>
                  <td className="py-2 px-3">Auditable date when the scheme was last verified with government circulars.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-ink-900">isVerified</td>
                  <td className="py-2 px-3 font-mono text-leaf-700">boolean</td>
                  <td className="py-2 px-3">True if verified official government data; False if clearly labeled demo entry.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-leaf-50 rounded-2xl border border-leaf-200 text-xs text-leaf-900">
            <strong>Where to update data in production:</strong> Edit <code className="bg-white px-1.5 py-0.5 rounded border border-leaf-200">src/data/schemes.js</code> or connect an authenticated Supabase / Headless CMS API endpoint using the matching schema format.
          </div>
        </div>
      )}

      {/* TAB 2: LIVE JSON VIEWER */}
      {activeSubTab === 'json' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ink-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-leaf-600" />
              <span>Current In-Memory Scheme Database (JSON)</span>
            </h2>
            <span className="text-xs text-ink-500">
              {schemes.length} schemes loaded
            </span>
          </div>

          <pre className="bg-ink-950 text-leaf-200 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-96 border border-ink-800">
            {JSON.stringify(schemes, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 3: ADD SCHEME FORM */}
      {activeSubTab === 'add' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft">
          <h2 className="text-lg font-bold text-ink-950 mb-2">
            Add or Verify a Scheme Entry
          </h2>
          <p className="text-xs text-ink-600 mb-6">
            Add a new entry to the live pilot database. If real verified government data is not ready, make sure to set Verification to "Demo / Sample Entry".
          </p>

          {formSuccess ? (
            <div className="p-6 bg-leaf-50 rounded-2xl border border-leaf-200 text-center text-xs text-leaf-800">
              <Check className="w-8 h-8 text-leaf-600 mx-auto mb-2" />
              <p className="font-bold text-sm">Scheme Added to In-Memory Database!</p>
              <p className="mt-1">Switching to JSON view...</p>
            </div>
          ) : (
            <form onSubmit={handleCreateScheme} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">Scheme Title *</label>
                  <input
                    type="text"
                    required
                    value={newScheme.title}
                    onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
                    placeholder="e.g. Pune District Youth Technical Apprenticeship Grant"
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white focus:ring-2 focus:ring-leaf-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">Category *</label>
                  <select
                    value={newScheme.category}
                    onChange={(e) => setNewScheme({ ...newScheme, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white focus:ring-2 focus:ring-leaf-500 font-medium"
                  >
                    <option value="Government Schemes">Government Schemes</option>
                    <option value="Startup/Entrepreneurship">Startup/Entrepreneurship</option>
                    <option value="Skill & Employment">Skill & Employment</option>
                    <option value="AI & Digital">AI & Digital</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-ink-800 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newScheme.shortDescription}
                  onChange={(e) => setNewScheme({ ...newScheme, shortDescription: e.target.value })}
                  placeholder="Summarize benefit and who it helps in plain language..."
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-white focus:ring-2 focus:ring-leaf-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={newScheme.targetAudience}
                    onChange={(e) => setNewScheme({ ...newScheme, targetAudience: e.target.value })}
                    placeholder="e.g. College Students (18-25)"
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">District</label>
                  <input
                    type="text"
                    value={newScheme.district}
                    onChange={(e) => setNewScheme({ ...newScheme, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">State</label>
                  <input
                    type="text"
                    value={newScheme.state}
                    onChange={(e) => setNewScheme({ ...newScheme, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">Official Source URL *</label>
                  <input
                    type="url"
                    required
                    value={newScheme.officialSourceUrl}
                    onChange={(e) => setNewScheme({ ...newScheme, officialSourceUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink-800 mb-1">Responsible Department</label>
                  <input
                    type="text"
                    value={newScheme.responsibleDepartment}
                    onChange={(e) => setNewScheme({ ...newScheme, responsibleDepartment: e.target.value })}
                    placeholder="e.g. Department of Higher & Technical Education"
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-white"
                  />
                </div>
              </div>

              {/* Verification Toggle */}
              <div className="p-3.5 bg-cream-50 rounded-xl border border-cream-200">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-ink-900">
                  <input
                    type="checkbox"
                    checked={newScheme.isVerified}
                    onChange={(e) => setNewScheme({ ...newScheme, isVerified: e.target.checked })}
                    className="rounded text-leaf-600 focus:ring-leaf-500"
                  />
                  <span>Mark as "Verified Government Scheme" (Checked against official circulars)</span>
                </label>
                <p className="text-[11px] text-ink-500 mt-1 pl-5">
                  If unchecked, this scheme will be clearly badged as a demo/sample entry to preserve trust rules.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold shadow-soft transition"
                >
                  Save Scheme to Database
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
