import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Calculator, ShieldCheck, ArrowRight, BarChart3, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            HARMONY<span className="text-blue-600">.</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            Live Demo
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <span>BCA 5th Semester Minor Project (BCA-508)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
          Shared Living <span className="text-blue-600">Without The Drama.</span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
          An integrated full-stack web platform for flatmates to track household chores, automate equal expense splitting, and maintain harmony through computational transparency.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition flex items-center justify-center space-x-2"
          >
            <span>Launch Live Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/tasks"
            className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-base font-semibold rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
          >
            <span>Explore Chores Tracker</span>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Chore Gamification</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Assign point weights to domestic tasks (10 to 35 pts). Members earn verified points upon completion, rendering domestic effort visible and objective.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Automated Equal Splitting</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Input shared bills (electricity, groceries, broadband). The system calculates exact shares ($T / N$) stored in relational junction tables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Dual-Metric Analytics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Separate financial balances from chore labor. Interactive Recharts analytics prevent confusion between money paid and physical work done.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>Institute of Management Studies (IMS), Noida | School of Information Technology (SOIT) | CCSU Meerut</p>
      </footer>
    </div>
  );
}
