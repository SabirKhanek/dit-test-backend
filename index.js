require('dotenv').config()
const express = require('express')
const apiRouter = require('./routes/api')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.use('/', express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('App listening on: http://127.0.0.1:' + port)
})