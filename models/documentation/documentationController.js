var Wound = require('../wound/woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('./documentationModel')
var fs = require('fs');

exports.createDocumentation =  function(req, res, next) {
  console.log("createDocumentation service");
  for(var i=0; i<req.files.length; i++){
    
    var f = req.files[i];
    console.log(f);
    var file_details = f.originalname.split('_');
    console.log(file_details);
    
    var wound = Wound.findById(file_details[0], function(error, wound) {
        if (error) return res.json({ error: error });
        else {
          var date_details = file_details[1].split('-');
          var docs = new Documentation({
            date : new Date('20'+date_details[0], date_details[1]-1, date_details[2], date_details[3], date_details[4], date_details[5]),
            length : file_details[2],
            width : file_details[3]
          });
          docs.img = f.path;
          docs.save(function(error, savedDocs) {  
            if (error) return res.json({ error: error });
            else{
              wound.documentations.push(savedDocs);
              wound.save(function(error, savedWound) {
                if (error) return res.json({ error: error });
                else return res.json({ wound: savedWound })
              });
            }
          })
        }
      });   
  }
}