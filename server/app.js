require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
const morgan = require('morgan')
const tasksRouter = require('./routes/tasks.router')


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use(morgan('dev'))
app.use(cors())
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1', tasksRouter)

app.listen(PORT, () => {
  console.log('Server start on port', PORT)
})
