//Dependancies
var express = require('express');
var router = express.Router();
var request = require('request');

// direct way to make a get request
router.get('/:tagid',function(req,res){

  var opt="item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_dietary_fiber,nf_sodium,nf_vitamin_a_dvnf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_serving_size_qty";
var urltonutritionx = "https://api.nutritionix.com/v1_1/search/"+req.params.tagid+"?results=0:1&fields="+opt+"&appId=7ab267ec&appKey=eb4ef3f6f990261bf762e091001c145b";
  request(urltonutritionx, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(info);
      // do more stuff
      // if(info.total_hits > 0)
      // {
      //   var hits_arr = info.hits;
      //   // if((hits_arr.length > 1) &&  (hits_arr[0].fields.item_name != hits_arr[1].fields.item_name))
      //   // {
      //   //   hits_arr.forEach(function(value){
      //   //   console.log(value.fields.item_name);
      //   // });
      //   // }
      //   // else {
      //   //   console.log(info.hits[0].fields.item_name);
      //   //
      //   // }
      //   var jsn = hits_arr[0];
      //   delete jsn._score;
      //   delete jsn._
      //
      //
      //   res.send(jsn);
      // }
      // else {
      //   res.send("Sorry but we couldnt find what you are looking for!!");
      // }


    }
  });

});

module.exports = router;
