const jwt = require('jsonwebtoken');
const { failResponse } = require('../utils/responseHandler');
const { Messages } = require('../utils/constants');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return failResponse(res, Messages.ERROR_TOKEN_NOT_PROVIDED, null, 401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error al verificar token:', err);
      return failResponse(res, Messages.ERROR_TOKEN_INVALID, null, 403);
    }
    req.user = user;
    next();
  });
};

const authorizeRoles = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: 'Acceso denegado: Rol de usuario no disponible' });
    }

    const hasPermission = roles.some((role) => req.user.roles.includes(role));

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado: No tienes el rol requerido' });
    }
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
