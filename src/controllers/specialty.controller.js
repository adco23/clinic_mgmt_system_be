const prisma = require('../db');
const { Messages, Status } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllSpecialties = async (req, res) => {
  try {
    const specialties = await prisma.specialty.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return successResponse(res, Messages.LIST_SUCCESS, specialties);
  } catch (error) {
    console.error(Messages.ERROR_FETCHING_DATA, error);
    return errorResponse(res, Messages.ERROR_FETCHING_DATA, error, Status.INTERNAL_SERVER_ERROR);
  }
};

exports.createSpecialty = async (req, res) => {};

exports.getSpecialtyById = async (req, res) => {};

exports.updateSpecialty = async (req, res) => {};

exports.deleteSpecialty = async (req, res) => {};


