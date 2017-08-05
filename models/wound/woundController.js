var Wound = require('./woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('../documentation/documentationModel')
var fs = require('fs');


exports.createWounds =  function(req, res, next) {
  console.log("hello for");
  for(var i=0; i<req.files.length; i++){
    var f = req.files[i];
    console.log(f);
    var file_details = f.originalname.split('_');
    console.log(file_details);
    var date_details = file_details[1].split('-');
    var docs = new Documentation({
      date:new Date('20'+date_details[0], date_details[1]-1, date_details[2], date_details[3], date_details[4], date_details[5]),
      length:file_details[2],
      width:file_details[3]
    })
    var newWound = new Wound({
      position: file_details[4].split('.')[0],
    });
    docs.img = f.path;
    docs.img.contentType = 'image/png';
    docs.save(function(error, savedDocs) {  
      if (error) return res.json({ error: error });
      else{
        newWound.documentations.push(savedDocs);
        newWound.save(function(error, savedWound) {
          if (error) return res.json({ error: error });
          else {
            var patient = Patient.findById(file_details[0], function(error, patient) {
              if (error) return res.json({ error: error })
              else {
                patient.wounds.push(newWound);
                patient.save(function(error, savedPatient) {
                  if (error) return res.json({ error: error });
                  else return res.json({ wound: savedWound })
                });
              }
            })
          }
        });
      }
   });   
  }
}
exports.getWound = function(req, res) {
  if (!req.params.id) {
    return res.json({ error: "format error" });
  }

  var wound = Wound.findById(req.params.id)
  .populate({
       path: 'documentations',
       model: 'Documentation'
     })
  .exec(function (error, wound) {
    if (error) return res.json({ error: error });
    else{ 
      console.log(wound);
      return res.json({ wound: wound });
    }
});
}
