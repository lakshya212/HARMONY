import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Receipt,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Zap,
  TrendingUp,
  CreditCard,
  Check,
  Clock,
  Trash2,
  Users
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import AddChoreModal from '../components/AddChoreModal';
import AddExpenseModal from '../components/AddExpenseModal';

export default function DashboardPage() {
  const { dashboardData, currentUser, household, loading, toggleTask, settleUp } = useApp();
  const [choreModalOpen, setChoreModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('expenses'); // 'expenses' or 'chores'
  const [settledMessage, setSettledMessage] = useState(null);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3 text-slate-400">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading household ledger...</span>
        </div>
      </div>
    );
  }

  const { kpis, pointsData, balanceData, recentChores, recentExpenses } = dashboardData;

  // Find current active user's financial balance
  const myBalance = balanceData.find(b => b.id === currentUser.id) || {
    totalPaid: 0,
    totalOwed: 0,
    netBalance: 0
  };

  const isOwed = myBalance.netBalance >= 0;
  const absBalance = Math.abs(myBalance.netBalance).toLocaleString('en-IN', {
    maximumFractionDigits: 2
  });

  const handleSettle = (userName, amount) => {
    settleUp(userName, amount);
    setSettledMessage(`Settlement recorded with ${userName}! Ledger balanced.`);
    setTimeout(() => setSettledMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Settlement Notification Toast */}
      {settledMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>{settledMessage}</span>
          </div>
          <button onClick={() => setSettledMessage(null)} className="text-xs text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Welcome Banner & Fast Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#11182B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Hey, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {currentUser.role === 'admin' ? 'Flat Manager' : 'Flatmate'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400 flex items-center space-x-1.5">
            <span>Household: <strong className="text-slate-200">{household.name}</strong></span>
            <span>·</span>
            <span className="font-mono text-indigo-300 font-bold">Code: {household.invite_code}</span>
          </p>
        </div>

        {/* Quick Action Modals */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setExpenseModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bill</span>
          </button>

          <button
            onClick={() => setChoreModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-[#172038] hover:bg-[#1E2B4C] border border-white/10 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Your Clear Balance (Simplified, Zero Math Jargon) */}
        <div className={`p-6 rounded-3xl border relative overflow-hidden ${
          isOwed
            ? 'bg-gradient-to-br from-[#11182B] to-[#0E202A] border-emerald-500/30'
            : 'bg-gradient-to-br from-[#11182B] to-[#25131C] border-rose-500/30'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Your Personal Balance
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isOwed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {isOwed ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            </div>
          </div>

          <div className="mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {isOwed ? 'You Get Back' : 'You Need To Pay'}
            </span>
            <p className={`text-3xl font-extrabold tracking-tight mt-0.5 ${
              isOwed ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isOwed ? `+₹${absBalance}` : `-₹${absBalance}`}
            </p>
          </div>

          <p className="mt-2 text-[11px] text-slate-400 leading-snug">
            {isOwed
              ? 'You paid more than your fair share. Flatmates owe you this money.'
              : 'You paid less than your share of shared bills. Pay flatmates to settle.'}
          </p>
        </div>

        {/* Card 2: Total House Expenses */}
        <div className="bg-[#11182B] p-6 rounded-3xl border border-white/5 relative">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Household Bills
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">All Roommates Combined</span>
            <p className="text-3xl font-extrabold text-white tracking-tight mt-0.5">
              ₹{kpis.totalExpenses.toLocaleString('en-IN')}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Across {recentExpenses.length} shared bills this month
          </p>
        </div>

        {/* Card 3: Your Fair Share */}
        <div className="bg-[#11182B] p-6 rounded-3xl border border-white/5 relative">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Your Fair Share
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Equal 1/4th Allocation</span>
            <p className="text-3xl font-extrabold text-indigo-300 tracking-tight mt-0.5">
              ₹{Math.round(kpis.totalExpenses / (kpis.totalMembers || 4)).toLocaleString('en-IN')}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            You paid ₹{myBalance.totalPaid.toLocaleString('en-IN')} so far
          </p>
        </div>

        {/* Card 4: House Duties */}
        <div className="bg-[#11182B] p-6 rounded-3xl border border-white/5 relative">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              House Chores
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tasks Completed</span>
            <p className="text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {kpis.completedChores} <span className="text-lg text-slate-500 font-normal">/ {kpis.completedChores + kpis.pendingChores}</span>
            </p>
          </div>
          <p className="mt-2 text-[11px] text-emerald-400 font-medium">
            {kpis.pendingChores} chores pending this week
          </p>
        </div>

      </div>

      {/* Main Content Tabs (Eliminates Clutter!) */}
      <div className="space-y-6">
        
        {/* Tab Toggle Navigation */}
        <div className="flex space-x-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'expenses'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>💸 Expenses & Who Owes Who</span>
          </button>

          <button
            onClick={() => setActiveTab('chores')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'chores'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>🧹 House Duties & Chores</span>
          </button>
        </div>

        {/* TAB 1: EXPENSES & WHO OWES WHO */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Who Owes Who (The Plain English Ledger) */}
            <div className="lg:col-span-6 bg-[#11182B] p-6 rounded-3xl border border-white/5 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>Roommate Balance Ledger</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  How much each flatmate has paid and whether they owe or get money back.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {balanceData.map((member) => {
                  const owes = member.netBalance < 0;
                  const isMe = member.id === currentUser.id;
                  const absVal = Math.abs(member.netBalance).toLocaleString('en-IN');
                  return (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                        isMe
                          ? 'bg-white/5 border-indigo-500/30 shadow-sm'
                          : 'bg-[#172038]/50 border-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white flex items-center">
                            {member.name}
                            {isMe && <span className="ml-2 text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded">You</span>}
                          </p>
                          <p className="text-xs text-slate-400">
                            Paid ₹{member.totalPaid.toLocaleString('en-IN')} in total
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold ${
                          owes
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {owes ? `Owes ₹${absVal}` : `Gets back ₹${absVal}`}
                        </div>
                        {!isMe && owes && (
                          <button
                            onClick={() => handleSettle(member.name, member.netBalance)}
                            className="block text-[11px] text-indigo-400 hover:text-indigo-300 font-bold mt-1 text-right ml-auto"
                          >
                            Mark Settled ⚡
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Recent Bills List */}
            <div className="lg:col-span-6 bg-[#11182B] p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white">Recent Shared Bills</h2>
                  <p className="text-xs text-slate-400 mt-1">Split equally among all 4 roommates</p>
                </div>
                <button
                  onClick={() => setExpenseModalOpen(true)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  + Add Bill
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {recentExpenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-2xl bg-[#172038]/50 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{exp.description}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Paid by <strong className="text-slate-200">{exp.paid_by_name || 'Roommate'}</strong> on {exp.expense_date}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-extrabold text-white">
                        ₹{Number(exp.amount).toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px] text-indigo-300">
                        ₹{Math.round(Number(exp.amount) / 4).toLocaleString('en-IN')} / person
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: HOUSE CHORES & DUTIES */}
        {activeTab === 'chores' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Quick Chores Checklist */}
            <div className="lg:col-span-7 bg-[#11182B] p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white">Household Task Checklist</h2>
                  <p className="text-xs text-slate-400 mt-1">Tap a chore to mark it complete</p>
                </div>
                <button
                  onClick={() => setChoreModalOpen(true)}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  + Add Task
                </button>
              </div>

              <div className="space-y-2.5 pt-2">
                {recentChores.map((chore) => {
                  const isDone = chore.status === 'COMPLETED';
                  return (
                    <div
                      key={chore.id}
                      onClick={() => toggleTask(chore.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isDone
                          ? 'bg-emerald-500/5 border-emerald-500/20 opacity-80'
                          : 'bg-[#172038]/50 border-white/5 hover:border-indigo-500/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-white'
                            : 'border-white/20 bg-white/5 text-transparent hover:border-indigo-400'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {chore.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Assigned to: <strong className="text-slate-300">{chore.assigned_to_name || 'Roommate'}</strong> · Due {chore.due_date}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isDone
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {isDone ? 'Done ✓' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Fair Effort Distribution Chart */}
            <div className="lg:col-span-5 bg-[#11182B] p-6 rounded-3xl border border-white/5 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white">Chore Contribution Rank</h2>
                <p className="text-xs text-slate-400 mt-1">Total chores completed by each flatmate</p>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pointsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1322', borderColor: '#233054', borderRadius: '14px', color: '#fff' }}
                      formatter={(val) => [`${val} points`, 'Contribution']}
                    />
                    <Bar dataKey="points" radius={[8, 8, 0, 0]}>
                      {pointsData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={['#6366F1', '#10B981', '#F59E0B', '#8B5CF6'][index % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Lakshya and Rahul lead the household contribution leaderboard this week.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Modals */}
      {choreModalOpen && <AddChoreModal isOpen={choreModalOpen} onClose={() => setChoreModalOpen(false)} />}
      {expenseModalOpen && <AddExpenseModal isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />}

    </div>
  );
}
