var express = require('express');
var router = express.Router();
var path = require('path');
var foodinfo = require('../models/foodinfo');
var request = require('request');
var userfood = require('../models/loaduserfood');
var usercustomfood = require('../models/UserCustomFood');

var svm = require('node-svm');


//route to add custom food information


router.post('/addcustom',function(req,res){


        //Logic to calculate the nutritional density of food item.
console.log("me routen me hu"+req.body.uid);
  var protein_dv = parseInt(req.body.protein) / 50;
  var df_dv = parseInt(req.body.fiber) / 25;
  var nutdensity = (protein_dv+df_dv+parseInt(req.body.vitamin_a)+parseInt(req.body.vitamin_c)+parseInt(req.body.calcium)+parseInt(req.body.iron))/6;
  var cal_precent = parseInt(req.body.calories)/ 2000;
  var final_nv = nutdensity/ cal_precent;

  console.log("Nut density"+ final_nv);

  console.log("uid"+req.body.uid+"pro density"+ protein_dv+"df_dv "+df_dv+"\ncal percent:"+cal_precent);

    var usercfood = new usercustomfood({
//Fetching the food items and saving it into the database
      //"user":
     "user":req.body.uid,
      "item_name": req.body.fname,
      "nf_calories": req.body.calories,
     // "nf_calories_from_fat": req.body.calfat,
      "nf_total_fat": req.body.fat,
      "nf_total_carbohydrate": req.body.carbs,
      "nf_dietary_fiber": req.body.fiber,
      "nf_protein": req.body.protein,
      "nf_vitamin_a_dv": req.body.vitamin_a,
      "nf_vitamin_c_dv": req.body.vitamin_c,
      "nf_calcium_dv": req.body.calcium,
      "nf_iron_dv": req.body.iron,
      "nf_serving_weight_grams": req.body.serving
      // "nutritional_density" : final_nv,
//      "food_category":req.body.category

    });

//Saving the item into the mongo db database if same item doesnot exist

    usercfood.save(function(err,result){
        console.log("Came to sace");
        if(!err){
            console.log("added");
            //res.write("food added successfully");
          //res.send("The requested food has beed successfully added.");
            res.redirect("../../../FoodCustomInfo.html");

            }
            else{
                res.send(err);
            }

  });
});


//delete custom food

router.get('/dltFood/:fid',function(req,res){

  usercustomfood.findByIdAndRemove(req.params.fid,function(err){
      if(err) throw err;
      else{
        res.send("Deleted record successfully");
        console.log("Deleted record successfully");
      }

  });

});




router.get('/getFoodInformation',function(req,res){


  usercustomfood.find({}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY CUSTOM FOOD");
    }
    else {
              console.log("NO FOOD AVAILABLE");
    }
  });
  console.log("Hello co orect info");

});
//display custom food 


router.get('/getcustomFoodInformation/:tagid/:fid',function(req,res){


  usercustomfood.findOne({item_name:req.params.tagid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY CUSTOM FOOD");
    }
    else {
              console.log("NO FOOD AVAILABLE");
    }
  });
  console.log("Hello coorect info");

});


//router end


//route to get a food search request from nutritionix API

router.get('/searchfood/:tagid',function(req,res){

  var urltonutritionx = "https://api.nutritionix.com/v1_1/search/"+req.params.tagid+"?results=0:5&fields=item_name,item_id&appId=7ab267ec&appKey=eb4ef3f6f990261bf762e091001c145b";
    request(urltonutritionx, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var info = JSON.parse(body);
        // console.log(info);
        // console.log(info.hits[0].fields)
        // do more stuff
        if(info.total_hits > 0)
        {
          var hits_arr = info.hits;
          // if((hits_arr.length > 1) &&  (hits_arr[0].fields.item_name != hits_arr[1].fields.item_name))
          // {
          //   hits_arr.forEach(function(value){
          //   console.log(value.fields.item_name);
          // });
          // }
          // else {
          //   console.log(info.hits[0].fields.item_name);
          //
          // }

        res.send({"arry":hits_arr});
      //    res.send(hits_arr);
        }
        else {
          res.send({"arry":{"err":"404"}});
        }


      }
    });



  console.log("Hello sidncdsoic");

});

