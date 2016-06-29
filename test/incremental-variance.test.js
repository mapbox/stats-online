var test = require('tap').test;
var sizer = require('sample-sizer');
var Variance = require('../lib/incrementer');


test('incremental variance', function (t) {
  var rs = new Variance();
  rs.push(17.0);
  rs.push(19.0);
  rs.push(24.0);
  rs.push(39.0);
  rs.push(102.0);
  t.equal(rs.variance().toFixed(4), 1267.7.toFixed(4), 'variance calculates correctly');
  t.end();
});

test('incremental stdev', function (t) {
  var rs = new Variance();
  rs.push(17.0);
  rs.push(19.0);
  rs.push(24.0);
  rs.push(39.0);
  rs.push(102.0);
  t.equal(rs.standardDeviation().toFixed(4), 35.60477.toFixed(4), 'stdev calculates correctly');
  t.end();
});

test('minimum sample size', function (t) {
  var rs = new Variance();
  rs.push(17.0);
  rs.push(19.0);
  rs.push(24.0);
  rs.push(39.0);
  rs.push(102.0);
  var error = 5;
  var confidence = 0.9;

  t.equal(sizer([17, 19, 24, 39, 102], confidence, error), rs.minimumSample(0.90, 5), 'RunningStat object reproduces sample-sizer calculation');
  t.end();
});
