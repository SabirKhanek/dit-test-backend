const Joi = require('joi');
const { getAllStudents, getStudentById, addStudent, deleteStudent } = require('../db/controllers/student');

module.exports.getStudents = async (req, res) => {
    const { id } = req.query
    try {
        if (id) {
            const student = await getStudentById(id)
            res.send([student])
        } else {
            const students = await getAllStudents()
            res.send(students)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}


module.exports.deleteStudent = async (req, res) => {
    const { id } = req.query
    if (!id) res.status(400).send('id is required')
    try {
        const student = await deleteStudent(id)
        res.send(student)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports.addStudent = async (req, res) => {
    try {
        const studentSchema = Joi.object({
            name: Joi.string().required(),
            department: Joi.string().required(),
            program: Joi.string().required(),
            semester: Joi.number().required(),
        })

        const validate = studentSchema.validate(req.body)

        if (validate.error) {
            res.status(400).send(validate.error.details[0].message)
        }
        console.log(req.body)
        const { name, department, program, semester } = req.body
        const stdObj = {
            name, department, program, semester
        }

        const stdInDb = await addStudent(stdObj)
        res.send(stdInDb)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }

}