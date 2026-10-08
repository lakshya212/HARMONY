// =============================================================================
// IN-MEMORY DATA STORE WITH SYNTHETIC DEMO SEED DATA
// Ensures 100% operational reliability for local demos & testing
// =============================================================================

const profiles = [
  { id: 'u1', email: 'lakshya@harmony.app', full_name: 'Lakshya Sharma', role: 'admin' },
  { id: 'u2', email: 'rahul@harmony.app', full_name: 'Rahul Verma', role: 'member' },
  { id: 'u3', email: 'aman@harmony.app', full_name: 'Aman Gupta', role: 'member' },
  { id: 'u4', email: 'rohit@harmony.app', full_name: 'Rohit Kumar', role: 'member' }
];

const households = [
  {
    id: 'h1',
    name: 'Green Residency (Flat 402)',
    invite_code: 'GRN101',
    created_by: 'u1',
    created_at: new Date().toISOString()
  }
];

const household_members = [
  { id: 'm1', household_id: 'h1', user_id: 'u1', role: 'admin', joined_at: new Date().toISOString() },
  { id: 'm2', household_id: 'h1', user_id: 'u2', role: 'member', joined_at: new Date().toISOString() },
  { id: 'm3', household_id: 'h1', user_id: 'u3', role: 'member', joined_at: new Date().toISOString() },
  { id: 'm4', household_id: 'h1', user_id: 'u4', role: 'member', joined_at: new Date().toISOString() }
];

let tasks = [
  { id: 't1', household_id: 'h1', title: 'Deep Clean Kitchen Counters', category: 'Kitchen', points: 25, assigned_to: 'u1', completed_by: 'u1', status: 'COMPLETED', due_date: '2026-10-05' },
  { id: 't2', household_id: 'h1', title: 'Living Room Vacuuming & Mopping', category: 'Cleaning', points: 30, assigned_to: 'u2', completed_by: 'u2', status: 'COMPLETED', due_date: '2026-10-06' },
  { id: 't3', household_id: 'h1', title: 'Weekly Grocery Supply Run', category: 'Groceries', points: 20, assigned_to: 'u3', completed_by: 'u3', status: 'COMPLETED', due_date: '2026-10-06' },
  { id: 't4', household_id: 'h1', title: 'Dispose Garbage & Segregate Waste', category: 'Cleaning', points: 15, assigned_to: 'u4', completed_by: 'u4', status: 'COMPLETED', due_date: '2026-10-07' },
  { id: 't5', household_id: 'h1', title: 'Bathroom Sanitisation (Common)', category: 'Cleaning', points: 35, assigned_to: 'u1', completed_by: 'u1', status: 'COMPLETED', due_date: '2026-10-07' },
  { id: 't6', household_id: 'h1', title: 'Refill Drinking Water Dispensers', category: 'Maintenance', points: 20, assigned_to: 'u2', completed_by: 'u2', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't7', household_id: 'h1', title: 'Wash Cooking Vessels & Utensils', category: 'Kitchen', points: 20, assigned_to: 'u3', completed_by: 'u3', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't8', household_id: 'h1', title: 'Clean Refrigerator Shelves', category: 'Kitchen', points: 25, assigned_to: 'u4', completed_by: 'u4', status: 'COMPLETED', due_date: '2026-10-08' },
  { id: 't9', household_id: 'h1', title: 'Restock Toiletries & Detergent', category: 'Groceries', points: 15, assigned_to: 'u1', completed_by: null, status: 'PENDING', due_date: '2026-10-10' },
  { id: 't10', household_id: 'h1', title: 'Balcony Sweep & Plant Watering', category: 'Cleaning', points: 15, assigned_to: 'u2', completed_by: null, status: 'PENDING', due_date: '2026-10-11' },
  { id: 't11', household_id: 'h1', title: 'AC Filter Cleaning', category: 'Maintenance', points: 30, assigned_to: 'u3', completed_by: null, status: 'PENDING', due_date: '2026-10-12' },
  { id: 't12', household_id: 'h1', title: 'Sort Monthly Newspaper & Cardboard', category: 'Maintenance', points: 20, assigned_to: 'u4', completed_by: null, status: 'PENDING', due_date: '2026-10-13' }
];

