const Student = require('../models/student')

async function getAllStudents() {
    const students = await Student.find()
    return students
}

async function getStudentById(id) {
    const student = await Student.findById(id)
    return student
}

async function addStudent(student) {
    // lodash
    const { name, department, program, semester } = student
    const newStudent = new Student({
        name, department, program, semester
    })
    return await newStudent.save()
}

async function deleteStudent(id) {
    const student = await Student.findByIdAndDelete(id)
    return student
}

module.exports.deleteStudent = deleteStudent
module.exports.addStudent = addStudent
module.exports.getStudentById = getStudentById
module.exports.getAllStudents = getAllStudents