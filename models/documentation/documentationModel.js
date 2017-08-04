var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentationSchema = mongoose.Schema({
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    affectedTissue: Number,
    color: Number,
    exsudat: Number,
    edge: [ Number ],
    symptoms: [ Number ],
    assessment : Number,
    comment: String,
    img: String
});

module.exports = mongoose.model('Documentation', documentationSchema);
