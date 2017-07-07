var Patient = require('./patientModel')

exports.createPatient = function(req, res) {
  if (!req.body.name || !req.body.birthdate) {
    // TODO: add error function
    return res.json({ error: "format error" });
  }
      
  var newPatient = new Patient({
    name: req.body.name,
    birthdate: new Date(req.body.birthdate)
  });

  newPatient.save(function(error, savedPatient) {
    if (error) return res.json({ error: error });
    else return res.json({ patient: savedPatient })
  });
}

exports.getPatient = function(req, res) {
  if (!req.params.id) {
    return res.json({ error: "format error" });
  }

  var patient = Patient.findById(req.params.id, function(error, patient) {
    if (error) return res.json({ error: error })
    else return res.json({ patient: patient })
  })
}

exports.getAllPatients = function(req, res) {
  var patients = Patient.find({}, function(error, patients) {
    if (error) return res.json({ error: error })
    else return res.json({ patients: patients })
  })
}