import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api';

// Initial synthetic seed data for instant 0ms rendering and offline presentation safety
const INITIAL_USERS = [
  { id: 'u1', name: 'Lakshya Sharma', email: 'lakshya@imsnoida.com', role: 'admin' },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul@imsnoida.com', role: 'member' },
  { id: 'u3', name: 'Aman Gupta', email: 'aman@imsnoida.com', role: 'member' },
  { id: 'u4', name: 'Rohit Kumar', email: 'rohit@imsnoida.com', role: 'member' }
];

const INITIAL_HOUSEHOLD = {
  id: 'h1',
  name: 'Green Residency (Flat 402)',
  invite_code: 'GRN101'
};

const INITIAL_TASKS = [
  { id: 't1', household_id: 'h1', title: 'Deep Clean Kitchen Counters', category: 'Kitchen', points: 25, assigned_to: 'u1', assigned_to_name: 'Lakshya', completed_by: 'u1', status: 'COMPLETED', due_date: '2026-10-05' },
  { id: 't2', household_id: 'h1', title: 'Living Room Vacuuming & Mopping', category: 'Cleaning', points: 30, assigned_to: 'u2', assigned_to_name: 'Rahul', completed_by: 'u2', status: 'COMPLETED', due_date: '2026-10-06' },
  { id: 't3', household_id: 'h1', title: 'Weekly Grocery Supply Run', category: 'Groceries', points: 20, assigned_to: 'u3', assigned_to_name: 'Aman', completed_by: 'u3', status: 'COMPLETED', due_date: '2026-10-06' },
  { id: 't4', household_id: 'h1', title: 'Dispose Garbage & Segregate Waste', category: 'Cleaning', points: 15, assigned_to: 'u4', assigned_to_name: 'Rohit', completed_by: 'u4', status: 'COMPLETED', due_date: '2026-10-07' },
  { id: 't5', household_id: 'h1', title: 'Bathroom Sanitisation (Common)', category: 'Cleaning', points: 35, assigned_to: 'u1', assigned_to_name: 'Lakshya', completed_by: 'u1', status: 'COMPLETED', due_date: '2026-10-07' },
  { id: 't6', household_id: 'h1', title: 'Refill Drinking Water Dispensers', category: 'Maintenance', points: 20, assigned_to: 'u2', assigned_to_name: 'Rahul', completed_by: 'u2', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't7', household_id: 'h1', title: 'Wash Cooking Vessels & Utensils', category: 'Kitchen', points: 20, assigned_to: 'u3', assigned_to_name: 'Aman', completed_by: 'u3', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't8', household_id: 'h1', title: 'Clean Refrigerator Shelves', category: 'Kitchen', points: 25, assigned_to: 'u4', assigned_to_name: 'Rohit', completed_by: 'u4', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't9', household_id: 'h1', title: 'Restock Toiletries & Detergent', category: 'Groceries', points: 15, assigned_to: 'u1', assigned_to_name: 'Lakshya', completed_by: null, status: 'PENDING', due_date: '2026-10-10' },
  { id: 't10', household_id: 'h1', title: 'Balcony Sweep & Plant Watering', category: 'Cleaning', points: 15, assigned_to: 'u2', assigned_to_name: 'Rahul', completed_by: null, status: 'PENDING', due_date: '2026-10-11' },
  { id: 't11', household_id: 'h1', title: 'AC Filter Cleaning', category: 'Maintenance', points: 30, assigned_to: 'u3', assigned_to_name: 'Aman', completed_by: null, status: 'PENDING', due_date: '2026-10-12' },
  { id: 't12', household_id: 'h1', title: 'Sort Monthly Newspaper & Cardboard', category: 'Maintenance', points: 20, assigned_to: 'u4', assigned_to_name: 'Rohit', completed_by: null, status: 'PENDING', due_date: '2026-10-13' }
];

