const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Enroll a student in a course
exports.enrollStudentInCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // Check if student and course exist
    const student = await Student.findById(studentId);
    if (!student) {
        return res.status(404).json({ msg: 'Student not found' });
    }
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if enrollment already exists
    let enrollment = await Enrollment.findOne({ studentId, courseId });
    if (enrollment) {
        return res.status(400).json({ msg: 'Student already enrolled in this course' });
    }

    enrollment = new Enrollment({
      studentId,
      courseId,
    });

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    // Handle CastError if IDs are invalid
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send('Server Error');
  }
};
