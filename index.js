//loading dependancies
var express = require('express');
var logger = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//firebase for testing
var FCM = require('fcm-node');
//connecting to database

//mongoose.connect("mongodb://localhost:27017/fst");  	//incomplete statement, add configuration here
mongoose.connect("mongodb://mistryakshar54:aks1611947@ds153735.mlab.com:53735/fst");
//initialize express server
var app = express();

//for cross domain 
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(logger('dev'));



app.use("/rest",require('./routes/LocationController'))
//routes

app.use("/admin/user",require('./routes/user'))
app.use("/admin/rest",require('./routes/restaurant'))
app.use("/admin/login",require('./routes/user'))
app.use("/admin/food",require('./routes/foodinfo'))
app.use("/admin/test",require('./routes/testAPI'))

app.use("/admin/rest",require('./routes/testing'))

app.use("/admin/feedback",require('./routes/feedback'))

app.use("/appuser/login",require('./routes/user'))

app.use("/appuser/register",require('./routes/user'))


//send mail
app.use("/sendmail",require("./routes/sendmail"))
//

//app.use("/testme", require('./routes/calval'))
app.use("/testme",function(req,res){
	res.send("ljkdscnjdskcnjdccds"+req.body.mid+req.body.pwd);
})
//user routes
app.use("/user/food",require('./routes/foodinfo'))

 app.use("/testsvm",require('./routes/svm'))

//router for custom food info
app.use("/user/custominfo",require('./routes/loaduserfood'))
app.use("/user/custominformation",require('./routes/foodinfo'))
//recommended foods 
app.use("/user/recommend", require('./routes/reccomendation'))
app.use("/user/stepinfo",require('./routes/user'))

app.use(express.static(__dirname+'/FSTWebsite/'));

app.use("/admin", express.static(__dirname+'/assets/'));

app.get("/aa", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

//start server
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
