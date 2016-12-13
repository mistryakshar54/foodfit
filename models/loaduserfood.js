var mongoose = require('mongoose');

//schema
var customfoodschema = new mongoose.Schema({
	"user":String,
	"date":String,
	"breakfast": [
		{	"food_key": String,
			"foodtype_key": String,
			"food_name":String,
			"calories":Number
		}
	],
	"lunch": [
		{	"food_key": String,
			"foodtype_key": String,
			"food_name":String,
			"calories":Number
		}
	],
	"dinner": [
		{	"food_key": String,
			"foodtype_key": String,
			"food_name":String,
			"calories":Number
		}
	],
	"snack": [
		{	"food_key": String,
			"foodtype_key": String,
			"food_name":String,
			"calories":Number
		}
	]
	
});

module.exports = mongoose.model('user_food_infos',customfoodschema);
