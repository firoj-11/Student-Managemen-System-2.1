const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const authCtrl = require('../controllers/authController');
const studentCtrl = require('../controllers/studentController');

router.post('/auth/login', authCtrl.login);

router.route('/students')
    .get(protect, studentCtrl.getStudents)
    .post(protect, adminOnly, studentCtrl.createStudent);

router.route('/students/:id')
    .put(protect, adminOnly, studentCtrl.updateStudent)
    .delete(protect, adminOnly, studentCtrl.deleteStudent);

module.exports = router;