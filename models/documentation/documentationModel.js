var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentationSchema = mongoose.Schema({
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    affectedTissue: String,
    color: String,
    exsudat: String,
    edge: [ String ],
    symptoms: [ String ],
    assessment : String,
    comment: String,
    img: String
});

module.exports = mongoose.model('Documentation', documentationSchema);
