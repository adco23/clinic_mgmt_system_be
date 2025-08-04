const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');
const {
  getAllShifts,
  createShift,
  getShiftById,
  updateShift,
  deleteShift,
  proposeShifts,
  getShiftsByDoctor,
  getShiftsByPatient
} = require('../controllers/shift.controller');

router.get('/', getAllShifts);
router.post('/', createShift);
router.get('/:id', getShiftById);
router.put('/:id', updateShift);
router.delete('/:id', deleteShift);

router.get('/propose/:specialtyId/:date', proposeShifts);
router.get('/doctor/:doctorId', getShiftsByDoctor);
router.get('/patient/:patientId', getShiftsByPatient);

module.exports = router;
