/*jshint node:true */

'use strict';

var bigjs = require('big.js');

module.exports = {
  getInstance: bigjs,
  getPrecision: getPrecision,
  setPrecision: setPrecision,
  plus: plus,
  minus: minus,
  times: times,
  div: div,
  toString: toString,
  valueOf: valueOf,
  toJSON: valueOf
};

function getPrecision(Big) {
  return Big.DP;
}

function setPrecision(Big, n) {
  Big.DP = n;
}

function plus(big, x) {
  return big.plus(x);
}

function minus(big, x) {
  return big.minus(x);
}

function times(big, x) {
  return big.times(x);
}

function div(big, x) {
  return big.div(x);
}

function toString(big) {
  return big.toString();
}

function valueOf(big) {
  return big.valueOf();
}
