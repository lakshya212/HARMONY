import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Receipt,
  Plus,
  Trash2,
  Calendar,
  Filter,
  CheckCircle2,
  Users,
  CreditCard,
  Zap,
  Wifi,
  ShoppingCart,
  Flame,
  Wrench
} from 'lucide-react';
import AddExpenseModal from '../components/AddExpenseModal';

export default function ExpensesPage() {
  const { expenses, currentUser, household, deleteExpense, settleUp } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', name: 'All Bills', icon: Receipt },
    { id: 'Utilities', name: '⚡ Electricity & Power', icon: Zap },
    { id: 'Internet', name: '📶 Wi-Fi & Fiber', icon: Wifi },
    { id: 'Food', name: '🛒 Groceries & Food', icon: ShoppingCart },
    { id: 'Supplies', name: '🛠️ Repairs & RO', icon: Wrench },
  ];

  const filteredExpenses = filterCategory === 'ALL'
    ? expenses
    : expenses.filter(e => e.category === filterCategory);

  const totalAmount = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#11182B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Shared Household Expenses
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Every bill is split equally across roommates. Zero manual math or delayed payments.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bill</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#11182B] p-5 rounded-2xl border border-white/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bills This Month</p>
          <p className="text-2xl font-extrabold text-white mt-1">₹{totalAmount.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-400 mt-1">{expenses.length} shared records</p>
        </div>

        <div className="bg-[#11182B] p-5 rounded-2xl border border-white/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equal Share Per Person</p>
          <p className="text-2xl font-extrabold text-indigo-400 mt-1">₹{Math.round(totalAmount / 4).toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-400 mt-1">Divided among 4 flatmates</p>
        </div>

        <div className="bg-[#11182B] p-5 rounded-2xl border border-white/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Household</p>
          <p className="text-lg font-bold text-slate-200 mt-1 truncate">{household.name}</p>
          <p className="text-xs text-emerald-400 font-bold mt-1">Code: {household.invite_code}</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((c) => {
          const isActive = filterCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'bg-[#11182B] text-slate-400 hover:text-white border border-white/5 hover:bg-white/5'
              }`}
            >
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bills Cards List */}
      <div className="space-y-3.5">
        {filteredExpenses.map((expense) => {
          const isPayer = expense.paid_by === currentUser.id;
          const share = Math.round(Number(expense.amount) / 4);

          return (
            <div
              key={expense.id}
              className="bg-[#11182B] p-5 sm:p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{expense.description}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      Paid by {expense.paid_by_name || 'Roommate'}
                    </span>
                    <span>·</span>
                    <span>{expense.expense_date}</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                      {expense.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="text-left sm:text-right">
                  <p className="text-xl font-extrabold text-white">
                    ₹{Number(expense.amount).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-indigo-300 font-medium">
                    {isPayer ? `You paid · You get back ₹${Number(expense.amount) - share}` : `Your share: ₹${share}`}
                  </p>
                </div>

                <button
                  onClick={() => deleteExpense(expense.id)}
                  title="Delete bill"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && <AddExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
