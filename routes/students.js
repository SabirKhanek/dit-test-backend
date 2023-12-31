const controller = require('../controllers/students');

const router = require('express').Router();

// get Student
router.get('/', controller.getStudents)

// delete Student
router.delete('/delete', controller.deleteStudent)

// add Student
router.post('/add', controller.addStudent)

// update
router.put('/update', controller.updateStudent)

module.exports = router;