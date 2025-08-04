const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../db');
const { Messages, Roles, Status } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');
const secretKey = process.env.SECRET || 'secret';

    // email: '',
    // password: '',
    // confirmPassword: '',
    // role: '',

exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, role } = req.body;

    if (!password || !email || !confirmPassword || !role ) return failResponse(res, Messages.ERROR_MISSING_FIELDS, null, 400);

    const existingEmail = await prisma.User.findUnique({
      where: { email },
    });

    if (existingEmail) return failResponse(res, Messages.ERROR_EMAIL_ALREADY_EXISTS, null, 400);

    if (password !== confirmPassword) return failResponse(res, Messages.ERROR_PASSWORDS_DO_NOT_MATCH, null, 400);

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = await prisma.User.create({
      data: { email, password: hashedPass, roles: {
        create: [{ role: { connect: {name: (!role ?  Roles.GUEST : role)}}}]
      } },
    });

    return successResponse(res, Messages.REGISTER_SUCCESS, { userId: newUser.id }, 201);
  } catch (error) {
    console.error('Error during registration:', error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: Messages.ERROR_CREDENTIALS_REQUIRED });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: Messages.ERROR_USER_NOT_FOUND });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: Messages.ERROR_AUTHENTICATION_FAILED });

    const token = jwt.sign({ id: user.id, username: user.username/*, roles: user.roles.map(role => role.name)*/ }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: Messages.AUTH_SUCCESS, token });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  return res.status(200).json({ message: 'You have access' });
};

exports.getRoles = async (req, res) => {
  try {
    const result = await prisma.Role.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return successResponse(res, "OK", result);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, "error");
  }
}
