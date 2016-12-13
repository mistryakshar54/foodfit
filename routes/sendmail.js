var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var user = require('../models/user')
var md5 = require('js-md5');


router.post("/", function(req,res){
    
    var mid = req.body.emailid;
    var pass = md5(''+req.body.emailid);
    var pass=pass.substring(1,12);
    var stat = "true";
    console.log(pass);
	console.log(mid+" "+pass);
	user.findOneAndUpdate({email: mid},{
    "password": pass,
	}, function(err, res) {
	if(err)
	{
		console.log("error:"+err);
		res.send("error:"+err);
	}  
	else
	{
		console.log("chal gaya!!");
		var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'mistryakshar54@gmail.com',
        pass: 'mistry.aks@gmail.com'
    }
	});

// setup e-mail data
var mailOptions = {
    from: 'FoodFit <sengroup2016@gmail.com>', // sender address (who sends)
    to: req.body.emailid, // list of receivers (who receives)
    subject: 'Password Recovery Email', // Subject line
    text: 'Dear user', // plaintext body
    html: 'We found you have lost your password!<br/>But no worries.. we got your back!! Heres your new password:'+pass // html body
	};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        stat = "false";
    }

    console.log('Message sent: ' + info.response);
     stat = "true";
	});	
	}
	
 

	//end user update
	});

	res.send(stat);


	
});

module.exports = router;
