var mongoose = require('mongoose');

//schema
var usercustomfood = new mongoose.Schema({
	"user":String,
	"item_name": String,
	"nf_calories": Number,
	"nf_total_fat": Number,
	"nf_total_carbohydrate": Number,
	"nf_dietary_fiber": Number,
	"nf_protein": Number,
	"nf_vitamin_a_dv": Number,
	"nf_vitamin_c_dv": Number,
	"nf_calcium_dv": Number,
	"nf_iron_dv": Number,
	"nf_serving_weight_grams": Number
});

module.exports = mongoose.model('user_custom_foods',usercustomfood);
