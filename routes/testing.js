//Dependancies
var express = require('express');
var router = express.Router();

//models
var user = require('../models/user')
//router



router.get('/',function(req,res){
	var newUser = new user({
		"FirstName":"Jeet",
		"LastName":"Virani",
		"password":"Akshar",
	    "gender":"male",
		"email":"viranijitu19@gmail.com",
		"dob":19/08/1994,
		"height":167,
		"weight":70,
		"profilepic":"null",
		"zipcode":395006,
		"country":"India",
		"lastlogin":new Date,
		"calorieintake":1200,
		"weightlost":10,
		"isallergic":"yes",
	/*	"allergy":[{
			"chocoallergy":true,
			"allergy2":true,
			"diabetic":false
		}],*/
		"dailystepgoal":2500
	})
	newUser.save(function(err,result){
		if(!err){
			console.log("added");
			user.find({"LastName":"Virani","password":"Akshar"},function(err,result){
				res.json(result);
			})
		}
	})
})


module.exports = router;
