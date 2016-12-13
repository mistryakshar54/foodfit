//Dependancies 	
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//models  
var user = require('../models/user')
//router
var stepin = require('../models/userstepinfo')

//route to register from website
router.post('/add',function(req,res){

	console.log("reached to add functionality!!");
	console.log("l;amsc;lasc: "+req.body.fname);


	var user_info = new user({
			"firstName":req.body.fname,
			"userName":req.body.uname,
			"password":req.body.pass,
			"gender":req.body.gender,
			"email":req.body.email,
			"age":req.body.age,
			"height":req.body.height,
			"weight":req.body.weight,
		//	"profilepic":req.body.pic,
	 //	"zipcode":req.body.code,
		//	"country":req.body.country,
			"calorieintake":req.body.calin,
		//	"weightlost":req.body.loss,
		//	"isallergic":req.body.isalg,
			"dailystepgoal":req.body.goalstep
	});
	user_info.save(function(err,result){
		console.log("Came to sace");
		if(!err){
			console.log("added");
        res.redirect("../../../");
			}
			else{
				console.log(err);
        res.send("/");
			}
	})
});





//route to regsiter from app
router.post('/addApp',function(req,res){

  console.log("reached to add functionality!!");
  console.log("l;amsc;lasc: "+req.body.fname);


  var user_info = new user({
      "firstName":req.body.fname,
      "userName":req.body.uname,
      "password":req.body.pass,
      "gender":req.body.gender,
      "email":req.body.email,
      "age":req.body.age,
      "height":req.body.height,
      "weight":req.body.weight,
      "calorieintake":req.body.calin,
      "dailystepgoal":req.body.goalstep
  });
  user_info.save(function(err,result){
    console.log("Came to sace");
    if(!err){
      console.log("added");
        //res.send("done");

         user.findOne({ "email": req.body.email,"password":req.body.pass}, function(err1, data) {
          console.log("req.body.email"+req.body.email+"\nreq.body.password"+req.body.pass)
                  if (!err1) {
                    if(data == null)
                    {
                      res.send("false");
                    }
                    else
                    {

                      res.json(data);
                    }
                    
                  }
                  else
                  {
                        console.log('false');
                        res.send("false");  
                  }
           });

      }
      else{
        //console.log(err);
        res.send("false");
      }
  })
});

//route end


router.post('/addstep',function(req,res){

  console.log("reached to add functionality!!");
  // console.log("l;amsc;lasc: "+req.body.fname);


  var stepinfo = new stepin({
      "user_id":req.body.uid,
      "date":req.body.sdate,
      "totalStep":req.body.step
  })

  console.log(stepinfo+"\n\n\n"+req.body.uid+req.body.sdate+req.body.step);
  stepinfo.save(function(err,result){
    console.log(result);
    console.log("Came to sace");
    if(!err){
      console.log("added");
      res.send("done");
      
      }
      else{
        console.log(err);
        res.send(err);
    }
  })
});


// pass word change

router.post('/chPass',function(req,response){

console.log(req.body.uid);
user.findOneAndUpdate({firstName: req.body.uid,password:req.body.olpass},{
      "firstName":req.body.uid,
      "password":req.body.newpass
  
}, function(err, res) {
  if (err) throw err;

    //  res.redirect('../../');

  console.log(req.body.newpass);
  res.redirect('index.html');
});


console.log("The requested value has been updated!!");
});


router.post('/updatestepinfo/:uid',function(req,response){

console.log(req.body.uid);
stepinfo.findOneAndUpdate({userName: req.body.uid},{
 "user_id":req.body.uid,
      "date":req.body.sdate,
      "totalStep":req.body.step
}, function(err, res) {
  if (err) throw err;

    //  res.redirect('../../');
  console.log(user);
});


console.log("The requested value has been updated!!");
});

router.get('/userstepinfo/:uid',function(req,res){

  stepin.find({"user_id":req.params.uid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY");
    }
    else {
              console.log("NO AVAILABLE");
    }
  });
  console.log("Hello coorect info");

});


//food report data


router.get('/userstepinfo/:uid/:dd/:mm/:yyyy',function(req,res){
var today = req.params.dd+'/'+req.params.mm+'/'+req.params.yyyy;

console.log(today);
//"date":req.params.today
  stepin.find({"user_id":req.params.uid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY");
    }
    else {
              console.log("NO AVAILABLE");
    }
  });
  console.log("Hello coorect info");

});


router.get('/getuserstepinfo/:uid',function(req,res){


  stepinfo.findOne({"user_id":req.params.uid}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY");
    }
    else {
              console.log("NO AVAILABLE");
    }
  });
  console.log("Hello coorect info");

});

