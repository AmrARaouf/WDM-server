var Wound = require('./woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('../documentation/documentationModel')
var imageinfo = require('crafity-imageinfo');
var fs = require('fs');
var ExifImage = require('exif').ExifImage;



exports.createWounds =  function(req, res, next) {
  if (!req.params.id) {
    // TODO: add error function
    return res.json({ error: "format error" });
  }
  for(var i=0; i<req.files.length; i++){
    var f = req.files[i];
    console.log(f);
    console.log(f.originalname.split('.')[0].split('_'));
    imageinfo.readInfoFromFile(f.path, function (err, data) {
      if (err) { return console.error(err); }      
        var docs = new Documentation({
          date:data.date,
          length:data.length,
          width:data.width
        })
        var newWound = new Wound({
          position: data.position,
        });
        docs.img.data = fs.readFileSync(f.path)
        docs.img.contentType = 'image/png';
        docs.save(function(error, savedDocs) {  
          if (error) return res.json({ error: error });
          else{
            newWound.documentations.push(savedDocs);
            newWound.save(function(error, savedWound) {
              if (error) return res.json({ error: error });
              else {
                var patient = Patient.findById(id, function(error, patient) {
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
    });
  }
}