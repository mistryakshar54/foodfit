var express = require('express');
var router = express.Router();
var Location = require('./Location');

router.post('/', function(req, res) {

  var data = req.body;
  console.log(data);
  Location.create(data, function(err, created) {

    if (err) {
      res.status(500);
      return res.send(err);
    }
    console.log(created);
    return res.send('Created');

  });

});

router.post('/nearby', function(req, res) {

  Location.find({
    loc: {
      $near: req.body.locations,
      $maxDistance: 10/6371
    }
  }, function(err, locations) {

    if (err) {
      res.status(500);
      return res.send(err);
    }

    res.status(200);
    res.send(locations);

  });

});

module.exports = router;    
