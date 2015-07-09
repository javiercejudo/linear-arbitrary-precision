/*jshint node:true */

'use strict';

var isString = require('lodash.isstring');
var assert = require('assert-error');

module.exports = factory;

function factory(adapter) {
  var Impl = adapter.getInstance();

  function Decimal(x) {
    assert(this instanceof Decimal, new Error('Decimal must be called with new'));
    assert(isString(x), new TypeError('Expected a string but instead got ' + typeof x));

    var value = new Impl(adapter.parseInput(x));

    this.val = function val() {
      return value;
    };
  }

  Decimal.getPrecision = getPrecision;
  Decimal.setPrecision = setPrecision;
  Decimal.JSONReviver = JSONReviver;

  var p = Decimal.prototype;

  p.plus = function plus(x) {
    return newDecimalFromImpl(adapter.plus(this.val(), x.val()));
  };

  p.minus = function minus(x) {
    return newDecimalFromImpl(adapter.minus(this.val(), x.val()));
  };

  p.times = function times(x) {
    return newDecimalFromImpl(adapter.times(this.val(), x.val()));
  };

  p.div = function div(x) {
    return newDecimalFromImpl(adapter.div(this.val(), x.val()));
  };

  p.toString = p.toJSON = function toString() {
    return adapter.toString(this.val());
  };

  p.valueOf = function valueOf() {
    return adapter.valueOf(this.val());
  };

  function getPrecision() {
    return adapter.getPrecision(Impl);
  }

  function setPrecision(n) {
    adapter.setPrecision(Impl, n);
  }

  function JSONReviver(key, x) {
    if (key === '') {
      return x;
    }

    return new Decimal(x);
  }

  function newDecimalFromImpl(x) {
    return new Decimal(adapter.toString(x))
  }

  return Decimal;
}
