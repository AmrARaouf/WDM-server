const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WDMDB');

const app = express();

const patientController = require('./models/patient/patientController')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/hello', (req, res) => {
  res.send("hi")
})

app.get('/patient/:id', patientController.getPatient)
app.get('/patient', patientController.getAllPatients)
app.post('/patient', patientController.createPatient)

 
app.listen(3000, () => {
  console.log('listening on 3000')
})
