require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connection = require('./db')
const PORT = 5000

const app = express()
const personList = require('./routes/personlist')
const projectList = require('./routes/projectlist')
const locationList = require('./routes/locationlist')

app.use(cors())
app.use(express.json())
app.use('/api/projects', projectList)
app.use('/api/:projectid/person', (req, res, next) => {
    req.projectid = req.params.projectid; next();
}, personList)
app.use('/api/:projectid/location', (req, res, next) => {
    req.projectid = req.params.projectid; next();
}, locationList)



app.listen(PORT, () =>{
    console.log(`Serwer nasluchuje na porcie ${PORT}`)
})
connection()
