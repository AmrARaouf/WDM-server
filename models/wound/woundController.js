var Wound = require('./woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('../documentation/documentationModel')

exports.getWound = function(req, res) {
  console.log("wound for:" +req.params.id)
  if (!req.params.id) {
    return res.json({ error: "format error" });
  }

  var wound = Wound.findById(req.params.id)
  .populate({
      path: 'documentations',
      model: 'Documentation',
      options: { 
        sort: { 'date': -1 }
      }
     })
  .exec(function (error, wound) {
    if (error) return res.json({ error: error });
    else{ 
      console.log(wound);
      return res.json({ wound: wound });
    }
  });
}

exports.createWound = function(req, res) {
  if (!req.body.patientId || !req.body.wound
    || !req.body.wound.type || !req.body.wound.reason || !req.body.wound.position) {
    return res.status(400).send("Input format error");
  } else {
    Patient.findById(req.body.patientId, function(error, patient) {
      if (error) {
        return res.status(404).send("Patient not found");
      } else {
        var newWound = new Wound({
          position: req.body.wound.position,
          type: req.body.wound.type,
          reason: req.body.wound.reason
        });

        newWound.save(function(error, savedWound) {
          if (error) {
            return res.status(500).send("Error saving new wound");
          } else {
            patient.wounds.push(savedWound);
            patient.save(function (error, savedPatient) {
              if (error) {
                return res.status(500).send("Error saving patient after adding new wound");
              } else {
                return res.json({ wound: savedWound });
              }
            })
          }
        })
      }
    })
  }
  
}