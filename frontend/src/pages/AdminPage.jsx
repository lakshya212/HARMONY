import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Users, Copy, Check, Key, AlertCircle, History } from 'lucide-react';

export default function AdminPage() {
  const { household, currentUser, demoUsers, switchUser } = useApp();
  const [copied, setCopied] = useState(false);

  const isAdmin = currentUser.role === 'admin';

  const copyInvite = () => {
    navigator.clipboard.writeText(household.invite_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Governance & Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Household configuration, invite code management, and membership controls.
          </p>
        </div>
      </div>

      {/* Role Notice */}
      {!isAdmin && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>
              You are currently viewing as <b>{currentUser.name}</b> (Role: Member). Elevated actions are restricted to Admin.
            </span>
          </div>
          <button
            onClick={() => switchUser('u1')}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold text-[11px]"
          >
            Switch to Lakshya (Admin)
          </button>
        </div>
      )}

      {/* Household Profile & Invite Code Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
          <Key className="w-5 h-5 text-blue-600" />
          <span>Household Credentials</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Household Name
            </label>
            <p className="font-bold text-slate-800 text-base">{household.name}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Roommate Invite Token
              </label>
              <p className="font-mono font-extrabold text-blue-700 text-xl tracking-wider">
                {household.invite_code}
              </p>
            </div>
            <button
              onClick={copyInvite}
              className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Member Roster */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>Household Roommate Roster (4 Members)</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {demoUsers.map((user) => (
            <div key={user.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {user.role.toUpperCase()}
                </span>
                {isAdmin && user.role !== 'admin' && (
                  <button
                    disabled
                    className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 rounded transition"
                    title="Administrative action"
                  >
                    Manage
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log (Viva Requirement for Administrative Accountability) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-600" />
          <span>Security & Activity Audit Log</span>
        </h3>
        
        <div className="space-y-2 text-xs">
          {[
            { id: 1, action: 'Household Space Registered', target: 'Green Residency (Flat 402)', time: '2026-10-01 10:00' },
            { id: 2, action: 'Member Joined via Token', target: 'Rahul Verma using GRN101', time: '2026-10-02 14:22' },
            { id: 3, action: 'Member Joined via Token', target: 'Aman Gupta using GRN101', time: '2026-10-02 15:05' },
            { id: 4, action: 'Member Joined via Token', target: 'Rohit Kumar using GRN101', time: '2026-10-03 11:30' },
            { id: 5, action: 'Master Bill Created', target: '₹2,400 Electricity Bill (4 Splits)', time: '2026-10-03 18:40' },
            { id: 6, action: 'Chore Completed', target: 'Deep Clean Kitchen (25 pts)', time: '2026-10-05 20:15' }
          ].map((log) => (
            <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center text-slate-600">
              <span><b>{log.action}:</b> {log.target}</span>
              <span className="text-slate-400 font-mono text-[11px]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
