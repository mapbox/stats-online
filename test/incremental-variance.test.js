var test = require('tap').test;
var sizer = require('sample-sizer');
var Variance = require('../lib/incrementer');


test('incremental variance', function (t) {
  //compare incrementer to hand-calculated value
  var rs = new Variance();
  rs.push(17.0);
  rs.push(19.0);
  rs.push(24.0);
  rs.push(39.0);
  rs.push(102.0);
  t.equal(rs.variance().toFixed(4), 1014.16.toFixed(4), 'variance calculates correctly');
  t.end();
});

test('incremental stdev', function (t) {
  //compare incrementer to hand-calculated value
  var rs = new Variance();
  rs.push(17.0);
  rs.push(19.0);
  rs.push(24.0);
  rs.push(39.0);
  rs.push(102.0);
  t.equal(rs.standardDeviation().toFixed(4), 31.8459.toFixed(4), 'stdev calculates correctly');
  t.end();
});
