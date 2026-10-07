const express = require('express');
const router = express.Router();
const mockStore = require('../data/mockStore');

// GET full dashboard summary metrics, charts & balances
router.get('/:householdId', (req, res) => {
  const data = mockStore.getDashboardData(req.params.householdId || 'h1');
  res.json(data);
});

module.exports = router;
