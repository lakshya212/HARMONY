const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'HARMONY API (BCA-508 Minor Project)',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
