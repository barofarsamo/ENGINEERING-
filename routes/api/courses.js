const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse } = require('../../controllers/courseController');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', getAllCourses);

// @route   POST api/courses
// @desc    Add a new course
// @access  Public
router.post('/', createCourse);

module.exports = router;