let expenses = [
  { id: 'e1', household_id: 'h1', paid_by: 'u1', description: 'September Electricity Bill', amount: 2400.0, category: 'Utilities', expense_date: '2026-10-03' },
  { id: 'e2', household_id: 'h1', paid_by: 'u2', description: 'Airtel Xstream Fiber (300 Mbps)', amount: 1200.0, category: 'Internet', expense_date: '2026-10-04' },
  { id: 'e3', household_id: 'h1', paid_by: 'u3', description: 'Blinkit Superstore Bulk Ration', amount: 3600.0, category: 'Food', expense_date: '2026-10-05' },
  { id: 'e4', household_id: 'h1', paid_by: 'u4', description: 'HP Gas Cylinder Refill', amount: 1100.0, category: 'Utilities', expense_date: '2026-10-06' },
  { id: 'e5', household_id: 'h1', paid_by: 'u1', description: 'Urban Company RO Service & Supplies', amount: 1500.0, category: 'Supplies', expense_date: '2026-10-07' }
];

let expense_splits = [
  // e1: ₹2400 / 4 = ₹600 each
  { id: 's1', expense_id: 'e1', user_id: 'u1', share_amount: 600.0 },
  { id: 's2', expense_id: 'e1', user_id: 'u2', share_amount: 600.0 },
  { id: 's3', expense_id: 'e1', user_id: 'u3', share_amount: 600.0 },
  { id: 's4', expense_id: 'e1', user_id: 'u4', share_amount: 600.0 },
  // e2: ₹1200 / 4 = ₹300 each
  { id: 's5', expense_id: 'e2', user_id: 'u1', share_amount: 300.0 },
  { id: 's6', expense_id: 'e2', user_id: 'u2', share_amount: 300.0 },
  { id: 's7', expense_id: 'e2', user_id: 'u3', share_amount: 300.0 },
  { id: 's8', expense_id: 'e2', user_id: 'u4', share_amount: 300.0 },
  // e3: ₹3600 / 4 = ₹900 each
  { id: 's9', expense_id: 'e3', user_id: 'u1', share_amount: 900.0 },
  { id: 's10', expense_id: 'e3', user_id: 'u2', share_amount: 900.0 },
  { id: 's11', expense_id: 'e3', user_id: 'u3', share_amount: 900.0 },
  { id: 's12', expense_id: 'e3', user_id: 'u4', share_amount: 900.0 },
  // e4: ₹1100 / 4 = ₹275 each
  { id: 's13', expense_id: 'e4', user_id: 'u1', share_amount: 275.0 },
  { id: 's14', expense_id: 'e4', user_id: 'u2', share_amount: 275.0 },
  { id: 's15', expense_id: 'e4', user_id: 'u3', share_amount: 275.0 },
  { id: 's16', expense_id: 'e4', user_id: 'u4', share_amount: 275.0 },
  // e5: ₹1500 / 4 = ₹375 each
  { id: 's17', expense_id: 'e5', user_id: 'u1', share_amount: 375.0 },
  { id: 's18', expense_id: 'e5', user_id: 'u2', share_amount: 375.0 },
  { id: 's19', expense_id: 'e5', user_id: 'u3', share_amount: 375.0 },
  { id: 's20', expense_id: 'e5', user_id: 'u4', share_amount: 375.0 }
];

