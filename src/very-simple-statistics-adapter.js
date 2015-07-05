/*jshint node:true */

'use strict';

var vss = require('very-simple-statistics');

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

// not necessarily true nor enforceable
var precision = 17;

function VSS(x) {
  this.val = function() {
    return x;
  };
}

function getPrecision() {
  return precision;
}

function setPrecision(VSS, n) {
  precision = n;
}

function plus(x, y) {
  return new VSS(vss.sum([x.val(), y.val()]));
}

function minus(x, y) {
  return new VSS(vss.sum([x.val(), -y.val()]));
}

function times(x, y) {
  return new VSS(vss.product([x.val(), y.val()]));
}

function div(x, y) {
  return new VSS(vss.product([x.val(), 1 / y.val()]));
}

function toString(x) {
  return x.val().toString();
}

function valueOf(x) {
  return x.val().valueOf();
}

function getInstance() {
  return VSS;
}
