var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  name: String
  ,
  loc: {
    type: [Number],
    index: '2d'
  }
});

module.exports = mongoose.model('locations', locationSchema);
