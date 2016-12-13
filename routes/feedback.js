//Dependancies
var express = require('express');
var router = express.Router();
var path = require('path');
//models
var feedback = require('../models/feedback')

//router
router.get('/delete/:feedbackid', function(req,res){

  console.log("Route for delete feedback.ID: "+req.params.feedbackid);

  feedback.findByIdAndRemove(req.params.feedbackid,function(err){
      if(err) throw err;
      else{
        console.log("Deleted record successfully for id:"+req.params.feedbackid);  
        res.send("Deleted successfully");
      }
      
  });
});

router.get('/', function(req, res){
  res.sendFile('manage_feedback.html',{ root: path.join(__dirname, '../assets/views') });
  //console.log("view feedback called");
  //res.sendFile('index1.html', );

});

router.get('/getfeedback', function(req,res){

  console.log("Route to fetch all feedback..");
  feedback.find({},function(err,result){
  				res.json(result);
  			})
//  res.send(feedbackdata);

  console.log("Feedback log data: ");
});

module.exports = router;
