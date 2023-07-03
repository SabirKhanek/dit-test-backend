const Student = require('../models/student')

async function getAllStudents(name) {
    if (name) return await Student.find({ name: { $regex: name, $options: 'i' } })
    else return await Student.find()
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

async function updateStudent(id, student) {
    const studentInDb = await Student.findById(id)
    if (!studentInDb) {
        throw new Error({ status: 404, message: 'Student not found' })
    }

    const { name, department, program, semester } = student
    if (name) studentInDb.name = name
    if (department) studentInDb.department = department
    if (program) studentInDb.program = program
    if (semester) studentInDb.semester = semester

    return await studentInDb.save()
}

module.exports.updateStudent = updateStudent
module.exports.deleteStudent = deleteStudent
module.exports.addStudent = addStudent
module.exports.getStudentById = getStudentById
module.exports.getAllStudents = getAllStudents