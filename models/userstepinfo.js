var mongoose = require('mongoose');

//schema
var stepinfo = new mongoose.Schema({
		"user_id":String,
		"date":String,
	  "totalStep":Number

})

module.exports = mongoose.model('user_step_infos',stepinfo);
