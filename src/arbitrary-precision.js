/*jshint node:true */

'use strict';

var optionale = require('optionale');
var DecimalImpl = optionale.some(['big.js', 'bignumber.js', 'decimal.js']);

module.exports = factory;

function factory() {
  var DecimalImplPristine = getDecimanlImplPristine();

  function Decimal(x) {
    var value = new DecimalImplPristine(x);

    this.val = function val() {
      return value;
    };
  }

  Decimal.getPrecision = getPrecision;
  Decimal.setPrecision = setPrecision;
  Decimal.JSONReviver = JSONReviver;

  var p = Decimal.prototype;

  p.plus = function plus(x) {
    return new Decimal(this.val().plus(x));
  };

  p.minus = function minus(x) {
    return new Decimal(this.val().minus(x));
  };

  p.times = function times(x) {
    return new Decimal(this.val().times(x));
  };

  p.div = function div(x) {
    return new Decimal(this.val().div(x));
  };

  p.toString = p.valueOf = p.toJSON = function toString() {
    return this.val().toString();
  };

  function getPrecision() {
    // big.js
    if (DecimalImplPristine.hasOwnProperty('DP')) {
      return DecimalImplPristine.DP;
    }

    // DecimalImpl.js
    if (DecimalImplPristine.hasOwnProperty('precision')) {
      return DecimalImplPristine.precision;
    }

    // bignumber.js
    return DecimalImplPristine.config().DECIMAL_PLACES;
  }

  function setPrecision(n) {
    if (DecimalImplPristine.hasOwnProperty('DP')) {
      // big.js
      DecimalImplPristine.DP = n;
    } else if (DecimalImplPristine.hasOwnProperty('precision')) {
      // decimal.js
      DecimalImplPristine.precision = n;
    } else {
      // bignumber.js
      DecimalImplPristine.config(n);
    }
  }

  function JSONReviver(key, value) {
    if (key === '') {
      return value;
    }

    return new Decimal(value);
  }

  return Decimal;
}

function getDecimanlImplPristine() {
  // decimal.js
  if (DecimalImpl.hasOwnProperty('constructor')) {
    return DecimalImpl.constructor();
  }

  // bignumber.js
  if (DecimalImpl.hasOwnProperty('another')) {
    return DecimalImpl.another();
  }

  // big.js
  return DecimalImpl.call();
}
