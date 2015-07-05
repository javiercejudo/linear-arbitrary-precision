/*jshint node:true */

'use strict';

var bignumber = require('bignumber.js');

module.exports = {
  getInstance: getInstance,
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

function getPrecision(Bignumber) {
  return Bignumber.config().DECIMAL_PLACES;
}

function setPrecision(Bignumber, n) {
  Bignumber.config(n);
}

function plus(bignumber, x) {
  return bignumber.plus(x);
}

function minus(bignumber, x) {
  return bignumber.minus(x);
}

function times(bignumber, x) {
  return bignumber.times(x);
}

function div(bignumber, x) {
  return bignumber.div(x);
}

function toString(bignumber) {
  return bignumber.toString();
}

function valueOf(bignumber) {
  return bignumber.valueOf();
}

function getInstance() {
  return bignumber.another();
}
