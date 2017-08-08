const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WDMDB');

const app = express();

const patientController = require('./models/patient/patientController')
const woundController = require('./models/wound/woundController')
const documentationController = require('./models/documentation/documentationController')

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res){
    console.log("connection worked");
})
app.get('/patient/:id', patientController.getPatient)
app.get('/patient', patientController.getAllPatients)
app.post('/patient', patientController.createPatient)
app.get('/wound/:id', woundController.getWound)
app.post('/wound', woundController.createWound)
app.post('/documentation', upload.any(), documentationController.createDocumentation)
app.get('/documentation/:id', documentationController.getDocumentation)
app.post('/documentation/:id', documentationController.editDocumentation)
app.get('/notifications', documentationController.getDocumentationNotifications)

app.listen(3000, () => {
  console.log('listening on 3000')
})
