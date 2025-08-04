const express = require('express');
const router = express.Router();
const { Auth } = require('../middlewares/auth.middleware');
const {
  getAllDoctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getList
} = require('../controllers/doctor.controller');
const { Roles } = require('../utils/constants');

router.get('/', getAllDoctors);
router.post('/', createDoctor);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);
router.get('/list', getList);

module.exports = router;
