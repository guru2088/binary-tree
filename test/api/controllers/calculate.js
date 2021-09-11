var should = require('should');
var request = require('supertest');
var jscov = require('jscov');
var server = require('../../../app');


describe('controllers', function() {
  describe('home', function() {
    describe('GET /home', function() {
      it('should return a default string', function(done) {
        request(server)
          .get('/home')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql('Hello, Telepath.ai!');
            done();
          });
      });

      it('should accept a name parameter', function(done) {
        request(server)
          .get('/home')
          .query({ name: 'test'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql('Hello, test!');
            done();
          });
      });

    });

  });

});
