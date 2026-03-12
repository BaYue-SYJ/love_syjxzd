const express = require('express');
const { addDiary, listDiary } = require('../controllers/diaryController');

const router = express.Router();

router.post('/add', addDiary);
router.get('/list', listDiary);

module.exports = router;
