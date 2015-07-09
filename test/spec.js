/*jshint node:true, mocha:true */

'use strict';

require('should');

var decimalFactory = require('../src/linear-arbitrary-precision');
var adapter = require('floating-adapter');

describe('linear operations with floating', function() {
  var Decimal = decimalFactory(adapter);

  describe('constructor', function() {
    it('should throw if called without new', function() {
      (function() {
        Decimal('1');
      }).should.throw();
    });

    it('should throw if used without a string', function() {
      (function() {
        new Decimal(1);
      }).should.throw(TypeError);
    });
  });

  describe('precision', function() {
    var initialPrecision = Decimal.getPrecision();

    it('should be able to get the current precision', function() {
      Decimal.getPrecision().should.have.type('number');

      new Decimal('1').div(new Decimal('3')).toString().should.be.exactly('0.3333333333333333');
    });

    it('should be able to set the current precision', function() {
      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
      new Decimal('1').div(new Decimal('3')).toString().should.be.exactly('0.3333333333333333');

      Decimal.setPrecision(initialPrecision);
    });
  });

  describe('operations', function() {
    it('should have a plus method', function() {
      new Decimal('0.1').plus(new Decimal('0.2')).valueOf().should.be.exactly(0.1 + 0.2);
    });

    it('should have a minus method', function() {
      new Decimal('0.3').minus(new Decimal('0.1')).valueOf().should.be.exactly(0.3 - 0.1);
    });

    it('should have a times method', function() {
      new Decimal('0.6').times(new Decimal('3')).valueOf().should.be.exactly(0.6 * 3);
    });

    it('should have a div method', function() {
      new Decimal('0.3').div(new Decimal('0.2')).valueOf().should.be.exactly(0.3 / 0.2);
    });
  });

  describe('toString, valueOf and JSON', function() {
    it('should be able to return a string representation', function() {
      var decimalThird = new Decimal('1').div(new Decimal('3'));

      decimalThird.toString().should.be.exactly('0.3333333333333333')
        .and.exactly(decimalThird.toJSON());

      decimalThird.valueOf().should.be.exactly(1/3);
    });

    it('should play nicely with Number()', function() {
      var decimalThird = new Decimal('1').div(new Decimal('3'));

      Number(decimalThird).should.be.exactly(1/3);
    });

    it('should play nicely with JSON.stringify()', function() {
      var Decimal40 = decimalFactory(adapter);

      Decimal40.setPrecision(40);

      var decimalThird = new Decimal40('1').div(new Decimal40('3'));
      var stringified = JSON.stringify([decimalThird]);

      stringified.should.be.exactly('["0.3333333333333333"]');

      JSON.parse(stringified, Decimal40.JSONReviver)[0].should.eql(decimalThird);
    });
  });
});
