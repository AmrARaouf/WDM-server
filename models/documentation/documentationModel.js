var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentationSchema = mongoose.Schema({
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Documentation', documentationSchema);
