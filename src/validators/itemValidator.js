const {body} = require('express-validator');

const itemValidator = [
    body('name')
        .notEmpty().withMessage('El nombre del ítem es obligatorio')
        .isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),

    body('description')
        .optional()
        .isLength({max: 200}).withMessage('La descripción no debe exceder 200 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({min: 0}).withMessage('El precio debe ser un número mayor o igual a 0'),
];

module.exports = {itemValidator};
