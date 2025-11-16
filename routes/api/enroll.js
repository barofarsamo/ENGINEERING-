const express = require('express');
const router = express.Router();
const { enrollStudentInCourse } = require('../../controllers/enrollmentController');

// @route   POST api/enroll
// @desc    Enroll a student in a course
// @access  Public
router.post('/', enrollStudentInCourse);

module.exports = router;
