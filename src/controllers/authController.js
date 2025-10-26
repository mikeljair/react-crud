const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/db_adapter');
require('dotenv').config();

const User = db.models.User;
const isSQL = typeof User.findAll === 'function';

const register = async (req, res) => {
    try {
        let {first_name, last_name, email, password, role} = req.body;
        email = email.trim().toLowerCase();
        const existing = isSQL
            ? await User.findOne({where: {email}})
            : await User.findOne({email: email});

        if (existing) {
            return res.status(400).json({msg: 'El correo ya está registrado'});
        }

        const hashed = await bcrypt.hash(password, 10);
        let user;
        if (isSQL) {
            user = await User.create({first_name, last_name, email, password: hashed, role: role || 'user'});
        } else {
            user = new User({first_name, last_name, email, password: hashed, role: role || 'user'});
            await user.save();
        }

        const userId = isSQL ? user.id : user._id.toString();
        const token = jwt.sign({id: userId, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'});
        res.status(201).json({msg: 'Usuario registrado con éxito', user, token});

    } catch (err) {
        res.status(500).json({msg: 'Error al registrar usuario', error: err.message});
    }
};

const login = async (req, res) => {
    try {
        let {email, password} = req.body;
        email = email.trim().toLowerCase();
        const user = isSQL
            ? await User.findOne({where: {email}})
            : await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }

        const userId = isSQL ? user.id : user._id.toString();
        const token = jwt.sign({id: userId, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'});
        res.json({msg: 'Login exitoso', user, token});

    } catch (err) {
        res.status(500).json({msg: 'Error al iniciar sesión', error: err.message});
    }
};

module.exports = {register, login};
