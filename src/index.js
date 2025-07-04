require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const prisma = require('./db');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

// Ruta de prueba

app.get('/', (req, res) => {
  res.send('¡Hola desde tu backend con Express y Prisma!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use(errorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`✨ Servidor escuchando en http://localhost:${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
