/* @flow */
'use strict';

// # stats-online
//
// An tool for on line descriptive statistics calculastions

var so = module.exports = {};

so.incrementer = require('./lib/incrementer'); 
so.poolVariances = require('./lib/pool-variances');
so.poolMeans = require('./lib/pool-means');
