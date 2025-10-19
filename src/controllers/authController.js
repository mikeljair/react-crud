const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {userDB} = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
    const {first_name, last_name, email, password, role} = req.body;

    if (userDB.findByEmail(email)) {
        return res.status(400).json({msg: 'El correo ya está registrado'});
    }

    const user = await userDB.create({first_name, last_name, email, password, role});
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'});

    res.status(201).json({msg: 'Usuario registrado con éxito', user, token});
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = userDB.findByEmail(email);
    if (!user) return res.status(404).json({msg: 'Usuario no encontrado'});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({msg: 'Contraseña incorrecta'});

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'});
    res.json({msg: 'Login exitoso', user, token});
};

module.exports = {register, login};
