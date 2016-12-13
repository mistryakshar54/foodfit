var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./index');
var should = chai.should();

chai.use(chaiHttp);

console.log(server);

describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('sen6.herokuapp.com/aa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.json;
              done();
            });
      });
  });

