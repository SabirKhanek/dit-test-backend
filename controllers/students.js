const Joi = require('joi');
const { getAllStudents, getStudentById, addStudent, deleteStudent, updateStudent } = require('../db/controllers/student');

module.exports.getStudents = async (req, res) => {
    const { id, name } = req.query
    try {
        if (id) {
            const student = await getStudentById(id)
            if (!student) res.status(404).send('Student not found')
            else res.send([student])
            return
        } else {
            const students = await getAllStudents(name)
            res.send(students)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports.updateStudent = async (req, res) => {
    try {
        const studentSchema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            department: Joi.string().required(),
            program: Joi.string().required(),
            semester: Joi.number().required(),
        })

        const validate = studentSchema.validate(req.body)

        if (validate.error) {
            res.status(400).send(validate.error.details[0].message)
            return
        }

        const { _id, name, department, program, semester } = req.body
        const stdObj = {
            name, department, program, semester
        }

        const stdInDb = await updateStudent(id = _id, stdObj)
        res.send(stdInDb)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.deleteStudent = async (req, res) => {
    const { id } = req.query
    if (!id) {
        res.status(400).send('id is required')
        return
    }
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
            return
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