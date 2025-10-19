const bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.users = [];
        this.counter = 1;
    }

    async create({first_name, last_name, email, password, role}) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: this.counter++,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || 'user',
            created_at: new Date()
        };
        this.users.push(user);
        return user;
    }

    findAll() {
        return this.users;
    }

    findById(id) {
        return this.users.find(u => u.id === Number(id));
    }

    findByEmail(email) {
        return this.users.find(u => u.email === email);
    }

    update(id, data) {
        const user = this.findById(id);
        if (!user) return null;
        Object.assign(user, data);
        return user;
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id === Number(id));
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}

const userDB = new User();

module.exports = {User, userDB};
