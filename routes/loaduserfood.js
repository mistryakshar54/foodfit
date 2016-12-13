var express = require('express');
var router = express.Router();
var path = require('path');
var customfoodinfo = require('../models/loaduserfood');
var request = require('request');

router.get("/viewcustomfood", function(req,res){

	customfoodinfo.find({},function(err,result){
          if(!err)
          {
          	console.log("customfoodinfo");
          	console.log(result);
          	res.json(result);
          }
          else
          {
          	console.log("ERROR:"+err);
          	res.send(err);
          }
        })
	console.log("function exit");


})


router.get("/delete/:dd/:mm/:yy/:uid/:fid/:tid",function(req,res){
    var date = ""+req.params.dd +"/"+req.params.mm+"/"+req.params.yy;
    console.log(date+" "+req.params.uid+" "+req.params.fid+" "+req.params.tid);
    
    var userid = req.params.uid;
    var type = req.params.tid;
    var foodid = req.params.fid;

    switch(type){
        case "1":
            console.log("in case");
            customfoodinfo.update({"user":userid},
                                { $pull: { "breakfast" : { "_id":foodid } } },
                                {multi:true},function(err,result){
                                    if(!err)
                                    {
                                        console.log("working"+result);
                                        res.send("1");
                                    }
                                    else{
                                        res.send("0")
                                    }
                                });          
            console.log("case done");
            break;
        case "2":
            customfoodinfo.update({"user":userid},
                                { $pull: { "lunch" : { "_id":foodid } } },
                                {multi:true},function(err,result){
                                    if(!err)
                                    {
                                        console.log("working"+result);
                                        res.send("1");
                                    }
                                    else{
                                        res.send("0")
                                    }
                                });
            break;
        case "3":
            customfoodinfo.update({"user":userid},
                                { $pull: { "snack" : { "_id":foodid } } },
                                {multi:true},function(err,result){
                                    if(!err)
                                    {
                                        console.log("working"+result);
                                        res.send("1");
                                    }
                                    else{
                                        res.send("0")
                                    }
                                });
            break;
        case "4":
            customfoodinfo.update({"user":userid},
                                { $pull: { "dinner" : { "_id":foodid } } },
                                {multi:true},function(err,result){
                                    if(!err)
                                    {
                                        console.log("working"+result);
                                        res.send("1");
                                    }
                                    else{
                                        res.send("0")
                                    }
                                });
            break;
    }
  /*  
  customfoodinfo.find({"user":uid,"date":date}).forEach(function(doc){
                console.log(doc.breakfast+" "+JSON.parse(doc));
                var ft = doc.breakfast;
                for(var i=0;i<ft.length;++i){
                    var d = breakfast[i];
                    console.log(d);
                }
            })
    db.person.find({}).forEach(function(doc) {

	var address = doc.addresses;
	for(var i = 0; i < address.length; ++i) {
		var x = address[i];
		delete (x["state"]);

	}
	db.person.save(doc);

});*/
});


router.post("/updatefoodinfo" , function(req,res){
    
    var abc = req.body.upcol;
    
    var obj = req.body.jsonobj;
    //obj = JSON.parse(obj);
    //console.log(abc+req.body.uid+"dskvndskv: "+obj.abc1);
    customfoodinfo.findOne({"user":req.body.uid,"date":req.body.dt},function(err,result){
        if(!err)
        {
            if(abc == "breakfast")
            {
                result.breakfast.push(obj);
                console.log("result1: "+result);
                customfoodinfo.findOneAndUpdate({"user":req.body.uid,"date":req.body.dt},{"breakfast":result.breakfast},function(err,result1){
                    if(result1)    
                    {
                       // console.log("\n\nfinal result:"+result1);
                        res.send(result);
                    }
                    else
                    {
                        console.log(err);
                    }
                    
                })
            }
            else if(abc == "lunch")
            {
                result.lunch.push(obj);
                console.log("result1: "+result);
                customfoodinfo.findOneAndUpdate({"user":req.body.uid,"date":req.body.dt},{"lunch":result.lunch},function(err,result1){
                    if(result1)    
                    {
                        console.log("\n\nfinal result:"+result1);
                        res.send(result);
                    }
                    else
                    {
                        console.log(err);
                    }
                    
                })
            }
            else if(abc == "dinner")
            {
                result.dinner.push(obj);
                console.log("snack:"+result.dinner);
                customfoodinfo.findOneAndUpdate({"user":req.body.uid,"date":req.body.dt},{"dinner":result.dinner},function(err,result1){
                    if(result1)    
                    {
                        console.log("\n\nfinal result:"+result1);
                        res.send(result);
                    }
                    else
                    {
                        console.log(err);
                    }
                })
            }
            else if(abc == "snack"){
                console.log("breakfast ayu");
                result.snack.push(obj);
                customfoodinfo.findOneAndUpdate({"user":req.body.uid,"date":req.body.dt},{"snack":result.snack},function(err,result1){
                    if(result1)    
                    {
                        console.log("\n\nfinal result:"+result1);
                        res.send(result);
                    }
                    else
                    {
                        console.log(err);
                    }
                })
            }
         
        }
        else
        {
            res.send("No such record");
        }
    })


    // customfoodinfo.findOneAndUpdate({"user":req.body.uid,"date":req.body.dt},{abc:req.body.jsonobj},function(err,result){
    //     if(!err)
    //       {
    //       	console.log("updatefoodinfo");
    //       	console.log(result);
    //       	res.json(result);
    //       }
    //       else
    //       {
    //       	console.log("ERROR:"+err);
    //       	res.send(err);
    //       }
    // })

})

router.get("/addcustomfood" , function(req,res){


		var foodItem = new customfoodinfo({
			"food_key": "57f79ba279e37cde48d5a436",
		    "foodtype_key": "breakfast",
		    "food_name": "French Fries",
		    "calories": 100,
		    "total_cal": 100
		});

		 foodItem.save(function(err,result){
                console.log("Came to sace");
                if(!err){
                    console.log("added");
                          }
                          else{
                              console.log(err);
                          }
            });

		 
})



module.exports = router;