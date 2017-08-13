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
              console.log("created docs for wound:"+wound);
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

exports.getDocumentation = function(req, res) {
  if (!req.params.id) {
    return res.json({ error: "format error" });
  }

  var documentation = Documentation.findById(req.params.id)
  .exec(function (error, documentation) {
    if (error) return res.json({ error: error });
    else{ 
      return res.json({ documentation: documentation });
    }
});
}

exports.editDocumentation = function(req, res) {
  if (!req.params.id 
    || !req.body.documentation.affectedTissue 
    || !req.body.documentation.color 
    || !req.body.documentation.exsudat 
    || !req.body.documentation.comment
    || !req.body.documentation.edges 
    || !req.body.documentation.symptoms 
    || !req.body.documentation.assessment) {
    return res.status(400).send("Input format error, missing parameters");
  } else {
    console.log(req.params.id);
    Documentation.findById(req.params.id, function(error, documentation) {
      if (error) {
        return res.status(404).send("documentation not found");
      } else {
        documentation.affectedTissue = req.body.documentation.affectedTissue;
        documentation.color = req.body.documentation.color;
        documentation.exsudat = req.body.documentation.exsudat;
        documentation.comment = req.body.documentation.comment;
        documentation.edge = req.body.documentation.edge;
        documentation.symptoms = req.body.documentation.symptoms;
        documentation.assessment = req.body.documentation.assessment;

        documentation.save(function(error, savedDocumentation) {
          if (error) {
            console.log(error);
            return res.status(500).send("Error saving new documentation");
          } else {
                return res.json({ documentation: savedDocumentation });
          }
        })
      }
    })
  }
}

exports.getDocumentationNotifications = function(req, res) {
  docs = [];
  Patient.find({})
  .populate({ 
     path: 'wounds',
     populate: {
       path: 'documentations',
       model: 'Documentation'
     } 
  }).exec(function(error, patients) {
  if (error){ 
      return res.status(404).send("no patients found");
  } else {
    for (var i = 0; patients && i < patients.length; i++) {
      for(var j = 0; patients[i].wounds && j < patients[i].wounds.length; j++){        
        var wound = patients[i].wounds[j];
        for(var k = 0; wound && wound.documentations && k < wound.documentations.length; k++){
          var documentation = wound.documentations[k];
          if(!documentation.affectedTissue 
            || !documentation.color 
            || !documentation.exsudat 
            || !documentation.comment
            || !documentation.edge 
            || !documentation.symptoms 
            || !documentation.assessment){
              docs.push({ documentation: documentation, patient: patients[i], wound: wound });
          }
        }
      }
    }
  }
  console.log("got "+docs.length +" notifications");
  return res.json({ notifications: docs });
  });
}