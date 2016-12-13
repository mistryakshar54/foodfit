var should = require("should");
var request = require("request");
var expect =require("chai").expect;
var baseurl= "http://sen6.herokuapp.com";
var util=require("util");
//models
var user = require('../models/user')


  describe('/GET user', function()  {
      it('it should check email id correct or not and return firstname', function(done) {
        request.get({url :baseurl +"/appuser/login/validate/viranijitu19@gmail.com/jitendra"},
          function(error,response,body)
          {
              var bodyObj=JSON.parse(body);
              console.log(bodyObj.firstName);
              expect(bodyObj.firstName).to.equal("Jitendra Virani");

              done();
          });

            });
      it('it should check email id correct or not and return firstname', function(done) {
        request.get({url :baseurl +"/appuser/login/validate/viranijitu19@gmail.com/jitendra"},
          function(error,response,body)
          {
              var bodyObj=JSON.parse(body);
              console.log(bodyObj.firstName);
              expect(bodyObj.firstName).to.equal("Jitendra Vira");

              done();
          });

            });

      it('it checks user registration', function(done) {
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

        request.post({url :baseurl +"/appuser/login/addApp"}).send(user_info)
          .end();

            




      });
  