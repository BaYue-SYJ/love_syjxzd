const express = require('express');
const { login, getUserInfo, bindCouple } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.get('/user/info', getUserInfo);
router.post('/user/bind', bindCouple);

module.exports = router;
