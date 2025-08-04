require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const prisma = require('./db');
const errorHandler = require('./middlewares/error.middleware');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(express.json());
app.use(cors());

// app.use(morgan(function (tokens, req, res) {
//   const status = tokens.status(req, res);
//   let statusColor;

//   if (status >= 500) {
//     statusColor = `\x1b[31m${status}\x1b[0m`; //rojo
//   } else if (status >= 400) {
//     statusColor = `\x1b[33m${status}\x1b[0m` // amarillo
//   } else if (status >= 300) {
//     statusColor = `\x1b[36m${status}\x1b[0m` //cyan
//   } else {
//     statusColor = `\x1b[32m${status}\x1b[0m` //verde
//   }

//   return [
//     `[morgan] \x1b[32m${tokens.method(req, res)}\x1b[0m`,
//     tokens.url(req, res),
//     statusColor,
//     tokens['response-time'](req, res) + 'ms'
//   ].join(' ')
// }));

// Ruta de prueba

app.use((req, res, next) => {
  const startTime = Date.now();

  logger.info(`\x1b[32m${req.method}\x1b[0m ${req.originalUrl} - Solicitud recibida`);
  logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
  logger.debug(`Params: ${JSON.stringify(req.params)}`);
  logger.debug(`Query: ${JSON.stringify(req.query)}`);
  logger.debug(`Body: ${JSON.stringify(req.body)}`);

  const originalSend = res.send;
  res.send = function (body) {
    res.responseBody = body;
    return originalSend.call(this, body);
  }

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColored = res.statusCode >= 500 ? '\x1b[31m' : res.statusCode >= 400 ? '\x1b[33m' : res.statusCode >= 300 ? '\x1b[36m' : '\x1b[32m';

    logger.info(`\x1b[32m${req.method}\x1b[0m ${req.originalUrl} ${statusColored}${res.statusCode}\x1b[0m ${duration} ms - Solicitud procesada`);
    logger.debug(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
    logger.debug(`Response Body: ${res.responseBody}`);
  });

  next();
})
app.get('/', (req, res) => {
  res.send('¡Hola desde tu backend con Express y Prisma!');
});

app.use('/api', routes);

app.use(errorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`✨ Servidor escuchando en http://localhost:${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
