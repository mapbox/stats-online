var test = require('tap').test;
var Mean = require('../lib/incrementer');
var fixture = require('./fixtures/sets')


test('pooled mean', function (t) {
  var store = new Mean();
  var avgPartA = store.offlineAverage(fixture.partA);
  t.equal(avgPartA, 5);

  var avgPartB = store.offlineAverage(fixture.partB);
  t.equal(avgPartB, 15.5);

  t.end();
});
