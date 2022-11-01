const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const connectDB = require('./config/db')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


const port = process.env.PORT || 3000
connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/', require('./routes/user'))
app.use('/todo', require('./routes/todo'))

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})