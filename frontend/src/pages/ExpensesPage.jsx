import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Receipt, Plus, Trash2, Calendar, Users, Wallet } from 'lucide-react';
import AddExpenseModal from '../components/AddExpenseModal';

export default function ExpensesPage() {
  const { expenses, deleteExpense } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Quick Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shared Household Expenses</h1>
          <p className="text-sm text-slate-500 mt-1">
            Equal split accounting ledger with automated allocation into <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">expense_splits</code>.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Shared Bill</span>
        </button>
      </div>

      {/* Total Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-md flex justify-between items-center">
        <div>
          <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Total Recorded Bills</p>
          <p className="text-3xl font-extrabold mt-1">₹{totalSpent.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <Wallet className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Paid By</th>
                <th className="py-3.5 px-4 text-center">Split Count</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{exp.description}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{exp.expense_date}</td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-800">{exp.paid_by_name}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      <Users className="w-3 h-3 mr-1" />
                      {exp.splits_count || 4} ways
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    ₹{Number(exp.amount).toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete bill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
