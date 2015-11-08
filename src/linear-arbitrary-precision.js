/*jshint node:true */

'use strict';

var coreArbitraryPrecision = require('core-arbitrary-precision');
var flow = require('lodash.flow');

var extend = flow(
  require('plus-arbitrary-precision'),
  require('minus-arbitrary-precision'),
  require('times-arbitrary-precision'),
  require('div-arbitrary-precision'),
  require('equals-arbitrary-precision')
);

module.exports = function factory(adapter) {
  return extend(coreArbitraryPrecision(adapter));
};
