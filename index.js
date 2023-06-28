const express = require('express')
const apiRouter = require('./routes/api')
const app = express()

app.use(express.json())
app.use('/api', apiRouter)
app.use('/', express.static('public'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})