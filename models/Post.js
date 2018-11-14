const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	keywords: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date().toISOString()
	}
});

module.exports = mongoose.model('Post', PostSchema);
