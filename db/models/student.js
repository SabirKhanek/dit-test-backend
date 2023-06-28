const mongoose = require('../dbHandler')

const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    program: String,
    semester: Number,
})

module.exports = mongoose.model('Student', studentSchema)