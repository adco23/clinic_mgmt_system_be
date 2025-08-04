const prisma = require('../db');
const { Messages, Status } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    return successResponse(res, Status.OK, Messages.DOCTOR_LIST_SUCCESS, doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.DOCTOR_LIST_FAIL);
  }
};
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = await prisma.doctor.create({
      data: req.body,
    });
    return successResponse(res, Status.CREATED, Messages.DOCTOR_CREATE_SUCCESS, newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.DOCTOR_CREATE_FAIL);
  }
};
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id },
    });
    if (!doctor) {
      return failResponse(res, Status.NOT_FOUND, Messages.DOCTOR_NOT_FOUND);
    }
    return successResponse(res, Status.OK, Messages.DOCTOR_FETCH_SUCCESS, doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.DOCTOR_FETCH_FAIL);
  }
};
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await prisma.doctor.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return successResponse(res, Status.OK, Messages.DOCTOR_UPDATE_SUCCESS, updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.DOCTOR_UPDATE_FAIL);
  }
};
exports.deleteDoctor = async (req, res) => { /* eliminar */ };

exports.getList = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        name: true,
        specialization: true,
      },
    });
    return successResponse(res, Status.OK, Messages.DOCTOR_LIST_SUCCESS, doctors);
  } catch (error) {
    console.error('Error fetching doctor list:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.DOCTOR_LIST_FAIL);
  }
}
