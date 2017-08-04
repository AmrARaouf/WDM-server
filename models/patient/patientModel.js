var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    birthdate: Date,
    address: String,
    creationDate: Date,
    reference: Boolean,
    wounds: [{ type: Schema.Types.ObjectId, ref: 'Wound' }]
});

module.exports = mongoose.model('Patient', patientSchema);
