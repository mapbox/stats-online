
/**
 *  Returns the pooled mean of two Incrementer objects
 *
 *  @param {Incrementer} incrementer1 - object with information about means and counts from set 1.
 *  @param {Incrementer} incrementer2 - object with information about means and counts from set 2.
 */

module.exports = function (incrementer1, incrementer2) {
  return (incrementer1.mean() + (
    incrementer2.count() * (
      (incrementer2.mean() - incrementer1.mean())
      /
      (incrementer1.count() + incrementer2.count())
      )
    )
  );
};
