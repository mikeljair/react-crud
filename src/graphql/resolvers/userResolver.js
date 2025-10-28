const db = require('../../db/db_adapter');
const User = db.models.User;

function formatDate(ts) {
    const d = new Date(Number(ts));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ` +
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

const userResolver = {
    users: async () => {
        const users = await User.findAll();
        return users.map(u => ({
            id: u.id.toString(),
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            role: u.role,
            createdAt: formatDate(u.createdAt),
            updatedAt: formatDate(u.updatedAt)
        }));
    },
};

module.exports = userResolver;
