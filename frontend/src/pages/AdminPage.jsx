import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users, Copy, Check, Key, AlertCircle, Trash2 } from 'lucide-react';

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
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Flat Settings & Governance
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage flatmates, invite codes, and group permissions.
        </p>
      </div>

      {/* Role Notice */}
      {!isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>
              You are currently viewing as <strong>{currentUser.name}</strong> (Member). Admin controls belong to Lakshya.
            </span>
          </div>
          <button
            onClick={() => switchUser('u1')}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold text-xs"
          >
            Switch to Lakshya (Admin)
          </button>
        </div>
      )}

      {/* Household Profile & Invite Code Box */}
      <div className="bg-[#11182B] p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <h3 className="font-bold text-white text-lg flex items-center space-x-2">
          <Key className="w-5 h-5 text-indigo-400" />
          <span>Flat Access & Credentials</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Flat / House Name
            </label>
            <p className="font-bold text-white text-base">{household.name}</p>
            <p className="text-xs text-slate-400 mt-1">Created by Lakshya Shukla</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/5 flex items-center justify-between">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Roommate Invite Code
              </label>
              <p className="font-mono font-extrabold text-2xl text-emerald-400">{household.invite_code}</p>
              <p className="text-xs text-slate-400 mt-1">Share this code with your flatmates</p>
            </div>
            
            <button
              onClick={copyInvite}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Roommates Roster Table */}
      <div className="bg-[#11182B] p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Flatmate Roster (4 Members)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Active flatmates sharing expenses and duties</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Roommate</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {demoUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition">
                  <td className="py-4 font-bold text-white flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                      {user.initials}
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="py-4 text-slate-400 font-mono text-xs">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      user.role === 'admin'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {user.role === 'admin' ? 'Flat Manager' : 'Flatmate'}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center text-xs text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {user.role !== 'admin' && (
                      <button
                        disabled={!isAdmin}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
