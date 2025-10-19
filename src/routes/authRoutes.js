const express = require('express');
const {register, login} = require('../controllers/authController');
const {registerValidator} = require('../validators/authValidator');
const {validateFields} = require('../middleware/validateFields');
const {verifyToken, revokeToken} = require('../middleware/authMiddleware');

const router = express.Router();

// Registro
router.post('/register', registerValidator, validateFields, register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', verifyToken, (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    revokeToken(token);
    res.json({msg: 'Logout exitoso. Token invalidado.'});
});

module.exports = router;