// getting user information
router.get('/getuserinfo/:uname',function(req,res){


  user.findOne({"_id":req.params.uname}, function (err, result) {
    if(result)
    {
        console.log(result);
        res.send(result);
        console.log("USER DISPLAY");
    }
    else {
              console.log("NO AVAILABLE");
    }
  });
  console.log("Hello coorect info");

});
//display custom food 


//route to update in website
router.post('/update',function(req,res){

console.log(req.body.uname);
user.findOneAndUpdate({userName: req.body.uname},{

  "firstName":req.body.fname,
      "userName":req.body.uname,
      "password":req.body.pass,
      "gender":req.body.gender,
      "email":req.body.email,
      "age":req.body.age,
      "height":req.body.height,
      "weight":req.body.weight,
    //  "profilepic":req.body.pic,
   // "zipcode":req.body.code,
    //  "country":req.body.country,
      "calorieintake":req.body.calin,
    //  "weightlost":req.body.loss,
    //  "isallergic":req.body.isalg,
      "dailystepgoal":req.body.goalstep

}, function(err, result) {
  if(!err)
  {
    res.send("1");
    console.log("The requested value has been updated!!");

  }
  else
  {
    res.send("0");
  }
    //  res.redirect('../../');
 // console.log(user);
});


});



//Update in app
router.post('/updateApp',function(req,response){

console.log(req.body.uname);
user.findOneAndUpdate({email: req.body.email},{

      "firstName":req.body.fname,
      "userName":req.body.uname,
      "password":req.body.pass,
      "gender":req.body.gender,
      "email":req.body.email,
      "dob":req.body.dob,
      "height":req.body.height,
      "weight":req.body.weight,
      "calorieintake":req.body.calin,
      "dailystepgoal":req.body.goalstep

}, function(err, res) {
  if (err) throw err;
  else res.json(res);
    //  res.redirect('../../');
  console.log(user);
});


console.log("The requested value has been updated!!");
}); 
//


//Do not change this route. This route is for Applicaton
router.post('/validateAppLogin',function(req,res){
  console.log("ddggdgdg");
  console.log(req.params.pwd);
  
//  console.log("hi"+req.params.email+" hi"+req.params.pwd);
//console.log("The request  in validate tagid: "+req.body.email+" "+req.body.password);
user.findOne({ "email": req.body.email,"password":req.body.password}, function(err, result) {
        if (!err) {
          if(result == null)
          {
            res.send("false");
          }
          else
          {
            res.send("true");
          }
          
        }
        else
        {
              console.log('false');
              res.send("false");  
        }
 });
});





//validate uname and password for admin panel at a login time
router.get('/validate/:email/:pwd',function(req,res){
	console.log("ddggdgdg");
	console.log(req.params.pwd);
	
//	console.log("hi"+req.params.email+" hi"+req.params.pwd);
//console.log("The request  in validate tagid: "+req.body.email+" "+req.body.password);
user.findOne({ "email": req.params.email,"password":req.params.pwd}, function(err, result) {
  if (!err) {
          if(result == null)
          {
           // res.send("false");
           console.log('invalid id and passs');
          }
          else
          {
            //res.send("true");
            console.log(result);
            var ser = {
              "firstName":result.firstName,
              "uid":result._id
            };
                  console.log(result);
                  res.status(200);
                   res.send(result);
          }
          
        }
        else
        {
              console.log('false');
             // res.send("false");  
        }

 });
});

//app validation route
router.post('/validateapp',function(req,res){
  console.log("validation wala route");
  console.log(req.body.email);
  
//  console.log("hi"+req.params.email+" hi"+req.params.pwd);
//console.log("The request  in validate tagid: "+req.body.email+" "+req.body.password);
      user.findOne({ "email": req.body.email,"password":req.body.password}, function(err, result) {
              if (err) {
                  console.log('Signup error');
              }
           /*   if (user.length !=0) {
                if(user[0].userName){
                    console.log('Username already exists, username: ' + req.body.email);*/
              else if(result)
              {
                console.log("login successfully done");
                res.send("0");
              }
              else
              {
                console.log("No such user!");
                res.send("1");
              }

       });
});


// validte app user email
router.post('/appvalidate',function(req,res){
console.log("The request  in  tagid: "+req.body.email);

user.findOne({ "email":req.body.email }, function(err, result) {

        if(err)
        {
          res.send(err);
        }

        else if(result)
        {
        	console.log("The user already exists");
        	res.send("0");
        }

        else
        {
        	console.log("No such user!");
					res.send("1");
			  }

 });
});



router.get('/delete/:restID',function(req,res){
console.log("Deleted record successfully"+req.params.restID);


  user.findByIdAndRemove(req.params.restID,function(err){
      if(err) throw err;
      else
      console.log("Deleted record successfully");
  });

});

module.exports = router;
