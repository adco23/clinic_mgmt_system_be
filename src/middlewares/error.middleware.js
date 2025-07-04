const errorHandler = (err, req, res, next) => {
  // 1. Loguea el error para depuración interna
  console.error(err); // En desarrollo, puedes loguear el objeto de error completo.

  // 2. Determina el código de estado HTTP
  // Por defecto, un error interno del servidor
  const statusCode = err.statusCode || 500; 

  // 3. Prepara la respuesta de error
  let errorResponse = {
    status: 'error',
    message: err.message || 'Ocurrió un error inesperado en el servidor.',
  };

  // 4. Personaliza el mensaje de error y detalles para producción vs. desarrollo
  if (process.env.NODE_ENV === 'production') {
    // En producción, no expongas detalles sensibles ni stack traces
    if (statusCode === 500) {
      errorResponse.message = 'Ocurrió un error interno del servidor.';
    }
    // Puedes tener lógica adicional para errores específicos conocidos en producción
    // Por ejemplo, para errores de validación, podrías devolver un mensaje más genérico
  } else {
    // En desarrollo, puedes incluir el stack trace para facilitar la depuración
    errorResponse.error = {
      message: err.message,
      // code: err.code, // Si tus errores personalizados tienen un código
      stack: err.stack,
    };
  }
  
  // 5. Envía la respuesta JSON
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;