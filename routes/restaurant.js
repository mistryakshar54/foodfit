//Dependancies
var express = require('express');
var router = express.Router();
var path = require('path');
//models
//router

var restaurant = require('../models/restaurant');

router.get('/', function (req, res) {
	res.sendFile('restaurant.html',{root:path.join(__dirname,'../assets/views')});
});


//route to get data
router.get('/getrest', function (req, res) {
  console.log("Route to fetch all restinfo..");
  restaurant.find({},function(err,result){
          res.json(result);
        })

  console.log("restinfo log data: ");
});

//route to add date
router.post('/add',function(req,res){

	console.log("reached to add functionality!!");
	console.log("l;amsc;lasc: "+req.body.name);


	var restaurant_inf = new restaurant({
		"rest_name" : req.body.name,
		"rest_address" : req.body.address,
		"rest_loc_lat" : req.body.lat,
		"rest_loc_long" : req.body.long,
		"phoneno" : req.body.phone,
		"rest_email" : req.body.email,
		//"opening_status" : req.body.open,
		"owner_mail_id" : req.body.owner_email,
		"restraunt_website" : req.body.website,
		"rest_open_time" : req.body.otime,
		"rest_close_time" : req.body.ctime,
		"rest_city" : req.body.city,
		"rest_menu" : req.body.menu,
		"location": [req.body.lat, req.body.long]			
	,
		"zipcode" : req.body.zipcode
	//	"country_id" : req.body.country_id,
	//	"rating" : req.body.rating,
	//	"rest_food_type" : req.body.food_type
	})
	restaurant_inf.save(function(err,result){
		console.log("Came to sace");
		if(!err){
			console.log("added");
			res.redirect('../../admin/rest');

			//res.send("restaurant added successfully");
			}
			else{
				console.log(err);
				res.send("restaurant not added "+err);
			}

	})
});



router.get('/update/:id', function (req, res) {
  console.log("req for update id"+req.params.id);
  restaurant.findById({_id:req.params.id}, function (err, result) {
    if(result)
    {
        res.send(result);
    }
    else {
      console.log("db error not found");
      res.send(req.params.id);
    }
  })

//
});



router.post('/update',function(req,res){

console.log("The request  in update tagid: "+req.body.name+" "+req.body.email);

restaurant.findOneAndUpdate({ _id: req.body._id }, {
		"rest_name" : req.body.name,
		"rest_address" : req.body.address,
		"rest_loc_lat" : req.body.lat,
		"rest_loc_long" : req.body.long,
		"phoneno" : req.body.phone,
		"rest_email" : req.body.email,
		//"opening_status" : req.body.open,
		"owner_mail_id" : req.body.owner_email,
		"restraunt_website" : req.body.website,
		"rest_open_time" : req.body.otime,
		"rest_close_time" : req.body.ctime,
		"rest_city" : req.body.city,
		"rest_menu" : {
		"food_id_1" : req.body.itemid1,
		"food_price_1" : req.body.pricei1,
		"food_id_2" : req.body.itemid2,
		"food_price_2" : req.body.pricei2,
		"food_id_3" : req.body.itemid3,
		"food_price_3" : req.body.pricei3,
		},
		"zipcode" : req.body.zipcode
	}, function(err, restaurant) {
  if (err) throw err;
  else res.send("Rest updated successfully");

  // we have the updated user returned to us
	//console.log(restaurant);
  //res.send(restaurant);
  console.log(restaurant);
});


console.log("The requested value has been updated!!");
});


router.get('/delete/:restID',function(req,res){
console.log("Deleted record successfully"+req.params.restID);


  restaurant.findByIdAndRemove(req.params.restID,function(err){
      if(err) throw err;
      else
      console.log("Deleted record successfully");
  });

});





module.exports = router;
