/*jshint node:true, mocha:true */

'use strict';

var should = require('should');

var decimalFactory = require('../src/linear-arbitrary-precision');
var adapter = require('floating-adapter');

describe('linear operations with Floating', function() {
  var Decimal = decimalFactory(adapter);
  var ONE = new Decimal('1');

  describe('constructor', function() {
    it('should throw if called without new', function() {
      (function() {
        /*jshint -W064*/
        Decimal('1');
      }).should.throw();
    });

    it('should throw if used without a string', function() {
      (function() {
        new Decimal(1);
      }).should.throw(TypeError);
    });
  });

  describe('getAdapter', function() {
    it('should return the adapter that was passed in', function() {
      Decimal.getAdapter().should.be.exactly(adapter);
    });
  });

  describe('precision', function() {
    var initialPrecision = Decimal.getPrecision();

    it('should be able to get the current precision', function() {
      Decimal.getPrecision().should.have.type('number');
    });

    it('should be able to set the current precision', function() {
      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
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

    it('should have a mod method', function() {
      new Decimal('12').mod(new Decimal('5')).valueOf().should.be.exactly(2);
    });

    it('should have an abs method', function() {
      new Decimal('-12').abs().valueOf().should.be.exactly(12);
    });

    it('should have an equals method', function() {
      new Decimal('1').equals(new Decimal('1')).should.be.exactly(true);
      new Decimal('1').equals(new Decimal('2')).should.be.exactly(false);
    });

    it('should have an inequality methods', function() {
      should(ONE.lt).have.type('function');
      should(ONE.lte).have.type('function');
      should(ONE.gt).have.type('function');
      should(ONE.gte).have.type('function');
      should(ONE.cmp).have.type('function');
    });
  });

  describe('toString, valueOf and JSON', function() {
    it('should be able to return a string representation', function() {
      var decimalOne = new Decimal('1');

      decimalOne.toString().should.be.exactly('1')
        .and.exactly(decimalOne.toJSON());

      decimalOne.valueOf().should.be.exactly(1);
    });

    it('should play nicely with Number()', function() {
      var decimalOne = new Decimal('1');

      Number(decimalOne).should.be.exactly(1);
    });

    it('should play nicely with JSON.stringify()', function() {
      var decimalOne = new Decimal('1');
      var stringified = JSON.stringify(decimalOne);

      stringified.should.be.exactly('"1"');

      JSON.parse(stringified, Decimal.reviver).should.eql(decimalOne);
    });
  });
});
