const prisma = require('../db');
const { Messages, Status } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.User.findMany();
    return successResponse(res, Messages.USER_LIST_SUCCESS, users);
  } catch (error) {
    return errorResponse(res, Messages.USER_LIST_FAILED, error);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.User.findUnique({
      where: { id: Number(id) },
    });
    if (!user) return failResponse(res, Messages.ERROR_USER_NOT_FOUND, null, Status.NOT_FOUND);
    return successResponse(res, Messages.USER_DETAIL_SUCCESS, user);
  } catch (error) {
    return errorResponse(res, Messages.USER_DETAIL_FAILED, error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.User.delete({
      where: { id: Number(id) },
    });
    return successResponse(res, Messages.USER_DELETE_SUCCESS, user);
  } catch (error) {
    return errorResponse(res, Messages.USER_DELETE_FAILED, error);
  }
};