const mockStore = {
  getProfiles: () => profiles,
  
  getProfile: (id) => profiles.find(p => p.id === id),
  
  getHousehold: (id) => households.find(h => h.id === id) || households[0],
  
  getHouseholdByCode: (code) => households.find(h => h.invite_code.toUpperCase() === code.toUpperCase()),
  
  createHousehold: (name, userId) => {
    const code = 'H' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const newH = {
      id: 'h_' + Date.now(),
      name,
      invite_code: code,
      created_by: userId,
      created_at: new Date().toISOString()
    };
    households.push(newH);
    household_members.push({
      id: 'm_' + Date.now(),
      household_id: newH.id,
      user_id: userId,
      role: 'admin',
      joined_at: new Date().toISOString()
    });
    return newH;
  },

  joinHousehold: (inviteCode, userId) => {
    const h = households.find(item => item.invite_code.toUpperCase() === inviteCode.toUpperCase());
    if (!h) return { error: 'Invalid invite code' };
    const existing = household_members.find(m => m.household_id === h.id && m.user_id === userId);
    if (!existing) {
      household_members.push({
        id: 'm_' + Date.now(),
        household_id: h.id,
        user_id: userId,
        role: 'member',
        joined_at: new Date().toISOString()
      });
    }
    return { household: h };
  },

  getMembers: (householdId) => {
    return household_members
      .filter(m => m.household_id === householdId)
      .map(m => {
        const prof = profiles.find(p => p.id === m.user_id);
        return {
          ...m,
          name: prof ? prof.full_name : 'Unknown',
          email: prof ? prof.email : ''
        };
      });
  },

  getTasks: (householdId) => {
    return tasks
      .filter(t => t.household_id === householdId)
      .map(t => {
        const assigned = profiles.find(p => p.id === t.assigned_to);
        const completed = profiles.find(p => p.id === t.completed_by);
        return {
          ...t,
          assigned_name: assigned ? assigned.full_name : 'Unassigned',
          completed_name: completed ? completed.full_name : null
        };
      });
  },

  createTask: (data) => {
    const newTask = {
      id: 't_' + Date.now(),
      household_id: data.household_id || 'h1',
      title: data.title,
      description: data.description || '',
      category: data.category || 'General',
      points: Number(data.points) || 10,
      assigned_to: data.assigned_to || null,
      completed_by: null,
      status: 'PENDING',
      due_date: data.due_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    tasks.unshift(newTask);
    return newTask;
  },

  toggleTaskComplete: (taskId, userId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return null;
    if (task.status === 'COMPLETED') {
      task.status = 'PENDING';
      task.completed_by = null;
    } else {
      task.status = 'COMPLETED';
      task.completed_by = userId || task.assigned_to || 'u1';
      task.completed_at = new Date().toISOString();
    }
    return task;
  },

  deleteTask: (taskId) => {
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx !== -1) {
      tasks.splice(idx, 1);
      return true;
    }
    return false;
  },

  getExpenses: (householdId) => {
    return expenses
      .filter(e => e.household_id === householdId)
      .map(e => {
        const payer = profiles.find(p => p.id === e.paid_by);
        const splits = expense_splits.filter(s => s.expense_id === e.id);
        return {
          ...e,
          paid_by_name: payer ? payer.full_name : 'Unknown',
          splits_count: splits.length
        };
      });
  },

  createExpense: (data) => {
    const newExp = {
      id: 'e_' + Date.now(),
      household_id: data.household_id || 'h1',
      paid_by: data.paid_by || 'u1',
      description: data.description,
      amount: parseFloat(data.amount),
      category: data.category || 'General',
      expense_date: data.expense_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    expenses.unshift(newExp);

    // Compute Equal Splits
    const participantIds = data.participants && data.participants.length > 0 
      ? data.participants 
      : ['u1', 'u2', 'u3', 'u4'];
      
    const share = Math.round((newExp.amount / participantIds.length) * 100) / 100;
    
    participantIds.forEach(pId => {
      expense_splits.push({
        id: 's_' + Math.random().toString(36).substring(2, 9),
        expense_id: newExp.id,
        user_id: pId,
        share_amount: share
      });
    });

    return newExp;
  },

  deleteExpense: (expenseId) => {
    const idx = expenses.findIndex(e => e.id === expenseId);
    if (idx !== -1) {
      expenses.splice(idx, 1);
      expense_splits = expense_splits.filter(s => s.expense_id !== expenseId);
      return true;
    }
    return false;
  },

  getDashboardData: (householdId) => {
    const hTasks = tasks.filter(t => t.household_id === householdId);
    const hExpenses = expenses.filter(e => e.household_id === householdId);
    const members = household_members.filter(m => m.household_id === householdId);

    const pendingChores = hTasks.filter(t => t.status === 'PENDING').length;
    const completedChores = hTasks.filter(t => t.status === 'COMPLETED').length;
    const totalExpenses = hExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

    // Calculate Chore Points per Member for Bar Chart
    const pointsData = profiles.map(user => {
      const userPoints = hTasks
        .filter(t => t.status === 'COMPLETED' && t.completed_by === user.id)
        .reduce((sum, t) => sum + (t.points || 0), 0);
      return {
        id: user.id,
        name: user.full_name.split(' ')[0],
        full_name: user.full_name,
        points: userPoints
      };
    });

    // Calculate Net Financial Balances per Member
    // Net Balance = (Total Paid by User) - (Total Expected Share of User)
    const balanceData = profiles.map(user => {
      const totalPaid = hExpenses
        .filter(e => e.paid_by === user.id)
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const totalOwed = expense_splits
        .filter(s => s.user_id === user.id && hExpenses.some(e => e.id === s.expense_id))
        .reduce((sum, s) => sum + Number(s.share_amount), 0);

      const netBalance = Math.round((totalPaid - totalOwed) * 100) / 100;

      return {
        id: user.id,
        name: user.full_name,
        totalPaid,
        totalOwed,
        netBalance // >0 means user should receive money, <0 means user owes money
      };
    });

    return {
      kpis: {
        pendingChores,
        completedChores,
        totalExpenses,
        totalMembers: members.length
      },
      pointsData,
      balanceData,
      recentChores: hTasks.slice(0, 5),
      recentExpenses: hExpenses.slice(0, 5)
    };
  }
};

module.exports = mockStore;
