/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var decimalFactory = require('../src/arbitrary-precision');

var decimalDep = process.env.DECIMAL ? process.env.DECIMAL : 'big.js';

describe('linear arbitrary precision with ' + decimalDep, function() {
  describe('decimalFactory', function() {
    it('should return independently configurable Decimals', function() {
      var Decimal5 = decimalFactory();
      var Decimal10 = decimalFactory();

      Decimal5.setPrecision(5);
      Decimal10.setPrecision(10);

      new Decimal5(1).div(3).toString().should.be.exactly('0.33333');
      new Decimal10(1).div(3).toString().should.be.exactly('0.3333333333');
    });
  });

  describe('Decimal', function() {
    var Decimal = decimalFactory();

    describe('precision', function() {
      var initialPrecision = Decimal.getPrecision();

      it('should be able to get the current precision', function() {
        Decimal.getPrecision().should.have.type('number');

        new Decimal(1).div(3).toString().should.be.exactly('0.33333333333333333333');
      });

      it('should be able to set the current precision', function() {
        Decimal.setPrecision(42);
        Decimal.getPrecision().should.be.exactly(42);
        new Decimal(1).div(3).toString().should.be.exactly('0.333333333333333333333333333333333333333333');

        Decimal.setPrecision(initialPrecision);
      });
    });

    describe('operations', function() {
      it('should have a plus method', function() {
        new Decimal(0.1).plus(0.2).toString().should.be.exactly('0.3');
      });

      it('should have a minus method', function() {
        new Decimal(0.3).minus(0.1).toString().should.be.exactly('0.2');
      });

      it('should have a times method', function() {
        new Decimal(0.6).times(3).toString().should.be.exactly('1.8');
      });

      it('should have a div method', function() {
        new Decimal(0.3).div(0.2).toString().should.be.exactly('1.5');
      });
    });

    describe('toString, valueOf and JSON', function() {
      it('should be able to return a string representation', function() {
        var decimalThird = new Decimal(1).div(3);

        decimalThird.toString().should.be.exactly('0.33333333333333333333')
          .and.exactly(decimalThird.valueOf())
          .and.exactly(decimalThird.toJSON());
      });

      it('should play nicely with Number()', function() {
        var decimalThird = new Decimal(1).div(3);

        Number(decimalThird).should.be.exactly(1/3);
      });

      it('should play nicely with JSON.stringify()', function() {
        var Decimal40 = decimalFactory();

        Decimal40.setPrecision(40);

        var decimalThird = new Decimal40(1).div(3);
        var stringified = JSON.stringify([decimalThird]);

        stringified.should.be.exactly('["0.3333333333333333333333333333333333333333"]');

        JSON.parse(stringified, Decimal40.JSONReviver)[0].should.eql(decimalThird);
      });
    });
  });
});
