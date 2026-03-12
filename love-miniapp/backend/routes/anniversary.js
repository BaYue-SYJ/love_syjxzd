const express = require('express');
const { addAnniversary, listAnniversary } = require('../controllers/anniversaryController');

const router = express.Router();

router.post('/add', addAnniversary);
router.get('/list', listAnniversary);

module.exports = router;
