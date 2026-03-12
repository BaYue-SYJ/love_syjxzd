const express = require('express');
const { addTimeline, listTimeline } = require('../controllers/timelineController');

const router = express.Router();

router.post('/add', addTimeline);
router.get('/list', listTimeline);

module.exports = router;
