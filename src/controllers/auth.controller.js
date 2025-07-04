const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../db');
const { Messages } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');
const secretKey = process.env.SECRET || 'secret';

exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) return failResponse(res, Messages.ERROR_CREDENTIALS_REQUIRED, null, 400);

    const existingUser = await prisma.User.findUnique({
      where: { username }
    });

    if (existingUser) return failResponse(res, Messages.ERROR_USER_ALREADY_EXISTS, null, 400);

    const existingEmail = await prisma.User.findUnique({
      where: { email }
    })

    if (existingEmail) return failResponse(res, Messages.ERROR_EMAIL_ALREADY_EXISTS, null, 400);

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
      data: { username, password: hashedPass, email },
    });

    return successResponse(res, Messages.REGISTER_SUCCESS, { userId: newUser.id }, 201);
  } catch (error) {
    console.error('Error during registration:', error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: Messages.ERROR_CREDENTIALS_REQUIRED });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(404).json({ message: Messages.ERROR_USER_NOT_FOUND });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: Messages.ERROR_AUTHENTICATION_FAILED });

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: Messages.AUTH_SUCCESS, token });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  return res.status(200).json({ message: 'You have access' });
};
