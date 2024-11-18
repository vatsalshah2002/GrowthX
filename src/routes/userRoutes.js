const express = require('express');
const { register, login, uploadAssignment, fetchAdmins } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateUser, uploadAssignment);
router.get('/admins', authenticateUser, fetchAdmins);

module.exports = router;
