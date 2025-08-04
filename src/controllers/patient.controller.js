const prisma = require('../db');
const { Messages, Status } = require('../utils/constants');
const { successResponse, failResponse, errorResponse } = require('../utils/responseHandler');


exports.getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.Patient.findMany();
    return successResponse(res, Status.OK, Messages.PATIENT_LIST_SUCCESS, patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.PATIENT_LIST_FAILED);
  }
};

exports.createPatient = async (req, res) => {
  try {
    const newPatient = await prisma.Patient.create({
      data: req.body,
    });
    return successResponse(res, Status.CREATED, Messages.PATIENT_CREATE_SUCCESS, newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.PATIENT_CREATE_FAILED);
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await prisma.Patient.findUnique({
      where: { id: req.params.id },
    });
    if (!patient) {
      return failResponse(res, Status.NOT_FOUND, Messages.PATIENT_NOT_FOUND);
    }
    return successResponse(res, Status.OK, Messages.PATIENT_DETAIL_SUCCESS, patient);
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.PATIENT_DETAIL_FAILED);
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await prisma.Patient.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return successResponse(res, Status.OK, Messages.PATIENT_UPDATE_SUCCESS, updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.PATIENT_UPDATE_FAILED);
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await prisma.Patient.delete({
      where: { id: req.params.id },
    });
    return successResponse(res, Status.OK, Messages.PATIENT_DELETE_SUCCESS, deletedPatient);
  } catch (error) {
    console.error('Error deleting patient:', error);
    return errorResponse(res, Status.INTERNAL_SERVER_ERROR, Messages.PATIENT_DELETE_FAILED);
  }
};
