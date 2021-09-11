var jscov = require('jscov');
var should = require('should');
var source = require(jscov.cover('../../', 'api/controllers', 'calculate'));

//Function : Addition , purpose : Testing

describe("addition", function() {

  it("Should return 0 if no values are passed", function() {
    source.addition().should.eql(0);
  });

  it("Should return 0 if any one value is zero", function() {
    source.addition(1,0).should.eql(0);
  });


  it("Should return proper addition value", function() {
    source.addition(1,1).should.eql(2);
  });

});

//Function : createOperator , purpose : Sending different maths symbols and getting their operations

describe("createOperator", function() {

  it("Should return an object", function() {
    source.createOperator("+").should.be.an.Object()
  });

  it("Should not return an object", function() {
    source.createOperator("^").should.eql("null")
  });

});
