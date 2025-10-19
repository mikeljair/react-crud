const {itemDB} = require('../models/Item');

// Listar todos
const getAllItems = (req, res) => {
    const items = itemDB.findAll();
    res.json(items);
};

// Obtener por ID
const getItemById = (req, res) => {
    const item = itemDB.findById(req.params.id);
    if (!item) return res.status(404).json({msg: 'Ítem no encontrado'});
    res.json(item);
};

// Crear
const createItem = (req, res) => {
    let {name, description, price} = req.body;

    name = name?.trim();
    description = description?.trim();

    if (!name || price === undefined || price === null)
        return res.status(400).json({msg: 'Nombre y precio son obligatorios'});

    if (isNaN(price) || Number(price) < 0)
        return res.status(400).json({msg: 'El precio debe ser un número mayor o igual a 0'});

    const newItem = itemDB.create({name, description, price: Number(price)});
    res.status(201).json({msg: 'Ítem creado', item: newItem});
};

// Actualizar
const updateItem = (req, res) => {
    const {name, description, price} = req.body;

    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
        return res.status(400).json({msg: 'El precio debe ser un número mayor o igual a 0'});
    }

    const updated = itemDB.update(req.params.id, {
        name: name?.trim(),
        description: description?.trim(),
        price: price !== undefined ? Number(price) : undefined
    });

    if (!updated) return res.status(404).json({msg: 'Ítem no encontrado'});
    res.json({msg: 'Ítem actualizado', item: updated});
};

// Eliminar
const deleteItem = (req, res) => {
    const ok = itemDB.delete(req.params.id);
    if (!ok) return res.status(404).json({msg: 'Ítem no encontrado'});
    res.json({msg: 'Ítem eliminado'});
};

module.exports = {getAllItems, getItemById, createItem, updateItem, deleteItem};
