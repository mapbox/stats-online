var poolMeans = require('./pool-means');

var Incrementer = require('./incrementer')
/**
 *  Returns the pooled variance of two Incrementer objects
 *
 *  @param {Incrementer} set1 - object with information about
 *  means and counts from set 1.
 *
 *  @param {Incrementer} set2 - object with information about
 *  means and counts from set 2.
 */


module.exports = function (set1, set2) {
  "Calculate the combined statistics from two rows of data."
  var n_a = set1.length;
  var mean_a = set1.mean;
  var var_a = set1.variance;
  var n_b = set2.length;
  var mean_b = set2.mean;
  var var_b = set2.variance;
  var n_ab = n_a + n_b;
  var mean_ab = poolMeans(set1, set2);
  var_ab = (((n_a * var_a) + (n_b * var_b)) / n_ab) + ((n_a * n_b) * ((mean_b - mean_a) / n_ab) * ((mean_b - mean_a) / n_ab))


  var incrementer = new Incrementer();
  incrementer.length = n_ab;
  incrementer.mean = mean_ab;
  incrementer.SS = (var_ab * n_ab);
  incrementer.variance = var_ab;

  return incrementer;
};
