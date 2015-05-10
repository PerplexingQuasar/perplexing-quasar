var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestApiSchema = new Schema({
	data: { type: String, required: true },
	api: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('RequestApi', RequestApiSchema);