//route end


//router to cater the nutrition information for a food item_name


router.get('/getFoodInfo/:tagid/:fid',function(req,res){


  foodinfo.findOne({item_name:req.params.tagid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("lksdnlknklndsvnkldvndsklvnsdkln");
    }
    else {
      console.log("No such food item in the database.");
      var opt="item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_dietary_fiber,nf_sodium,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_serving_size_qty";
      var urltonutritionx = "https://api.nutritionix.com/v1_1/item?id="+req.params.fid+"&appId=7ab267ec&appKey=eb4ef3f6f990261bf762e091001c145b";
      request(urltonutritionx, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log("status 200!!");  
          if(info)
          {
            console.log("Info.");
            var fs = require('fs');
            var xor = JSON.parse(fs.readFileSync('./train.json', 'utf8'));
            var foodInfoObj = [];
            var arr =  [info.nf_calories,info.nf_total_fat,info.nf_total_carbohydrate,info.nf_dietary_fiber,info.nf_protein,info.nf_vitamin_a_dv,info.nf_vitamin_c_dv,info.nf_iron_dv]
            var clf = new svm.CSVC(
            {nu: 0.1,
            kernelType: svm.kernelTypes.RBF,
            gamma: 0.1,
            normalize: false,
            reduce: false,
            kFold: 1 // disable k-fold cross-validation
            });

          clf.train(xor)
                .then(function () {
                    console.log(clf.evaluate([[[45,5.24,2.06,229,3.01,12,23,65,3,4], 1]]));
                })
                .done(function () {
            // predict things
                  prediction = clf.predictSync(arr);
                console.log(prediction);
                //res.send("myprediction"+prediction+"heheh");

                  foodInfoObj = new foodinfo({
                //Fetching the food items and saving it into the database
                "item_name": req.params.tagid,
                "nf_calories": info.nf_calories,
                "nf_total_fat": info.nf_total_fat,
                "nf_total_carbohydrate": info.nf_total_carbohydrate,
                "nf_dietary_fiber":info.nf_dietary_fiber,
                "nf_protein": info.nf_protein,
                "nf_vitamin_a_dv": info.nf_vitamin_a_dv,
                "nf_vitamin_c_dv":info.nf_vitamin_c_dv,
                "nf_calcium_dv":info.nf_calcium_dv,
                "nf_iron_dv": info.nf_iron_dv,
                "nf_serving_weight_grams":100,
                "food_category" : prediction
                });
              console.log(foodInfoObj);
                foodInfoObj.save(function(err,result){
                  console.log("Came to sace");
                  if(!err){
                      console.log("added");
                            }
                            else{
                                console.log(err);
                            }
              });
            res.send(foodInfoObj);
             });

            // if((hits_arr.length > 1) &&  (hits_arr[0].fields.item_name != hits_arr[1].fields.item_name))
            // {
            //   hits_arr.forEach(function(value){
            //   console.log(value.fields.item_name);
            // });
            // }
            // else {
            //   console.log(info.hits[0].fields.item_name);
            //
            // }
             
          }
          else {
            res.send("Sorry but we couldnt find what you are looking for!!");
          }
        }
      });
    }
  });
  console.log("Hello sidncdsoic");

});
//







