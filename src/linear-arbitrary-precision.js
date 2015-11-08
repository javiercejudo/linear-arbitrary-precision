/*jshint node:true */

'use strict';

var isString = require('lodash.isstring');
var assert = require('assert-error');
var coreArbitraryPrecision = require('core-arbitrary-precision');
var flow = require('lodash.flow');

var extend = flow(
  require('plus-arbitrary-precision'),
  require('minus-arbitrary-precision'),
  require('equals-arbitrary-precision')
);

module.exports = function factory(adapter) {
  var Decimal = coreArbitraryPrecision(adapter);
  var p = Decimal.prototype;

  p.times = function times(x) {
    return newDecimalFromImpl(adapter.times(this.val(), x.val()));
  };

  p.div = function div(x) {
    return newDecimalFromImpl(adapter.div(this.val(), x.val()));
  };

  function newDecimalFromImpl(x) {
    return new Decimal(adapter.toString(x));
  }

  return extend(Decimal);
};
