var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var woundSchema = mongoose.Schema({
    position: { type: Number },
    type: String,
    reason: String,
    documentations: [{ type: Schema.Types.ObjectId, ref: 'Documentation' }]
});

module.exports = mongoose.model('Wound', woundSchema);
