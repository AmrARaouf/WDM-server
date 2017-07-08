const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
<<<<<<< HEAD
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WDMDB');

const app = express();

const patientController = require('./models/patient/patientController')
const woundController = require('./models/wound/woundController')

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
app.post('/patient/:id/wound', upload.single('img'), woundController.createWound)

app.listen(3000, () => {
  console.log('listening on 3000')
})
