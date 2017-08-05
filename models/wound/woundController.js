var Wound = require('./woundModel')
var Patient = require('../patient/patientModel')
var Documentation = require('../documentation/documentationModel')

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
