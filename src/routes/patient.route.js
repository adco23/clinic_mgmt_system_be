const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');
const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../controllers/patient.controller');

router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);


module.exports = router;
