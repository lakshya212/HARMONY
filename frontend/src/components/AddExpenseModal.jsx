import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Receipt, Calculator } from 'lucide-react';

export default function AddExpenseModal({ isOpen, onClose }) {
  const { addExpense, demoUsers, currentUser } = useApp();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Utilities');
  const [paidBy, setPaidBy] = useState(currentUser.id);
  const [participants, setParticipants] = useState(demoUsers.map(u => u.id));
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleParticipant = (userId) => {
    if (participants.includes(userId)) {
      if (participants.length > 1) {
        setParticipants(participants.filter(id => id !== userId));
      }
    } else {
      setParticipants([...participants, userId]);
    }
  };

  const parsedAmount = parseFloat(amount) || 0;
  const splitShare = participants.length > 0 ? (parsedAmount / participants.length).toFixed(2) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || parsedAmount <= 0) return;
    setSubmitting(true);
    await addExpense({
      description,
      amount: parsedAmount,
      category,
      paid_by: paidBy,
      participants
    });
    setSubmitting(false);
    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">Log Shared Expense</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Bill Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. October Electricity Bill"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Total Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                placeholder="2400.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                <option value="Utilities">Utilities (Electricity/Gas)</option>
                <option value="Internet">Internet / Wi-Fi</option>
                <option value="Food">Food / Groceries</option>
                <option value="Supplies">Supplies / Cleaning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Who Paid Upfront?
            </label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              {demoUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Participants Multi-Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Split Equitably Among ({participants.length} Roommates)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((u) => {
                const isSelected = participants.includes(u.id);
                return (
                  <button
                    type="button"
                    key={u.id}
                    onClick={() => toggleParticipant(u.id)}
                    className={`flex items-center px-3 py-2 rounded-lg border text-xs font-medium transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-400 bg-slate-50'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-sm mr-2 flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                    {u.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mathematical Preview Box (Viva Highlight) */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Equal Share per Person:</span>
            </div>
            <span className="font-bold text-sm text-emerald-700">
              ₹{splitShare} <span className="font-normal text-slate-400">/ person</span>
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || parsedAmount <= 0}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
            >
              <span>{submitting ? 'Recording Split...' : 'Confirm & Split Expense'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
