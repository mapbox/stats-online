/**
 *  Returns the pooled mean of two Incrementer objects
 *
 *  @param {Incrementer} incrementer1 - object with information about means and counts from set 1.
 *  @param {Incrementer} incrementer2 - object with information about means and counts from set 2.
 */


// TODO: have this return a useable Incrementer object.
// but what will the "old" values be like? Hopefully they're
// not necessary for any of the other pooling tasks.
module.exports = function (incrementer1, incrementer2) {
  return (incrementer1.getMean() + (
    incrementer2.length * (
      (incrementer2.getMean() - incrementer1.getMean())
      /
      (incrementer1.length + incrementer2.length)
      )
    )
  );
};
