var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthdate: Date,
    wounds: [{ type: Schema.Types.ObjectId, ref: 'Wound' }]
});

module.exports = mongoose.model('Patient', patientSchema);
