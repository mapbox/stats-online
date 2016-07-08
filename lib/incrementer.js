var tvalue = require('./tvalue');


/**
 *  Use:
 *  var i = new Incrementer();
 *  i.push(3.14159)
 *  i.push(1.618)
 *  i.push(2.718)
 *  i.standardDeviation();
 *  // => 0.7864217460752213
 *  i.variance();
 *  // => 0.6184591626999999
 *  i.minimumSample(0.99, 2);
 *  // => 8
 */
function Incrementer() {
  this.length = 0;
}


/**
 * Clear the incremental average
 */
Incrementer.prototype.clear = function () {
  this.length = 0;
};

/**
 *  Add value to running average calculation
 *
 *  @param {number} value - the value to add
 */
Incrementer.prototype.push = function (x) {
  if (x === undefined) throw new Error('Incrementer.push(x) cannot take an undefined value for <x>');
  this.length++;

  // See Knuth TAOCP vol 2, 3rd edition, page 232
  if (this.length === 1) {
    this.oldMean = this.mean = x;
    this.oldSS = 0.0;
  } else {
    this.mean = this.oldMean + (x - this.oldMean) / this.length;
    this.SS = this.oldSS + (x - this.oldMean) * (x - this.mean);

    // set up for next iteration
    this.oldMean = this.mean;
    this.oldSS = this.SS;
    this.getVariance();
  }
};

/**
 *  Return the number of incremental steps made so far
 */
Incrementer.prototype.numDataValues = function () {
  return this.length;
};

/**
 *  Wrapper for numDataValues
 */
Incrementer.prototype.count = function () {
  return this.numDataValues();
};

/**
 *  Return the current mean
 */
Incrementer.prototype.getMean = function () {
  this.mean = (this.length > 0) ? this.mean : 0.0;
  return this.mean;
};

/**
 *  Return the current variance
 */
Incrementer.prototype.getVariance = function () {
  this.variance = ((this.length > 1) ? this.SS / (this.length) : 0.0);
  return this.variance;
};

/**
 *  Return the current standard deviation
 */
Incrementer.prototype.standardDeviation = function () {
  return Math.sqrt(this.getVariance());
};

/**
 *  Return the current degrees of freedom
 */
Incrementer.prototype.degreesFreedom = function () {
  return this.length - 1;
};

/**
 *  Calculates and returns the t-critical value for the degrees
 *  of freedom and desired confidence interval.
 *
 *  @param {number} confidence - the desired level of confidence
 */
Incrementer.prototype.tval = function (confidence) {
  return tvalue(this.degreesFreedom(), confidence);
};

/**
 *  Calculates and returns the minimum sample size required to
 *  achieve an mean estimate given <confidence> and <marginOfError>
 *
 *  @param {number} confidence - the desired level (percentage) of confidence for the estimate
 *  @param {number} marginOfError - the error tolerance of the mean estimate
 */
Incrementer.prototype.minimumSample = function (confidence, marginOfError) {
  var minimumSampleSize = ((this.tval(confidence) * this.tval(confidence) * this.standardDeviation() * this.standardDeviation()) / (marginOfError * marginOfError));
  return Math.ceil(minimumSampleSize);
};

/**
 *  Returns true if the sample size is sufficient to
 *  achieve an mean estimate given <confidence> and <marginOfError>
 *
 *  @param {number} confidence - the desired level (percentage) of confidence for the estimate
 *  @param {number} marginOfError - the error tolerance of the mean estimate
 */
Incrementer.prototype.sufficientSampleSize = function (confidence, marginOfError) {
  if (this.degreesFreedom() < 1) return false;
  var minimumSampleSize = ((this.tval(confidence) * this.tval(confidence) * this.standardDeviation() * this.standardDeviation()) / (marginOfError * marginOfError));
  return this.numDataValues() >= Math.ceil(minimumSampleSize);
};
module.exports = Incrementer;


/**
 *  Return the mean of a list, is actually calculated online
 *  but takes an object in memory.
 */
Incrementer.prototype.offlineAverage = function (obj) {
  var avg = new Incrementer();
  for (var i = 0; i < obj.length; i++) {
    avg.push(obj[i]);
  }
  return avg.getMean();
};


/**
 *  Return an object from a list, is actually calculated online
 *  but takes an object in memory.
 */
Incrementer.prototype.offlineObject = function (list) {
  var obj = new Incrementer();
  for (var i = 0; i < list.length; i++) {
    obj.push(list[i]);
  }
  return obj;
};
