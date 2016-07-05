var test = require('tap').test;
var Incrementer = require('../lib/incrementer');
var poolMeans = require('../lib/pool-means');
var poolVariances = require('../lib/pool-variances')
var fixtures = require('./fixtures/sets')


test('pooled mean', function (t) {
  for (var i = 0; i < fixtures.precalculatedSets.length; i++) {
    var fixture = fixtures.precalculatedSets[i];
    var incrementer1 = new Incrementer();
    var incrementer2 = new Incrementer();
    var unified = new Incrementer();

    // create two incrementer objects with online means
    for (var i = 0; i < fixture.partA.length; i++) {
      incrementer1.push(fixture.partA[i]);
      unified.push(fixture.partA[i]);
    }

    for (var j = 0; j < fixture.partB.length; j++) {
      incrementer2.push(fixture.partB[j]);
      unified.push(fixture.partB[j]);
    }

    var pooled = poolMeans(incrementer1, incrementer2);
    t.equal(unified.mean(), pooled, 'means are pooled as if they were calculated explicitly')

  }
  t.end();
});


test('pool of pooled variance', function (t) {
  for (var i = 0; i < fixtures.multiLayeredPooling.length; i++) {
    var fixture = fixtures.multiLayeredPooling[i];
    var incrementer1 = new Incrementer();
    var incrementer2 = new Incrementer();
    var incrementer3 = new Incrementer();
    var unified = new Incrementer();
    var unified2 = new Incrementer();


    // create two incrementer objects with online means
    for (var i = 0; i < fixture.partA.length; i++) {
      incrementer1.push(fixture.partA[i]);
      unified.push(fixture.partA[i]);
      unified2.push(fixture.partA[i]);
    }

    for (var j = 0; j < fixture.partB.length; j++) {
      incrementer2.push(fixture.partB[j]);
      unified.push(fixture.partB[j]);
      unified2.push(fixture.partB[j]);
    }

    var pooled = poolVariances(incrementer1, incrementer2);
    t.equal(unified.variance(), pooled.variance(), 'variances are pooled as if they were calculated explicitly')

    for (var k = 0; k < fixture.partC.length; k++){
      incrementer3.push(fixture.partC[k]);
      unified2.push(fixture.partC[k]);
    }
    var twicePooled = poolVariances(unified, incrementer3);
    t.equal(twicePooled.variance(), unified2.variance(), 'pooled variances are pooled as if they were calculated explicitly')
  }
  t.end();
});
