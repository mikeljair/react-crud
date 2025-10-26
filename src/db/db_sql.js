require('dotenv').config();

const {Sequelize, DataTypes} = require('sequelize');

const pgPort = Number(process.env.PG_PORT) || 5432;

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        port: pgPort,
        dialect: 'postgres',
        logging: false,
    }
);

console.log('PG_PASSWORD type:', typeof process.env.PG_PASSWORD, 'value:', process.env.PG_PASSWORD);

const User = sequelize.define('User', {
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'user'},
});

const Item = sequelize.define('Item', {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.STRING,
    price: {type: DataTypes.FLOAT, allowNull: false},
});
const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log('✅ Conectado a PostgreSQL y tablas sincronizadas');
    } catch (err) {
        console.error('❌ Error conectando a PostgreSQL:', err.message);
        throw err;
    }
};

module.exports = {connect, models: {User, Item}};
