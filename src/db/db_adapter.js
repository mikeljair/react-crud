require('dotenv').config();
const DB_TYPE = process.env.DB_TYPE;
console.log('DB_TYPE:', DB_TYPE);

let db;

if (DB_TYPE === 'mongo') {
    db = require('./db_mongo');
    console.log('🟢 Usando MongoDB');
} else if (DB_TYPE === 'postgres') {
    db = require('./db_sql');
    console.log('🟣 Usando PostgreSQL');
} else {
    throw new Error(`❌ DB_TYPE no soportado: ${DB_TYPE}`);
}

module.exports = db;
