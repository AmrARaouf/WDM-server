var Wound = require('./woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('../documentation/documentationModel')
var imageinfo = require('crafity-imageinfo');
var fs = require('fs');
var ExifImage = require('exif').ExifImage;



exports.createWound =  function(req, res, next) {
  if (!req.params.id) {
    // TODO: add error function
    return res.json({ error: "format error" });
  }
  new ExifImage({ image : req.file.path }, function (error, exifData) {
        if (error)
            console.log('EEEError: '+error.message);
        else
            console.log(exifData); // Do something with your data! 
    });
  imageinfo.readInfoFromFile(req.file.path, function (err, data) {
    if (err) { return console.error(err); }      
      var docs = new Documentation({
        date:data.date,
        length:data.length,
        width:data.width
      })
      var newWound = new Wound({
        position: data.position,
      });
      docs.img.data = fs.readFileSync(req.file.path)
      docs.img.contentType = 'image/png';
      docs.save(function(error, savedDocs) {  
        if (error) return res.json({ error: error });
        else{
          newWound.documentations.push(savedDocs);
          newWound.save(function(error, savedWound) {
            if (error) return res.json({ error: error });
            else {
              var patient = Patient.findById(req.params.id, function(error, patient) {
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