const INITIAL_EXPENSES = [
  { id: 'e1', household_id: 'h1', paid_by: 'u1', paid_by_name: 'Lakshya Sharma', description: 'September Electricity Bill', amount: 2400.0, category: 'Utilities', expense_date: '2026-10-03', splits_count: 4 },
  { id: 'e2', household_id: 'h1', paid_by: 'u2', paid_by_name: 'Rahul Verma', description: 'Airtel Xstream Fiber (300 Mbps)', amount: 1200.0, category: 'Internet', expense_date: '2026-10-04', splits_count: 4 },
  { id: 'e3', household_id: 'h1', paid_by: 'u3', paid_by_name: 'Aman Gupta', description: 'Blinkit Superstore Bulk Ration', amount: 3600.0, category: 'Food', expense_date: '2026-10-05', splits_count: 4 },
  { id: 'e4', household_id: 'h1', paid_by: 'u4', paid_by_name: 'Rohit Kumar', description: 'HP Gas Cylinder Refill', amount: 1100.0, category: 'Utilities', expense_date: '2026-10-06', splits_count: 4 },
  { id: 'e5', household_id: 'h1', paid_by: 'u1', paid_by_name: 'Lakshya Sharma', description: 'Urban Company RO Service & Supplies', amount: 1500.0, category: 'Supplies', expense_date: '2026-10-07', splits_count: 4 }
];

const INITIAL_DASHBOARD = {
  kpis: {
    pendingChores: 4,
    completedChores: 8,
    totalExpenses: 9800,
    totalMembers: 4
  },
  pointsData: [
    { id: 'u1', name: 'Lakshya', full_name: 'Lakshya Sharma', points: 60 },
    { id: 'u2', name: 'Rahul', full_name: 'Rahul Verma', points: 50 },
    { id: 'u3', name: 'Aman', full_name: 'Aman Gupta', points: 40 },
    { id: 'u4', name: 'Rohit', full_name: 'Rohit Kumar', points: 40 }
  ],
  balanceData: [
    { id: 'u1', name: 'Lakshya Sharma', totalPaid: 3900, totalOwed: 2450, netBalance: 1450 },
    { id: 'u2', name: 'Rahul Verma', totalPaid: 1200, totalOwed: 2450, netBalance: -1250 },
    { id: 'u3', name: 'Aman Gupta', totalPaid: 3600, totalOwed: 2450, netBalance: 1150 },
    { id: 'u4', name: 'Rohit Kumar', totalPaid: 1100, totalOwed: 2450, netBalance: -1350 }
  ],
  recentChores: INITIAL_TASKS.slice(0, 5),
  recentExpenses: INITIAL_EXPENSES.slice(0, 5)
};

