import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Receipt, Calculator, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#0D1322] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base font-display">Add Shared Bill</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Bill Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Bill Description
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Wi-Fi Fiber Bill, Blinkit Groceries"
              className="w-full px-4 py-3 bg-[#11182B] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Total Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1200"
                className="w-full px-4 py-3 bg-[#11182B] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#11182B] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Utilities">⚡ Utilities</option>
                <option value="Internet">📶 Internet</option>
                <option value="Food">🛒 Food & Ration</option>
                <option value="Supplies">🛠️ Supplies</option>
                <option value="Other">🏷️ Other</option>
              </select>
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Who Paid Upfront?
            </label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-4 py-3 bg-[#11182B] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {demoUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} {u.id === currentUser.id ? '(You)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Split Among Flatmates */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Split Equally Among ({participants.length} People)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((u) => {
                const isSelected = participants.includes(u.id);
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => toggleParticipant(u.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-[#11182B] border-white/5 text-slate-500'
                    }`}
                  >
                    <span>{u.name.split(' ')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Math Summary */}
          {parsedAmount > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
              <span>Fair Share Per Person:</span>
              <span className="text-sm font-extrabold">₹{splitShare}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
            >
              {submitting ? 'Calculating...' : 'Save & Split Bill'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
