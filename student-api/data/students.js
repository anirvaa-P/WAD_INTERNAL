// This array acts as our in-memory database
// Each student has an id, name, age, and grade
let students = [
  { id: 1, name: "Ravi Kumar",   age: 20, grade: "A" },
  { id: 2, name: "Priya Sharma", age: 22, grade: "B" },
  { id: 3, name: "Arun Reddy",   age: 21, grade: "A+" }
];

module.exports = students;
// We export it so other files can use and modify the same array