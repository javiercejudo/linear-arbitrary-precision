/*jshint node:true */

'use strict';

var LinearConversion = require('linear-conversion');

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

function LC(x) {
  this.val = function() {
    return x;
  };
}

function getPrecision() {
  return precision;
}

function setPrecision(LC, n) {
  precision = n;
}

function plus(xLC, yLC) {
  var y = yLC.val();

  return new LC(new LinearConversion([[0, 1], [y, 1 + y]]).convert(xLC.val()));
}

function minus(xLC, yLC) {
  var y = yLC.val();

  return new LC(new LinearConversion([[y, 1 + y], [0, 1]]).convert(xLC.val()));
}

function times(xLC, yLC) {
  return new LC(new LinearConversion([[0, 1], [0, yLC.val()]]).convert(xLC.val()));
}

function div(xLC, yLC) {
  return new LC(new LinearConversion([[0, yLC.val()], [0, 1]]).convert(xLC.val()));
}

function toString(x) {
  return x.val().toString();
}

function valueOf(x) {
  return x.val().valueOf();
}

function getInstance() {
  return LC;
}
