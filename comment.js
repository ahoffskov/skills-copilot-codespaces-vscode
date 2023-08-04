// Create webserver
// http://localhost:3000/
// http://localhost:3000/api/comment
// http://localhost:3000/api/comment/1

// Import package
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Import router
const comment = require('./routes/comment')

// Set body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set router
app.use('/api/comment', comment)

// Set port
const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`))