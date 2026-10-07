const express = require('express');
const router = express.Router();
const mockStore = require('../data/mockStore');

// GET all expenses for a household
router.get('/', (req, res) => {
  const householdId = req.query.householdId || 'h1';
  const expenses = mockStore.getExpenses(householdId);
  res.json(expenses);
});

// POST create shared expense with equal split
router.post('/', (req, res) => {
  const { description, amount, category, paid_by, participants, expense_date, household_id } = req.body;
  if (!description || !amount) {
    return res.status(400).json({ error: 'Description and amount are required' });
  }
  const expense = mockStore.createExpense({
    description,
    amount,
    category,
    paid_by: paid_by || 'u1',
    participants: participants || ['u1', 'u2', 'u3', 'u4'],
    expense_date,
    household_id: household_id || 'h1'
  });
  res.status(201).json(expense);
});

// DELETE expense
router.delete('/:id', (req, res) => {
  const success = mockStore.deleteExpense(req.params.id);
  if (!success) return res.status(404).json({ error: 'Expense not found' });
  res.json({ message: 'Expense deleted successfully' });
});

module.exports = router;
