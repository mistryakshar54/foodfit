var mongoose = require('mongoose');

//schema
var Feedback = new mongoose.Schema({
		"user_name":String,
		"feedback_content":String,
	  "user_mailid":String,
	  "date":Date

})

module.exports = mongoose.model('fst_feedback_infos',Feedback);
