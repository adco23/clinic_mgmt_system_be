const AppConstants = {
  Status: {
    OK                   : 200,
    CREATED              : 201,
    BAD_REQUEST          : 400,
    UNAUTHORIZED         : 401,
    NOT_FOUND            : 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  Messages: {
    OK                     : 'OK',
    CREATED                : 'Creado exitosamente.',
    UPDATED                : 'Actualizado exitosamente.',
    DELETED                : 'Eliminado exitosamente.',
    BAD_REQUEST            : 'Solicitud incorrecta.',


    ERROR_FETCHING_DATA      : 'Error al obtener los datos: ',
    ERROR_AUTHENTICATION_FAILED: 'Error de autenticación.',
    ERROR_INTERNAL_SERVER      : 'Error interno del servidor.',
    ERROR_CREDENTIALS_REQUIRED : 'Credenciales requeridas.',
    ERROR_MISSING_FIELDS       : 'Campos faltantes.',
    ERROR_INVALID_INPUT        : 'Entrada de datos inválida.',
    ERROR_USER_NOT_FOUND       : 'Usuario no encontrado.',
    ERROR_DATABASE_ERROR       : 'Error de la base de datos.',
    ERROR_USER_ALREADY_EXISTS  : 'El usuario ya existe.',
    ERROR_EMAIL_ALREADY_EXISTS : 'El correo electrónico ya está en uso.',
    ERROR_TOKEN_NOT_PROVIDED   : 'Token no proporcionado.',
    ERROR_TOKEN_INVALID        : 'Token inválido o expirado.',
    ERROR_PASSWORDS_DO_NOT_MATCH: 'Las contraseñas no coinciden.',

    REGISTER_SUCCESS: 'Registro exitoso.',
    LOGIN_SUCCESS   : 'Inicio de sesión exitoso.',
    AUTH_SUCCESS    : 'Autenticación exitosa.',

    LIST_SUCCESS  : 'Lista obtenida exitosamente.',
    LIST_FAILED   : 'Error al obtener la lista.',
    DETAIL_SUCCESS: 'Detalles obtenidos exitosamente.',
    DETAIL_FAILED : 'Error al obtener los detalles.',
    DELETE_SUCCESS: 'Eliminación exitosa.',
    DELETE_FAILED : 'Error al eliminar.',
  },

  Roles: {
    ADMIN       : 'admin',
    DOCTOR      : 'doctor',
    PATIENT     : 'patient',
    GUEST       : 'guest',
    RECEPTIONIST: 'receptionist',
    STAFF       : 'staff',
  },

  APP_NAME   : 'MiAplicacionWeb',
  MAX_RETRIES: 3,
};

module.exports = AppConstants;
