import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, Eye, EyeOff, ArrowRight, Check, Zap } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { demoUsers, switchUser } = useApp();
  const [email, setEmail] = useState('lakshya@harmony.app');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const matched = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || demoUsers[0];
    switchUser(matched.id);
    navigate('/dashboard');
  };

  const handleQuickSelect = (user) => {
    setEmail(user.email);
    setPassword('demo123');
    switchUser(user.id);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

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
          Sign in to your household
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Or{' '}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            create a new flat / shared home
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          
          <form className="space-y-4" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="mt-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-4 py-3 bg-[#0D1322] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="name@harmony.app"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Demo password: <strong className="text-emerald-400">demo123</strong></span>
              </div>
              <div className="mt-1.5 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3 pr-11 bg-[#0D1322] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Sign In</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Flatmate Login Buttons */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              ⚡ 1-Click Instant Login Profiles
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickSelect(u)}
                  className="text-left p-2.5 rounded-xl border border-white/10 bg-[#0D1322] hover:bg-[#172038] hover:border-indigo-500/40 transition group"
                >
                  <p className="font-bold text-xs text-white group-hover:text-indigo-300 transition truncate">
                    {u.name}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {u.role === 'admin' ? 'Flat Admin' : 'Roommate'}
                  </p>
                </button>
              ))}
            </div>
          </div>

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
