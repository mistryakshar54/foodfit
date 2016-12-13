var svm = require('node-svm');

var xor = [
    [[136,7.2,9.6,640,4.8,3.2,4.8,8,16,12], 2],
    [[57,13.16,0.86,6,0.67,7,1,59,0,1], 1],
    [[62,10.84,1.02,119,2.59,6,0,0,4,1], 1],
    [[129,27.9,0.28,365,2.66,2,0,0,7,1], 2]
];

// initialize a new predictor
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
            console.log(clf.evaluate([[[260,41,8,590,6,16,0,2,20,10], 2]]));
        })
		.done(function () {
    // predict things
        var prediction = clf.predictSync([260,41,8,590,6,16,0,2,20,10]);
        console.log(prediction);
    
});