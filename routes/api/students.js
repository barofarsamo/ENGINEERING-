const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent } = require('../../controllers/studentController');

// @route   GET api/students
// @desc    Get all students
// @access  Public
router.get('/', getAllStudents);

// @route   POST api/students
// @desc    Add a new student
// @access  Public
router.post('/', createStudent);

module.exports = router;
