var test = require('tap').test;
var Mean = require('../lib/incrementer');
var fixture = require('./fixtures/sets')


test('pooled mean', function (t) {
  var store = new Mean();
  for (var i = 0; i < fixture.precalculatedSets.length; i++) {
    var partA = fixture.precalculatedSets[i].partA;
    var partB = fixture.precalculatedSets[i].partB;
    var avgPartA = store.offlineAverage(partA);
    t.equal(avgPartA, fixture.precalculatedSets[i].individualMeans.partA);

    var avgPartB = store.offlineAverage(partB);
    t.equal(avgPartB, fixture.precalculatedSets[i].individualMeans.partB);
  }
  t.end();
});
