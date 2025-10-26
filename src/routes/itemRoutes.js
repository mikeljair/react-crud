const express = require('express');
const {getAllItems, getItemById, createItem, updateItem, deleteItem} = require('../controllers/itemController');
const {verifyToken, isAdmin} = require('../middleware/authMiddleware');
const {itemValidator} = require('../validators/itemValidator');
const {validateFields} = require('../middleware/validateFields');

const router = express.Router();

router.get('/', verifyToken, getAllItems);
router.get('/:id', verifyToken, getItemById);

router.post('/', verifyToken, isAdmin, itemValidator, validateFields, createItem);
router.put('/:id', verifyToken, isAdmin, itemValidator, validateFields, updateItem);
router.delete('/:id', verifyToken, isAdmin, deleteItem);

module.exports = router;