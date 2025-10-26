require('dotenv').config();
const app = require('./app');
const db = require('./db/db_adapter');

const PORT = process.env.PORT || 4000;

(async () => {
    try {
        // Inicializa la DB (PostgreSQL o Mongo)
        if (db.connect) await db.connect(); // PostgreSQL
        if (db.init) await db.init();       // MongoDB

        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
})();
