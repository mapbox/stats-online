/**
 *  Returns the pooled variance of two Incrementer objects
 *
 *  @param {Incrementer} set1 - object with information about
 *  means and counts from set 1.
 *
 *  @param {Incrementer} set2 - object with information about
 *  means and counts from set 2.
 */


// TODO: have this return a useable Incrementer object.
module.exports = function (set1, set2) {
  "Calculate the combined statistics from two rows of data."
  var n_a = set1.length;
  var mean_a = set1.mean();
  var_a = set1.variance();
  var n_b = set2.length;
  var mean_b = set2.mean();
  var var_b = set2.variance();
  var n_ab = n_a + n_b;
  var mean_ab = ((mean_a * n_a) + (mean_b * n_b)) / n_ab
  var_ab = (((n_a * var_a) + (n_b * var_b)) / n_ab) + ((n_a * n_b) * ((mean_b - mean_a) / n_ab) * ((mean_b - mean_a) / n_ab))
  return var_ab; //(n_ab, mean_ab, )



/*
  var ss1 = set1.variance() * (set1.count() - 1);
  var ss2 = set2.variance() * (set2.count() - 1);
  var thatUglyThirdTerm = (set1.count() / (set2.count() * set1.count() + set2.count())) * ((set1.count()/set1.count() + set2.count())* ((set1.count()*()set1.count() + 1)/ 2) - (set1.count()+set2.count())* ((set1.count()+set2.count())-1)/2));

  return ss1 + ss2 + ()
*/
};





//   var ssd1 = set1.variance() * (set1.count() - 1);
//   var ssd2 = set2.variance() * (set2.count() - 1);
//   var n1n2 = set1.count() * set2.count();
//   var delta21 = set2.mean() - set1.mean();
//   var n = set1.count() + set2.count();
//   return (
//    (1 / (n - 1))
//     *
//    (ssd1 + ssd2 + (n1n2 * delta21 / n))
//   );
// };
