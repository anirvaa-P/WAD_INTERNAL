// Import our student data
let students = require('../data/students');

// ─────────────────────────────────────────
// GET ALL STUDENTS
// URL: GET /api/students
// ─────────────────────────────────────────
const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// ─────────────────────────────────────────
// GET ONE STUDENT BY ID
// URL: GET /api/students/:id
// ─────────────────────────────────────────
const getStudentById = (req, res) => {
  // req.params.id gives us the id from the URL
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    // If no student found, send 404 error
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

// ─────────────────────────────────────────
// CREATE A NEW STUDENT
// URL: POST /api/students
// ─────────────────────────────────────────
const createStudent = (req, res) => {
  // req.body contains the data sent by the client (from Postman)
  const { name, age, grade } = req.body;

  // Basic validation — check all fields are provided
  if (!name || !age || !grade) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, age, and grade"
    });
  }

  // Create new student object
  // ID is auto-generated based on current array length
  const newStudent = {
    id: students.length + 1,
    name,
    age: parseInt(age),
    grade
  };

  // Push to our "database" array
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
};

// ─────────────────────────────────────────
// UPDATE AN EXISTING STUDENT
// URL: PUT /api/students/:id
// ─────────────────────────────────────────
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  // If student doesn't exist
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  // Merge old data with new data from request body
  const updatedStudent = {
    ...students[studentIndex],  // keep existing fields
    ...req.body,                // overwrite with new fields
    id: id                      // make sure id doesn't change
  };

  students[studentIndex] = updatedStudent;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: updatedStudent
  });
};

// ─────────────────────────────────────────
// DELETE A STUDENT
// URL: DELETE /api/students/:id
// ─────────────────────────────────────────
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  // Remove the student from the array
  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0]
  });
};

// Export all functions so routes can use them
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};