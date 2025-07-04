const AppConstants = {
  Status: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  Messages: {
    ERROR_AUTHENTICATION_FAILED: 'Error de autenticación.',
    ERROR_INTERNAL_SERVER: 'Error interno del servidor.',
    ERROR_CREDENTIALS_REQUIRED: 'Credenciales requeridas.',
    ERROR_INVALID_INPUT: 'Entrada de datos inválida.',
    ERROR_USER_NOT_FOUND: 'Usuario no encontrado.',
    ERROR_DATABASE_ERROR: 'Error de la base de datos.',
    ERROR_USER_ALREADY_EXISTS: 'El usuario ya existe.',
    ERROR_EMAIL_ALREADY_EXISTS: 'El correo electrónico ya está en uso.',
    REGISTER_SUCCESS: 'Registro exitoso.',
    LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
    AUTH_SUCCESS: 'Autenticación exitosa.',
    ERROR_TOKEN_NOT_PROVIDED: 'Token no proporcionado.',
    ERROR_TOKEN_INVALID: 'Token inválido o expirado.',
  },

  APP_NAME: 'MiAplicacionWeb',
  MAX_RETRIES: 3,
};

module.exports = AppConstants;
