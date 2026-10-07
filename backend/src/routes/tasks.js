const express = require('express');
const router = express.Router();
const mockStore = require('../data/mockStore');

// GET all tasks for a household
router.get('/', (req, res) => {
  const householdId = req.query.householdId || 'h1';
  const tasks = mockStore.getTasks(householdId);
  res.json(tasks);
});

// POST create chore task
router.post('/', (req, res) => {
  const { title, description, category, points, assigned_to, due_date, household_id } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const task = mockStore.createTask({
    title,
    description,
    category,
    points,
    assigned_to,
    due_date,
    household_id: household_id || 'h1'
  });
  res.status(201).json(task);
});

// PATCH toggle complete status
router.patch('/:id/toggle', (req, res) => {
  const { userId } = req.body;
  const updated = mockStore.toggleTaskComplete(req.params.id, userId || 'u1');
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const success = mockStore.deleteTask(req.params.id);
  if (!success) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
