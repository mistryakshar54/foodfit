var express = require('express');
var router = express.Router();
var svm = require('node-svm');
var fs = require('fs');
            var xor = JSON.parse(fs.readFileSync('./train.json', 'utf8'));
            
// var xor = [
//     [[136,7.2,9.6,640,4.8,3.2,4.8,8,16,12], 2],
//     [[57,13.16,0.86,6,0.67,7,1,59,0,1], 1],
//     [[62,10.84,1.02,119,2.59,6,0,0,4,1], 1],
//     [[129,27.9,0.28,365,2.66,2,0,0,7,1], 2],
//     [[177,14.27,6.3,569,15.7,20,0,8,13,14], 3],
//     [[276,30.33,11.74,537,12.33,8,7,0,10,21], 3],
//     [[319,37.53,17.03,193,3.76,14,0,5,8,1],3]  
// ];


router.get("/" , function(req,res){
    // initialize a new predictor
var prediction = "abc";
        var clf = new svm.CSVC(
            {nu: 1,
            kernelType: svm.kernelTypes.LINEAR,
            gamma: 1,
            normalize: false,
            reduce: false,
            kFold: 1 // disable k-fold cross-validation
            });

//[[126.7605634,4.225352113,17.6056338,4.929577465,5.633802817,1.408450704,7.042253521,4.225352113,10.56338028],2],
        clf.train(xor)
                .then(function () {
                    console.log(clf.evaluate([[[489,24.73,64.06,22,5.5,0,0,4,20],3]]));
                })
                .done(function () {
            // predict things
                prediction = clf.predictSync([489,24.73,64.06,22,5.5,0,0,4,20]);
                console.log(prediction);
                res.send("myprediction"+prediction+"heheh");

         
});



});


module.exports = router;