router.get('/getFoodInfo1/:tagid/:fid',function(req,res){


  foodinfo.findOne({_id: req.params.tagid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("lksdnlknklndsvnkldvndsklvnsdkln");
    }
    else {
      console.log("No such food item in the database.");
      var opt="item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_dietary_fiber,nf_sodium,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_serving_size_qty";
      var urltonutritionx = "https://api.nutritionix.com/v1_1/item?id="+req.params.fid+"&appId=7ab267ec&appKey=eb4ef3f6f990261bf762e091001c145b";
      request(urltonutritionx, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log("status 200!!");  
          if(info)
          {
            console.log("Info.");
            var fs = require('fs');
            var xor = JSON.parse(fs.readFileSync('./train.json', 'utf8'));
            var foodInfoObj = [];
            var arr =  [info.nf_calories,info.nf_total_fat,info.nf_total_carbohydrate,info.nf_dietary_fiber,info.nf_protein,info.nf_vitamin_a_dv,info.nf_vitamin_c_dv,info.nf_iron_dv]
            var clf = new svm.CSVC(
            {nu: 0.1,
            kernelType: svm.kernelTypes.RBF,
            gamma: 0.1,
            normalize: false,
            reduce: false,
            kFold: 1 // disable k-fold cross-validation
            });

          clf.train(xor)
                .then(function () {
                    console.log(clf.evaluate([[[45,5.24,2.06,229,3.01,12,23,65,3,4], 1]]));
                })
                .done(function () {
            // predict things
                  prediction = clf.predictSync(arr);
                console.log(prediction);
                //res.send("myprediction"+prediction+"heheh");

                  foodInfoObj = new foodinfo({
                //Fetching the food items and saving it into the database
                "item_name": req.params.tagid,
                "nf_calories": info.nf_calories,
                "nf_total_fat": info.nf_total_fat,
                "nf_total_carbohydrate": info.nf_total_carbohydrate,
                "nf_dietary_fiber":info.nf_dietary_fiber,
                "nf_protein": info.nf_protein,
                "nf_vitamin_a_dv": info.nf_vitamin_a_dv,
                "nf_vitamin_c_dv":info.nf_vitamin_c_dv,
                "nf_calcium_dv":info.nf_calcium_dv,
                "nf_iron_dv": info.nf_iron_dv,
                "nf_serving_weight_grams":100,
                "food_category" : prediction
                });
              console.log(foodInfoObj);
                foodInfoObj.save(function(err,result){
                  console.log("Came to sace");
                  if(!err){
                      console.log("added");
                            }
                            else{
                                console.log(err);
                            }
              });
            res.send(foodInfoObj);
             });

            // if((hits_arr.length > 1) &&  (hits_arr[0].fields.item_name != hits_arr[1].fields.item_name))
            // {
            //   hits_arr.forEach(function(value){
            //   console.log(value.fields.item_name);
            // });
            // }
            // else {
            //   console.log(info.hits[0].fields.item_name);
            //
            // }
             
          }
          else {
            res.send("Sorry but we couldnt find what you are looking for!!");
          }
        }
      });
    }
  });
  console.log("Hello sidncdsoic");

});



//router end

router.get('/search/:sfood', function(req, res){
  var t = req.params.sfood;
  console.log("search for "+t);
  foodinfo.find({item_name: new RegExp(t, 'i')}, function(err, results) {
      res.json(results);
  }).limit(5);
});

router.get('/', function (req, res) {
    res.sendFile('food.html', { root: path.join(__dirname, '../assets/views') });
});

router.get('/getfood', function (req, res) {

  console.log("Route to fetch all foodinfo..");

  foodinfo.find({},function(err,result){
          res.json(result);
        })
//  res.send(feedbackdata);

  console.log("foodinfo log data: ");
});

