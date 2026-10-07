const express = require('express');
const router = express.Router();
const mockStore = require('../data/mockStore');

// GET household details
router.get('/:id', (req, res) => {
  const h = mockStore.getHousehold(req.params.id);
  if (!h) return res.status(404).json({ error: 'Household not found' });
  const members = mockStore.getMembers(h.id);
  res.json({ household: h, members });
});

// POST create household
router.post('/', (req, res) => {
  const { name, userId } = req.body;
  if (!name) return res.status(400).json({ error: 'Household name is required' });
  const created = mockStore.createHousehold(name, userId || 'u1');
  res.status(201).json(created);
});

// POST join household via invite code
router.post('/join', (req, res) => {
  const { inviteCode, userId } = req.body;
  if (!inviteCode) return res.status(400).json({ error: 'Invite code is required' });
  const result = mockStore.joinHousehold(inviteCode, userId || 'u1');
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

// GET household members
router.get('/:id/members', (req, res) => {
  const members = mockStore.getMembers(req.params.id);
  res.json(members);
});

module.exports = router;
