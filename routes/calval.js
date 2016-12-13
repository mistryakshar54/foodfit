var express = require('express');
 var session = require('express-session');
var router = express.Router();


router.post("/",function(req,res){

	res.send("ljkdscnjdskcnjdccds"+req.params.mid+req.body.pwd);

})

module.exports = router;