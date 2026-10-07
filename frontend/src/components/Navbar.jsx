import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Home, CheckSquare, Receipt, Shield, Users, Sparkles, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const { currentUser, demoUsers, switchUser, household, apiConnected, refreshData } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Chores', path: '/tasks', icon: CheckSquare },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Admin Panel', path: '/admin', icon: Shield },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Household Badge */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                HARMONY<span className="text-blue-600">.</span>
              </span>
            </Link>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {household.name} (Code: <b className="ml-1 text-blue-600">{household.invite_code}</b>)
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Switcher (For Viva Demonstrations) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              title="Refresh Data"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Status dot */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                apiConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
              title={apiConnected ? 'Connected to live Express backend' : 'Using Local In-Memory Fallback'}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${apiConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              {apiConnected ? 'Live API' : 'Local Mode'}
            </span>

            {/* Roommate Switcher */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5">
              <Users className="w-4 h-4 text-slate-500 ml-1" />
              <select
                value={currentUser.id}
                onChange={(e) => switchUser(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {demoUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex justify-around border-t border-slate-100 py-2 bg-slate-50">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs font-medium ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
