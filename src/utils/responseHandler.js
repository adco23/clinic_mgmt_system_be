/**
 * Maneja respuestas exitosas.
 * @param {Response} res
 * @param {string} message
 * @param {*} data
 * @param {number} [statusCode=200]
 * @returns
 */
const successResponse = (res, message, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'Success',
    message,
    data,
  });
};

/**
 * Maneja respuestas de fallo.
 * @param {Response} res
 * @param {string} message
 * @param {*} errors
 * @param {number} [statusCode=400]
 * @returns
 */
const failResponse = (res, message, errors, statusCode = 400) => {
  return res.status(statusCode).json({
    status: 'Fail',
    message,
    errors,
  });
};

/**
 * Maneja respuestas de error.
 * @param {Response} res
 * @param {string} message
 * @param {*} error
 * @param {number} [statusCode=500]
 * @returns
 */
const errorResponse = (res, message, error, statusCode = 500) => {
  // En producción, podrías querer registrar el error y enviar un mensaje genérico.
  // console.error(error);
  return res.status(statusCode).json({
    status: 'Error',
    message,
    error: {
      code: error.code || 'UNKNOWN_ERROR', // Un código de error interno si lo tienes
      message: error.message || 'Error interno del servidor',
      // No incluyas stack traces en producción por seguridad
      // stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    },
  });
};

module.exports = {
  successResponse,
  failResponse,
  errorResponse,
};
