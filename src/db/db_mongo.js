const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const init = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI no está definida en las variables de entorno');
  }
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
    mongoose.connection.on('error', err => console.error('MongoDB error:', err));
    mongoose.connection.on('disconnected', () => console.warn('MongoDB desconectado'));
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    throw err;
  }
};


const User = mongoose.models.User || mongoose.model('User', /* userSchema */ new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}));

const Item = mongoose.models.Item || mongoose.model('Item', /* itemSchema */ new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
}));

module.exports = { init, models: { User, Item } };
