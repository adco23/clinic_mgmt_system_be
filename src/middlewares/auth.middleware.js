const jwt = require('jsonwebtoken');
const prisma = require('../db');
const { failResponse } = require('../utils/responseHandler');
const { Messages } = require('../utils/constants');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authenticateToken = (roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return failResponse(res, Messages.ERROR_TOKEN_NOT_PROVIDED, null, 401);

    // jwt.verify(token, JWT_SECRET, (err, user) => {
    //   if (err) {
    //     console.error('Error al verificar token:', err);
    //     return failResponse(res, Messages.ERROR_TOKEN_INVALID, null, 403);
    //   }
    //   req.user = user;
    //   next(token);
    // });

    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRoles = decoded.roles; // nombre de roles del usuario desde el token

      if (!roles || roles.length === 0) return next();

      if (!userRoles || userRoles.length === 0) return res.status(403).send('Acceso denegado: No tienes roles asignados.');

      const hasAccess = roles.some(role => userRoles.includes(role));

      if (hasAccess) {
        next(); // Permitir acceso
      } else {
        res.status(403).send('Acceso denegado: No tienes los roles necesarios.');
      }
    } catch (error) {
      // Error de validación del JWT (expirado, inválido, etc.)
      res.status(401).send('Token inválido o expirado.');
    }
  }
};

module.exports = {
  Auth: authenticateToken
};
