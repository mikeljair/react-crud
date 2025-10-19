const {body} = require('express-validator');

const registerValidator = [
    body('first_name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage('El nombre solo debe contener letras'),

    body('last_name')
        .notEmpty().withMessage('El apellido es obligatorio')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage('El apellido solo debe contener letras'),

    body('email')
        .isEmail().withMessage('Correo electrónico inválido'),

    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('Debe tener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('Debe tener al menos un número'),

    body('role')
        .optional()
        .isIn(['admin', 'user']).withMessage('Rol no permitido'),
];

module.exports = {registerValidator};
