const sequelize = require('../db/db_sql');
const User = require('./User');
const Item = require('./Item');

(async () => {
    await sequelize.sync({alter: true});
    console.log('🗄️ Tablas sincronizadas con MySQL');
})();

module.exports = {User, Item};