export const AppProvider = ({ children }) => {
  const [demoUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [household, setHousehold] = useState(INITIAL_HOUSEHOLD);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [dashboardData, setDashboardData] = useState(INITIAL_DASHBOARD);
  const [loading, setLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  // Recalculate local dashboard data if offline
  const computeLocalDashboard = (currentTasks, currentExpenses) => {
    const pendingChores = currentTasks.filter(t => t.status === 'PENDING').length;
    const completedChores = currentTasks.filter(t => t.status === 'COMPLETED').length;
    const totalExpenses = currentExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

    const pointsData = demoUsers.map(u => ({
      id: u.id,
      name: u.name.split(' ')[0],
      full_name: u.name,
      points: currentTasks
        .filter(t => t.status === 'COMPLETED' && (t.completed_by === u.id || t.assigned_to === u.id))
        .reduce((sum, t) => sum + (t.points || 0), 0)
    }));

    const splitPerUser = currentExpenses.length > 0 ? totalExpenses / demoUsers.length : 0;
    const balanceData = demoUsers.map(u => {
      const totalPaid = currentExpenses
        .filter(e => e.paid_by === u.id)
        .reduce((sum, e) => sum + Number(e.amount), 0);
      return {
        id: u.id,
        name: u.name,
        totalPaid,
        totalOwed: splitPerUser,
        netBalance: Math.round((totalPaid - splitPerUser) * 100) / 100
      };
    });

    return {
      kpis: { pendingChores, completedChores, totalExpenses, totalMembers: demoUsers.length },
      pointsData,
      balanceData,
      recentChores: currentTasks.slice(0, 5),
      recentExpenses: currentExpenses.slice(0, 5)
    };
  };

  // Fetch all state from live API with automatic fallback
  const refreshData = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const [dashRes, tasksRes, expRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/${household.id}`, { signal: controller.signal }),
        fetch(`${API_BASE}/tasks?householdId=${household.id}`, { signal: controller.signal }),
        fetch(`${API_BASE}/expenses?householdId=${household.id}`, { signal: controller.signal })
      ]);
      clearTimeout(timeoutId);

      if (dashRes.ok && tasksRes.ok && expRes.ok) {
        const dash = await dashRes.json();
        const t = await tasksRes.json();
        const e = await expRes.json();
        setDashboardData(dash);
        setTasks(t);
        setExpenses(e);
        setApiConnected(true);
        return;
      }
    } catch (err) {
      // Graceful offline mode - UI stays fully functional
      setApiConnected(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [household.id]);

  // Create Task
  const addTask = async (taskData) => {
    try {
      if (apiConnected) {
        const res = await fetch(`${API_BASE}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...taskData, household_id: household.id })
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to local state:', e);
    }

    // Local fallback mutation
    const assignedUser = demoUsers.find(u => u.id === taskData.assigned_to) || currentUser;
    const newTask = {
      id: 't_' + Date.now(),
      household_id: household.id,
      title: taskData.title,
      category: taskData.category || 'General',
      points: Number(taskData.points) || 20,
      assigned_to: assignedUser.id,
      assigned_to_name: assignedUser.name.split(' ')[0],
      completed_by: null,
      status: 'PENDING',
      due_date: taskData.due_date || new Date().toISOString().split('T')[0]
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    setDashboardData(computeLocalDashboard(updated, expenses));
    return true;
  };

  // Toggle Task Completion
  const toggleTask = async (taskId) => {
    try {
      if (apiConnected) {
        const res = await fetch(`${API_BASE}/tasks/${taskId}/toggle`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser.id })
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to local toggle:', e);
    }

    // Local fallback mutation
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const isDone = t.status === 'COMPLETED';
        return {
          ...t,
          status: isDone ? 'PENDING' : 'COMPLETED',
          completed_by: isDone ? null : currentUser.id
        };
      }
      return t;
    });
    setTasks(updated);
    setDashboardData(computeLocalDashboard(updated, expenses));
    return true;
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      if (apiConnected) {
        const res = await fetch(`${API_BASE}/tasks/${taskId}`, { method: 'DELETE' });
        if (res.ok) {
          await refreshData();
          return true;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to local delete:', e);
    }

    const updated = tasks.filter(t => t.id !== taskId);
    setTasks(updated);
    setDashboardData(computeLocalDashboard(updated, expenses));
    return true;
  };

  // Add Expense with equal split
  const addExpense = async (expenseData) => {
    try {
      if (apiConnected) {
        const res = await fetch(`${API_BASE}/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...expenseData,
            paid_by: currentUser.id,
            household_id: household.id
          })
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to local expense:', e);
    }

    const newExp = {
      id: 'e_' + Date.now(),
      household_id: household.id,
      paid_by: currentUser.id,
      paid_by_name: currentUser.name,
      description: expenseData.description,
      amount: parseFloat(expenseData.amount),
      category: expenseData.category || 'General',
      expense_date: expenseData.expense_date || new Date().toISOString().split('T')[0],
      splits_count: demoUsers.length
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    setDashboardData(computeLocalDashboard(tasks, updated));
    return true;
  };

  // Delete Expense
  const deleteExpense = async (expenseId) => {
    try {
      if (apiConnected) {
        const res = await fetch(`${API_BASE}/expenses/${expenseId}`, { method: 'DELETE' });
        if (res.ok) {
          await refreshData();
          return true;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to local delete:', e);
    }

    const updated = expenses.filter(e => e.id !== expenseId);
    setExpenses(updated);
    setDashboardData(computeLocalDashboard(tasks, updated));
    return true;
  };

  // Switch demo roommate (Lakshya / Rahul / Aman / Rohit)
  const switchUser = (userId) => {
    const found = demoUsers.find(u => u.id === userId);
    if (found) setCurrentUser(found);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        demoUsers,
        household,
        tasks,
        expenses,
        dashboardData,
        loading,
        apiConnected,
        refreshData,
        addTask,
        toggleTask,
        deleteTask,
        addExpense,
        deleteExpense,
        switchUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
