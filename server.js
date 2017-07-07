const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WDMDB');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
 
app.listen(3000, () => {
  console.log('listening on 3000')
})
