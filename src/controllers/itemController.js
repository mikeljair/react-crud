const db = require('../db/db_adapter');
const Item = db.models.Item;
const isSQL = typeof Item.findAll === 'function';

const getAllItems = async (req, res) => {
    try {
        const items = isSQL ? await Item.findAll() : await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({msg: 'Error al listar ítems', error: err.message});
    }
};

const getItemById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'undefined') {
            return res.status(400).json({msg: 'ID no proporcionado'});
        }

        let item;
        if (isSQL) {
            item = await Item.findByPk(id);
        } else {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({msg: 'Formato de ID inválido', receivedId: id});
            }
            item = await Item.findById(id);
        }

        if (!item) {
            return res.status(404).json({msg: 'Ítem no encontrado'});
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({msg: 'Error al obtener ítem', error: err.message});
    }
};

const createItem = async (req, res) => {
    try {
        const {name, description, price} = req.body;
        if (!name || price === undefined) {
            return res.status(400).json({msg: 'Nombre y precio son obligatorios'});
        }
        if (isNaN(price) || Number(price) < 0) {
            return res.status(400).json({msg: 'El precio debe ser un número válido'});
        }

        let item;
        if (isSQL) {
            item = await Item.create({name, description, price});
        } else {
            item = new Item({name, description, price});
            await item.save();
        }

        res.status(201).json({msg: 'Ítem creado', item});
    } catch (err) {
        res.status(500).json({msg: 'Error al crear ítem', error: err.message});
    }
};

const updateItem = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price} = req.body;
        if (!id || id === 'undefined') {
            return res.status(400).json({msg: 'ID no proporcionado o inválido'});
        }

        let item;
        if (isSQL) {
            item = await Item.findByPk(id);
        } else {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({msg: 'Formato de ID inválido para MongoDB', receivedId: id});
            }
            item = await Item.findById(id);
        }

        if (!item) {
            return res.status(404).json({msg: 'Ítem no encontrado'});
        }

        if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
            return res.status(400).json({msg: 'El precio debe ser un número válido'});
        }

        if (isSQL) {
            await item.update({
                name: name ?? item.name,
                description: description ?? item.description,
                price: price ?? item.price
            });
        } else {
            item.name = name ?? item.name;
            item.description = description ?? item.description;
            item.price = price ?? item.price;
            await item.save();
        }

        res.json({msg: 'Ítem actualizado', item});
    } catch (err) {
        res.status(500).json({msg: 'Error al actualizar ítem', error: err.message});
    }
};

const deleteItem = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'undefined') {
            return res.status(400).json({msg: 'ID no proporcionado o inválido'});
        }

        let deleted;
        if (isSQL) {
            deleted = await Item.destroy({where: {id}});
        } else {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({msg: 'Formato de ID inválido para MongoDB', receivedId: id});
            }
            deleted = await Item.findByIdAndDelete(id);
        }

        if (!deleted) {
            return res.status(404).json({msg: 'Ítem no encontrado'});
        }

        res.json({msg: 'Ítem eliminado'});
    } catch (err) {
        res.status(500).json({msg: 'Error al eliminar ítem', error: err.message});
    }
};

module.exports = {getAllItems, getItemById, createItem, updateItem, deleteItem};
