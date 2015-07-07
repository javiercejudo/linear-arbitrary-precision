/*jshint node:true */

'use strict';

module.exports = factory;

function factory(adapter) {
  var DecimalImpl = adapter.getInstance();

  function Decimal(x) {
    var value = new DecimalImpl(x);

    this.val = function val() {
      return value;
    };
  }

  Decimal.getPrecision = getPrecision;
  Decimal.setPrecision = setPrecision;
  Decimal.JSONReviver = JSONReviver;

  var p = Decimal.prototype;

  p.plus = function plus(x) {
    return new Decimal(adapter.toJSON(adapter.plus(this.val(), x.val())));
  };

  p.minus = function minus(x) {
    return new Decimal(adapter.toJSON(adapter.minus(this.val(), x.val())));
  };

  p.times = function times(x) {
    return new Decimal(adapter.toJSON(adapter.times(this.val(), x.val())));
  };

  p.div = function div(x) {
    return new Decimal(adapter.toJSON(adapter.div(this.val(), x.val())));
  };

  p.toString = function toString() {
    return adapter.toString(this.val());
  };

  p.valueOf = function valueOf() {
    return adapter.valueOf(this.val());
  };

  p.toJSON = function toJSON() {
    return adapter.toJSON(this.val());
  };

  function getPrecision() {
    return adapter.getPrecision(DecimalImpl);
  }

  function setPrecision(n) {
    adapter.setPrecision(DecimalImpl, n);
  }

  function JSONReviver(key, value) {
    if (key === '') {
      return value;
    }

    return new Decimal(value);
  }

  return Decimal;
}
