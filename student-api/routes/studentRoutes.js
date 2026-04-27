const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// All routes are protected with verifyToken middleware
// verifyToken runs first → if token valid → controller runs

router.get('/',       verifyToken, getAllStudents);   // GET    /api/students
router.get('/:id',    verifyToken, getStudentById);  // GET    /api/students/1
router.post('/',      verifyToken, createStudent);   // POST   /api/students
router.put('/:id',    verifyToken, updateStudent);   // PUT    /api/students/1
router.delete('/:id', verifyToken, deleteStudent);  // DELETE /api/students/1

module.exports = router;