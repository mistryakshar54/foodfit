var mongoose = require('mongoose');

//schema
var foodSchema = new mongoose.Schema({
	"item_name": String,
	"nf_calories": Number,
	//"nf_calories_from_fat": Number,
	"nf_total_fat": Number,
	"nf_total_carbohydrate": Number,
	"nf_dietary_fiber": Number,
	"nf_protein": Number,
	"nf_vitamin_a_dv": Number,
	"nf_vitamin_c_dv": Number,
	"nf_calcium_dv": Number,
	"nf_iron_dv": Number,
	"nf_serving_weight_grams": Number,
	"food_category" : Number


});

module.exports = mongoose.model('fst_food_info',foodSchema);
