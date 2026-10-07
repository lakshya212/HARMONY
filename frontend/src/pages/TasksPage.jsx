import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Plus, Trash2, Calendar, Award, CheckCircle, Clock } from 'lucide-react';
import AddChoreModal from '../components/AddChoreModal';

export default function TasksPage() {
  const { tasks, toggleTask, deleteTask, currentUser } = useApp();
  const [filter, setFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'PENDING') return t.status === 'PENDING';
    if (filter === 'COMPLETED') return t.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Household Chores</h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete tasks to earn verified contribution points and prevent free-rider imbalance.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Chore</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {['ALL', 'PENDING', 'COMPLETED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {f === 'ALL' ? 'All Chores' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Task List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'COMPLETED';
          return (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-50/80 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {task.category}
                </span>
                <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  {task.points} pts
                </span>
              </div>

              <h3 className={`font-semibold text-base mb-2 ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                {task.title}
              </h3>

              <div className="text-xs text-slate-500 space-y-1 mb-4">
                <p className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  Due: {task.due_date || 'No deadline'}
                </p>
                <p>
                  Assigned to: <span className="font-medium text-slate-700">{task.assigned_name}</span>
                </p>
                {isDone && task.completed_name && (
                  <p className="text-emerald-600 font-medium flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    Completed by {task.completed_name}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                    isDone
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Mark as Incomplete' : 'Mark Done'}</span>
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AddChoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
