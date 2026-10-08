import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Plus,
  Trash2,
  Calendar,
  Check,
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';
import AddChoreModal from '../components/AddChoreModal';

export default function TasksPage() {
  const { tasks, currentUser, household, toggleTask, deleteTask } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'PENDING', 'COMPLETED', 'MY'

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'PENDING') return t.status === 'PENDING';
    if (filter === 'COMPLETED') return t.status === 'COMPLETED';
    if (filter === 'MY') return t.assigned_to === currentUser.id;
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const pendingCount = tasks.filter(t => t.status === 'PENDING').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#11182B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            House Duties & Chores
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Keep the living space clean without arguments. Tap any chore to mark it completed.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Chore</span>
        </button>
      </div>

      {/* Progress & Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#11182B] p-5 rounded-2xl border border-white/5 sm:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly House Duty Progress</span>
            <span className="text-sm font-extrabold text-emerald-400">{progressPercent}% Done</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-[#0D1322] rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {completedCount} chores done · {pendingCount} remaining for this week
          </p>
        </div>

        <div className="bg-[#11182B] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Flatmate</span>
          <p className="text-xl font-bold text-white mt-1">{currentUser.name}</p>
          <p className="text-xs text-indigo-300 font-semibold mt-1">
            {tasks.filter(t => t.assigned_to === currentUser.id && t.status === 'PENDING').length} pending assigned to you
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-2">
        {[
          { id: 'ALL', label: `All Tasks (${tasks.length})` },
          { id: 'PENDING', label: `Pending (${pendingCount})` },
          { id: 'COMPLETED', label: `Completed (${completedCount})` },
          { id: 'MY', label: 'Assigned to Me' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === tab.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                : 'bg-[#11182B] text-slate-400 hover:text-white border border-white/5 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tasks Checklist */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'COMPLETED';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                isDone
                  ? 'bg-emerald-500/5 border-emerald-500/20 opacity-80'
                  : 'bg-[#11182B] border-white/5 hover:border-white/10'
              }`}
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="flex items-center space-x-4 cursor-pointer flex-1"
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20'
                      : 'border-white/20 bg-white/5 text-transparent hover:border-indigo-400'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>

                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>Assigned to <strong className="text-slate-300">{task.assigned_to_name || 'Roommate'}</strong></span>
                    <span>·</span>
                    <span>Due {task.due_date}</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {isDone ? 'Completed' : 'Pending'}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  title="Delete chore"
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && <AddChoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
