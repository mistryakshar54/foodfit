var mongoose = require('mongoose');

//schema
var restaurantSchema = new mongoose.Schema({
	"rest_name":String,
	"rest_address":String,
	"rest_loc_lat":Number,
	"rest_loc_long":Number,
	"phoneno":Number,
	"rest_email":String,
	"rest_open_time":String,
	"rest_close_time":String,
	"owner_mail_id":String,
	"restraunt_website":String,
	//"rest_time":String,
	"rest_city":String,
	"rest_menu":	[
			{
				"food_id":String,
				"food_name":String,
				"food_price":Number,
				"food_cal":Number,
				"food_cat":Number
			}
	],

	"location":{
				"type": [Number],
    			"index": '2d'
	},
	"zipcode":String,
//	"country_id":String,
	"rating":String,
//	"rest_food_type":String

})

module.exports = mongoose.model('fst_restaurant_info',restaurantSchema);
