const express = require('express');
const { viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const {register, login }=require('../controllers/userController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', authenticateAdmin, viewAssignments);
router.post('/assignments/:id/accept', authenticateAdmin, acceptAssignment);
router.post('/assignments/:id/reject', authenticateAdmin, rejectAssignment);

module.exports = router;
