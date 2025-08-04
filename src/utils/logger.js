require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, cli, colorize, align, simple } = format;

const levelColored = (level) => {
  switch (level) {
    case 'error':
      return `\x1b[31m${level.toUpperCase()}\x1b[0m`; // Red
    case 'warn':
      return `\x1b[33m${level.toUpperCase()}\x1b[0m`; // Yellow
    case 'info':
      return `\x1b[32m${level.toUpperCase()}\x1b[0m`; // Green
    case 'debug':
      return `\x1b[36m${level.toUpperCase()}\x1b[0m`; // Cyan
    default:
      return level.toUpperCase(); // No color for other levels
  }
}

const logFormat = combine(
  align(),
  format.errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(info => `${info.timestamp} ${levelColored(info.level)} ${info.message}`)
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Nivel de log por defecto
  format: logFormat,
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;
