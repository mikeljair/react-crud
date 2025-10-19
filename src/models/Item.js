class Item {
    constructor() {
        this.items = [];
        this.counter = 1;
    }

    create({name, description, price}) {
        const item = {
            id: this.counter++,
            name,
            description: description || '',
            price: Number(price),
            created_at: new Date()
        };
        this.items.push(item);
        return item;
    }

    findAll() {
        return this.items;
    }

    findById(id) {
        return this.items.find(i => i.id === Number(id));
    }

    update(id, data) {
        const item = this.findById(id);
        if (!item) return null;
        Object.assign(item, data);
        return item;
    }

    delete(id) {
        const index = this.items.findIndex(i => i.id === Number(id));
        if (index === -1) return false;
        this.items.splice(index, 1);
        return true;
    }
}

const itemDB = new Item();

module.exports = {Item, itemDB};
