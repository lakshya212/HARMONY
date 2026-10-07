const express = require('express');
const router = express.Router();
const mockStore = require('../data/mockStore');

// GET admin summary & audit data
router.get('/summary', (req, res) => {
  const householdId = req.query.householdId || 'h1';
  const household = mockStore.getHousehold(householdId);
  const members = mockStore.getMembers(householdId);
  const tasks = mockStore.getTasks(householdId);
  const expenses = mockStore.getExpenses(householdId);

  res.json({
    household,
    members,
    totalTasks: tasks.length,
    totalExpenses: expenses.length,
    auditLog: [
      { id: 1, action: 'Household Initialized', target: 'Green Residency', timestamp: '2026-10-01' },
      { id: 2, action: 'Member Joined', target: 'Rahul Verma via GRN101', timestamp: '2026-10-02' },
      { id: 3, action: 'Member Joined', target: 'Aman Gupta via GRN101', timestamp: '2026-10-02' },
      { id: 4, action: 'Member Joined', target: 'Rohit Kumar via GRN101', timestamp: '2026-10-03' },
      { id: 5, action: 'Expense Logged', target: '₹2,400 Electricity Bill (Split 4-ways)', timestamp: '2026-10-03' },
      { id: 6, action: 'Chore Completed', target: 'Deep Clean Kitchen (25 pts)', timestamp: '2026-10-05' }
    ]
  });
});

module.exports = router;
