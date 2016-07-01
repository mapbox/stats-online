var test = require('tap').test;
var Mean = require('../lib/incrementer');
var pool = require('../lib/pool-means');
var fixture = require('./fixtures/sets')


test('pooled mean', function (t) {
  var incrementer1 = new Mean();
  var incrementer2 = new Mean();
  var unified = new Mean();

  // create two incrementer objects with online means
  for (var i = 0; i < fixture.partA.length; i++) {
    incrementer1.push(fixture.partA[i]);
    unified.push(fixture.partA[i]);
  }

  for (var j = 0; j < fixture.partB.length; j++) {
    incrementer2.push(fixture.partB[j]);
    unified.push(fixture.partB[j]);
  }

  var pooled = pool(incrementer1, incrementer2);
  t.equal(unified.mean(), pooled, 'means are pooled as if they were calculated explicitly')

  t.end();
});
