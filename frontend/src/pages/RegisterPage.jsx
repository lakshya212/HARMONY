import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, Home, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { household } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mode: 'join', // 'join' or 'create'
    inviteCode: 'GRN101',
    householdName: 'Green Residency Flat 402'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link to="/" className="inline-flex items-center space-x-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-[1.5px] shadow-glow-indigo">
            <div className="w-full h-full bg-[#0D1322] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-white font-display">
            HARMONY<span className="text-emerald-400">.</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Create Your Account
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 block w-full px-4 py-3 bg-[#0D1322] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Lakshya Sharma"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1.5 block w-full px-4 py-3 bg-[#0D1322] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="lakshya@gmail.com"
              />
            </div>

            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Household Setup
              </label>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'join' })}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition ${
                    formData.mode === 'join'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-[#0D1322] border-white/10 text-slate-400'
                  }`}
                >
                  Join Existing Flat
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'create' })}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition ${
                    formData.mode === 'create'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-[#0D1322] border-white/10 text-slate-400'
                  }`}
                >
                  Create New Flat
                </button>
              </div>

              {formData.mode === 'join' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Flat Invite Code</label>
                  <input
                    type="text"
                    required
                    value={formData.inviteCode}
                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value.toUpperCase() })}
                    className="mt-1.5 block w-full px-4 py-3 bg-[#0D1322] border border-white/10 rounded-xl text-white uppercase font-mono tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="GRN101"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Default demo flat code: <span className="font-bold text-emerald-400">GRN101</span>
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Apartment / Flat Name</label>
                  <input
                    type="text"
                    required
                    value={formData.householdName}
                    onChange={(e) => setFormData({ ...formData, householdName: e.target.value })}
                    className="mt-1.5 block w-full px-4 py-3 bg-[#0D1322] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Green Residency Flat 402"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Join Flat & Continue</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-5 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
