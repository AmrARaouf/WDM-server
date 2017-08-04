var Patient = require('./patientModel')

exports.createPatient = function(req, res) {
  if (!req.body.lastName || !req.body.firstName
    || !req.body.birthdate || !req.body.address
    ||!req.body.creationDate || !req.body.reference) {
    // TODO: add error function
    return res.json({ error: "format error" });
  }
      
  var newPatient = new Patient({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    birthdate: new Date(req.body.birthdate),
    address: req.body.address,
    creationDate: new Date(req.body.creationDate),
    reference: req.body.reference
  });

  newPatient.save(function(error, savedPatient) {
    if (error) return res.json({ error: error });
    else return res.json({ patient: savedPatient });
  });
}

exports.getPatient = function(req, res) {
  if (!req.params.id) {
    return res.json({ error: "format error" });
  }

  var patient = Patient.findById(req.params.id)
  .populate({ 
     path: 'wounds',
     populate: {
       path: 'documentations',
       model: 'Documentation'
     } 
  })
  .exec(function (error, patient) {
    if (error) return res.json({ error: error });
    else{ 
      console.log(patient);
      return res.json({ patient: patient });
    }
});
}

exports.getAllPatients = function(req, res) {
  console.log("getting all patients");
  var patients = Patient.find({}, function(error, patients) {
    if (error) return res.json({ error: error });
    else return res.json({ patients: patients });
  })
}