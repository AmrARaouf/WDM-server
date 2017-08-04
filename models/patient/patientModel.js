var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthdate: Date,
    address: String,
    creationDate: Date,
    reference: boolean,
    wounds: [{ type: Schema.Types.ObjectId, ref: 'Wound' }]
});

module.exports = mongoose.model('Patient', patientSchema);
