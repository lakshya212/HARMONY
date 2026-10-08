import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, demoUsers, switchUser, household, refreshData, isRefreshing } = useApp();
  const location = useLocation();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Chores', path: '/tasks', icon: CheckCircle2 },
    { name: 'Admin', path: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo & Household Info */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link to="/dashboard" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-[1.5px] shadow-glow-indigo transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#0D1322] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  HARMONY<span className="text-emerald-400">.</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Shared Living
                </span>
              </div>
            </Link>

            {/* Active House Pill */}
            <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-300">
                {household.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {household.invite_code}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-[#11182B]/80 p-1.5 rounded-2xl border border-white/5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Refresh & Active User Switcher */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Working Refresh Button */}
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              title="Refresh ledger state"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition flex items-center justify-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 px-3 py-1.5 sm:py-2 rounded-2xl bg-[#11182B] hover:bg-[#172038] border border-white/10 transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentUser.avatarColor || 'from-indigo-500 to-purple-500'} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                  {currentUser.initials || currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight flex items-center">
                    {currentUser.name.split(' ')[0]}
                    {currentUser.role === 'admin' && (
                      <span className="ml-1.5 text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-400">Switch user</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0D1322] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active Profile
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      View the app from any flatmate's perspective
                    </p>
                  </div>
                  <div className="mt-1 space-y-1">
                    {demoUsers.map((u) => {
                      const isCurrent = u.id === currentUser.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUser(u.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition ${
                            isCurrent
                              ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${u.avatarColor} flex items-center justify-center text-white text-[11px] font-bold`}>
                              {u.initials}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{u.name}</p>
                              <p className="text-[10px] text-slate-400 capitalize">{u.role}</p>
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex border-t border-white/5 px-2 py-2 bg-[#0D1322] justify-around">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-semibold transition ${
                isActive ? 'text-indigo-400 bg-white/5' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
