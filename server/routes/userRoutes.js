const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.send('Welcome Admin');
});

router.get('/manager', verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.send('Welcome Manager');
});

router.get('/user', verifyToken, authorizeRoles("admin","manager","user"), (req, res) => {
    res.send('Welcome User');
});

module.exports = router;