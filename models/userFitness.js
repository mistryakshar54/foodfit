var mongoose = require('mongoose');

//schema
var fitnessSchema = new mongoose.Schema({
	"user":{type:mongoose.Schema.ObjectId,ref:'user'},
	"usertotalsteps":Number,
	"userstepinfo":{"dailytotalsteps":Number,
			"date":{ type: Date, default: Date.now },
			"distancetravelled":Number,
			"burnedcalories":Number}
})

module.exports = mongoose.model('UserFitness',fitnessSchema);