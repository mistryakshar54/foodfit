var express = require('express');
var router = express.Router();
var path = require('path');
var foodinfo = require('../models/foodinfo');
var restaurant = require('../models/restaurant');
var jsonQuery = require('json-query')

router.get("/:food_cat/:gt/:lt",function(req,res){

//route to get food on basis of recommendation
    foodinfo.find({food_category: {$lt : parseInt(req.params.food_cat)}, nf_calories : {$gt : parseInt(req.params.gt), $lt : parseInt(req.params.lt)} } ,"item_name nf_calories _id" , function(err,result){
        if(!err){
            console.log(result);
            res.send(result);
        }
        else
        {
           console.log(err); 
           res.send(err);
        }
        
    });

})


router.get('/nearby/:gt/:lt/:lat/:lon', function(req, res) {

    greater = req.params.gt;
    leassthan = req.params.lt;

  restaurant.find({
    location: {
      $near: [req.params.lat,req.params.lon],
      $maxDistance: 10/637
    }
  },"rest_menu rest_name", function(err, locations) {

    if (err) {
      res.status(500);
      return res.send(err);
    }

    var restarr = [];
    var arr = locations;
    for(i = 0;i<arr.length;i++)
    {
        var restmenu = arr[i].rest_menu
        //console.log(restmenu);
        for(j = 0; j<restmenu.length; j++)
        {
            var ct = restmenu[j].food_cat;
            var cl = restmenu[j].food_cal;
            
             if((cl <= leassthan && cl >= greater) && ct <= 2)
             {
                 var abc = arr[i].rest_menu;
                 restarr.push(restmenu[j]);

                 //console.log("Sliced:"+restmenu[j].food_cat);
                 //console.log("abc: "+abc)
             }
             //console.log(restmenu[j].food_name+restmenu[j].food_cat);

        }
        arr[i].rest_menu = restarr;
        //console.log(arr[i].rest_menu);
        //console.log("restarr\n\n\n"+restarr);
        // var obj = arr[i];
        // for (var key in obj){
        //     var attrName = key;
        //     var attrValue = obj[key];
        //     console.log(attrName+ " : "+attrValue);
        // }
    }
    res.status(200);
    //console.log(locations.rest_menu);
    res.json(arr);
    
  });

});


router.get("/restloc/:food_cat/:gt/:lt" , function(req,res){

foodinfo.find({food_category: req.params.food_cat, nf_calories : {$gt : parseInt(req.params.gt), $lt : parseInt(req.params.lt)} } ,"item_name nf_calories _id" , function(err,result){
        if(!err){
            console.log(result);
            res.json("arr:"+result);
        }
        else
        {
           console.log(err); 
           res.send(err);
        }
        
    });


})


module.exports = router;