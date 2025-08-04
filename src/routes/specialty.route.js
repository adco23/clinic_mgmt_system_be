const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');
const {
  getAllSpecialties,
  createSpecialty,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} = require('../controllers/specialty.controller');

router.get('/', getAllSpecialties);
router.post('/', createSpecialty);
router.get('/:id', getSpecialtyById);
router.put('/:id', updateSpecialty);
router.delete('/:id', deleteSpecialty);

module.exports = router;
