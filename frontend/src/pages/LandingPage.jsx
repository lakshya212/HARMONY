import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Receipt,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Zap,
  Users,
  ShieldCheck,
  CreditCard,
  Smile
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex justify-between items-center z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-[1.5px] shadow-glow-indigo">
            <div className="w-full h-full bg-[#0D1322] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white font-display">
              HARMONY<span className="text-emerald-400">.</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center space-x-1.5"
          >
            <span>Live Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 flex flex-col items-center text-center justify-center relative">
        
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Startup Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Shared Living & Bill Splitting · 2026 Edition</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1] font-display">
          Split shared living costs. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
            Zero awkward chats.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          The smart way for roommates, couples, and flatmates to split rent, groceries, and bills.
          See exactly who gets money back, who owes what, and keep the home harmonious.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm sm:text-base font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
          >
            <span>Launch Live App</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/expenses"
            className="px-8 py-4 bg-[#11182B] hover:bg-[#172038] border border-white/10 hover:border-white/20 text-slate-200 text-sm sm:text-base font-bold rounded-2xl transition flex items-center justify-center space-x-2"
          >
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span>Explore Expense Ledger</span>
          </Link>
        </div>

        {/* Live Interactive Preview Card Mockup */}
        <div className="mt-16 w-full max-w-3xl glass-panel rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl relative text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">Flat 402 · Active Household</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Live Balance Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* Split Card 1 */}
            <div className="bg-[#11182B]/80 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Balance</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">+₹1,450.00</p>
              <p className="text-xs text-slate-400 mt-1">You get back this money from flatmates</p>
            </div>

            {/* Split Card 2 */}
            <div className="bg-[#11182B]/80 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest Bill</span>
              <p className="text-lg font-bold text-white mt-1">Wi-Fi Fiber 300 Mbps</p>
              <p className="text-xs text-indigo-300 mt-0.5">₹1,200 split 4 ways = ₹300/person</p>
            </div>

            {/* Split Card 3 */}
            <div className="bg-[#11182B]/80 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's House Duties</span>
              <p className="text-lg font-bold text-white mt-1">Kitchen Counters</p>
              <p className="text-xs text-slate-400 mt-0.5">Completed by Lakshya (+25 pts)</p>
            </div>
          </div>
        </div>

        {/* 3 Core Value Props */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          
          <div className="glass-card glass-card-hover p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Equal Splits</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Add any bill in seconds. The math calculates each person's share automatically, keeping track of who paid and who owes.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Crystal Clear Balances</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              No confusing math jargon. Green means you get back money; red means you owe. Tap to settle up any time.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fair House Duties</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Rotate cleaning, garbage, and grocery runs without nagging. A friendly checklist ensures everyone pulls their weight.
            </p>
          </div>

        </div>

      </main>

      {/* Modern Startup Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-300 font-display">HARMONY.</span>
            <span>— Shared living & bill splitting, made simple.</span>
          </div>
          <div>
            <span className="text-slate-400">© 2026 HARMONY Technologies. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
