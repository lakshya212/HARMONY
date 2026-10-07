import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Receipt,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Award
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
  const { dashboardData, currentUser, household, loading } = useApp();
  const [choreModalOpen, setChoreModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3 text-slate-500">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Aggregating household metrics...</span>
        </div>
      </div>
    );
  }

  const { kpis, pointsData, balanceData, recentChores, recentExpenses } = dashboardData;

  // Find current user's personal net balance
  const myBalance = balanceData.find(b => b.id === currentUser.id) || { netBalance: 0 };
  const isOwed = myBalance.netBalance >= 0;

  const barColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {currentUser.name.split(' ')[0]}!
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {currentUser.role.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Flat collective: <span className="font-semibold text-slate-700">{household.name}</span> • Invite Token:{' '}
            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {household.invite_code}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setChoreModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Chore</span>
          </button>
          <button
            onClick={() => setExpenseModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
          >
            <Receipt className="w-4 h-4" />
            <span>Split Expense</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Chores</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{kpis.pendingChores}</p>
          <p className="text-xs text-slate-500 mt-1">Requiring flatmate action</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Chores</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{kpis.completedChores}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Verified domestic effort</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Shared Bills</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">₹{kpis.totalExpenses.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500 mt-1">Current billing cycle</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Net Balance</span>
            <div className={`p-2 rounded-lg ${isOwed ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {isOwed ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
            </div>
          </div>
          <p className={`text-3xl font-extrabold mt-2 ${isOwed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isOwed ? '+' : ''}₹{Math.abs(myBalance.netBalance).toFixed(2)}
          </p>
          <p className="text-xs font-medium mt-1 text-slate-500">
            {isOwed ? 'You are owed by flatmates' : 'You owe the household'}
          </p>
        </div>
      </div>

      {/* Analytics Section: Chore Chart + Net Balance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chore Points Distribution Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Chore Effort Distribution</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Points Earned
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Empirical domestic contributions calculated from completed tasks in PostgreSQL.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value) => [`${value} pts`, 'Effort Score']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="points" radius={[6, 6, 0, 0]}>
                  {pointsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Reconciliation Balances */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-lg">Household Financial Ledger</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Net Balances
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Calculated via junction table: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">Net = Total Paid - Expected Share</code>.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Roommate</th>
                  <th className="py-2.5 px-3 text-right">Total Paid</th>
                  <th className="py-2.5 px-3 text-right">Owed Share</th>
                  <th className="py-2.5 px-3 text-right">Net Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {balanceData.map((item) => {
                  const positive = item.netBalance >= 0;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {item.name}
                        {item.id === currentUser.id && (
                          <span className="ml-1 text-[10px] text-blue-600 font-bold">(You)</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-600">₹{item.totalPaid.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right text-slate-600">₹{item.totalOwed.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-bold">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs ${
                            positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {positive ? '+' : ''}₹{item.netBalance.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Recent Household Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Recent Chores */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Latest Tasks
            </h4>
            <div className="space-y-2">
              {recentChores.map((chore) => (
                <div key={chore.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <p className="font-medium text-slate-800">{chore.title}</p>
                    <p className="text-slate-400 text-[11px]">{chore.category} • {chore.points} pts</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    chore.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {chore.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bills */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Latest Shared Bills
            </h4>
            <div className="space-y-2">
              {recentExpenses.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <p className="font-medium text-slate-800">{exp.description}</p>
                    <p className="text-slate-400 text-[11px]">{exp.category} • Paid by {exp.paid_by_name || 'Roommate'}</p>
                  </div>
                  <span className="font-bold text-slate-900 text-xs">
                    ₹{Number(exp.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      <AddChoreModal isOpen={choreModalOpen} onClose={() => setChoreModalOpen(false)} />
      <AddExpenseModal isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />

    </div>
  );
}
