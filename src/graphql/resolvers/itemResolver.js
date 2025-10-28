const db = require('../../db/db_adapter');
const Item = db.models.Item;

function formatDate(ts) {
    const d = new Date(Number(ts));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ` +
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

const itemResolver = {
    items: async () => {
        const items = await Item.findAll();
        return items.map(i => ({
            id: i.id.toString(),
            name: i.name,
            description: i.description,
            price: i.price,
            createdAt: formatDate(i.createdAt),
            updatedAt: formatDate(i.updatedAt)
        }));
    },
    item_create: async (parent, args) => {
        const newItem = await Item.create({
            name: args.name,
            description: args.description,
            price: args.price,
        });
        return newItem;
    },
    item_update: async (parent, args) => {
        const itemToUpdate = await Item.findByPk(args.id);
        if (!itemToUpdate) {
            throw new Error('Ítem no encontrado');
        }
        if (args.name !== undefined) itemToUpdate.name = args.name;
        if (args.description !== undefined) itemToUpdate.description = args.description;
        if (args.price !== undefined) itemToUpdate.price = args.price;
        await itemToUpdate.save();
        return itemToUpdate;
    },
    item_delete: async (parent, args) => {
        const itemToDelete = await Item.findByPk(args.id);
        if (!itemToDelete) {
            throw new Error('Ítem no encontrado');
        }
        await itemToDelete.destroy();
        return itemToDelete;
    }
};

module.exports = itemResolver;