router.post('/add',function(req,res){


        //Logic to calculate the nutritional density of food item.

  var protein_dv = parseInt(req.body.protein) / 50;
  var df_dv = parseInt(req.body.fiber) / 25;
  var nutdensity = (protein_dv+df_dv+parseInt(req.body.vitamin_a)+parseInt(req.body.vitamin_c)+parseInt(req.body.calcium)+parseInt(req.body.iron))/6;
  var cal_precent = parseInt(req.body.calories)/ 2000;
  var final_nv = nutdensity/ cal_precent;

  console.log("Nut density"+ final_nv);

  console.log("pro density"+ protein_dv+"df_dv "+df_dv+"\ncal percent:"+cal_precent);

    var foodInfo = new foodinfo({
//Fetching the food items and saving it into the database
      "item_name": req.body.fname,
      "nf_calories": req.body.calories,
     // "nf_calories_from_fat": req.body.calfat,
      "nf_total_fat": req.body.fat,
      "nf_total_carbohydrate": req.body.carbs,
      "nf_dietary_fiber": req.body.fiber,
      "nf_protein": req.body.protein,
      "nf_vitamin_a_dv": req.body.vitamin_a,
      "nf_vitamin_c_dv": req.body.vitamin_c,
      "nf_calcium_dv": req.body.calcium,
      "nf_iron_dv": req.body.iron,
      "nf_serving_weight_grams": req.body.serving,
      "nutritional_density" : final_nv,
      "food_category":req.body.category

    });

//Saving the item into the mongo db database if same item doesnot exist

foodinfo.findOne({"item_name":req.body.fname},function(err,result){
  if(result)
  {
    res.send("A food of such name already exists.");
  }
  else {
    foodInfo.save(function(err,result){
        console.log("Came to sace");
        if(!err){
            console.log("added");
            //res.write("food added successfully");
          //res.send("The requested food has beed successfully added.");
          res.redirect('../../admin/food');

            }
            else{
                res.send(err);
            }
    });
  }

});
});

//router to get particular food items data
router.get('/update/:id', function (req, res) {
  console.log("req for update id"+req.params.id);
  foodinfo.findById({_id:req.params.id}, function (err, result) {
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


//route for updating the food information



router.post('/update',function(req,res){

console.log("The request  in update tagid: "+req.body.fname + " "+req.body._id);

var protein_dv = parseInt(req.body.protein) / 50;
var df_dv = parseInt(req.body.fiber) / 25;
var nutdensity = (protein_dv+df_dv+parseInt(req.body.vitamin_a)+parseInt(req.body.vitamin_c)+parseInt(req.body.calcium)+parseInt(req.body.iron))/6;
var cal_precent = parseInt(req.body.calories)/ 2000;
var final_nv = nutdensity/ cal_precent;


foodinfo.findOneAndUpdate({ _id: req.body._id }, {
            "item_name": req.body.fname,
            "nf_calories": req.body.calories,
            "nf_calories_from_fat": req.body.calfat,
            "nf_total_fat": req.body.fat,
            "nf_total_carbohydrate": req.body.carbs,
            "nf_dietary_fiber": req.body.fiber,
            "nf_protein": req.body.protein,
            "nf_vitamin_a_dv": req.body.vitamin_a,
            "nf_vitamin_c_dv": req.body.vitamin_c,
            "nf_calcium_dv": req.body.calcium,
            "nf_iron_dv": req.body.iron,
            "nf_serving_weight_grams": req.body.serving,
            "nutritional_density" : final_nv
 }, function(err, foodinfo) {
  if (err) throw err;

  //res.send(req.body.fname + " is Updated successfully");
  res.redirect('../../admin/food');
  console.log(foodinfo);
});
/*
foodinfo.findOneAndUpdate({ _id: '57f0a5e3dfe91d202a978d74' }, { food_name: req.body.item_name }, function(err, foodinfo) {
  if (err) throw err;

  res.send(foodinfo);
  console.log(foodinfo);
});
*/

console.log("The requested value has been updated!!");
});



//route to delete the food information
router.get('/delete/:foodID',function(req,res){
console.log("Deleted record successfully"+req.params.foodID);


  foodinfo.findByIdAndRemove(req.params.foodID,function(err){
      if(err) throw err;
      else{
        res.send("Deleted record successfully");
        console.log("Deleted record successfully");
      }

  });

});

router.get('/loaduserfood/:uid', function (req, res) {

  console.log("Route to fetch all foodinfo..");

  userfood.findOne({"user":req.params.uid},function(err,result){
  if(result)
  {
    res.json(result);
    console.log("ans"+res);
  }
  else
  {
    console.log("err"+err);
  }
  });

  console.log("foodinfo log data: ");
});

module.exports = router;
