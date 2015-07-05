/*jshint node:true */

'use strict';

var floatingFactory = require('floating');

module.exports = {
  getInstance: floatingFactory,
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

// not necessarily true nor enforceable
var precision = 17;

function getPrecision() {
  return precision;
}

function setPrecision(Floating, n) {
  precision = n;
}

function plus(floating, x) {
  return floating.plus(x);
}

function minus(floating, x) {
  return floating.minus(x);
}

function times(floating, x) {
  return floating.times(x);
}

function div(floating, x) {
  return floating.div(x);
}

function toString(floating) {
  return floating.toString();
}

function valueOf(floating) {
  return floating.valueOf();
}
