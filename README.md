# Stats! Online.

<img width="500" alt="screen shot 2016-04-27 at 14 52 43" src="http://motherboard-images.vice.com/content-images/contentimage/21514/1430916171922509.png">

![](https://travis-ci.org/mapbox/stats-online.svg?branch=master)

"Online" algorithms are algorithms can process input piece by piece without needing to know the size of the entire set. This is a collection of online stats algorithms for calculating standard deviation, variance, mean, and a minimum sample size using Student's [T-Distribution to identify minimum sample sizes](http://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm). 

## Installation

Install with `npm` by using:
`npm install stats-online`

## Use

### Mean

```javascript 
var stats = require('stats-online');

// calculating the average online
var foo = new stats.incrementer();
for (var i = 0; i < 10; i++){
  foo.push(i);
  console.log(foo.mean());
}
```
### Variance
```javascript 
var stats = require('stats-online');
// calculating the variance online
var foo = new stats.incrementer();
for (var i = 0; i < 10; i++){
  foo.push(i);
  console.log(foo.variance());
}
```

### Standard Deviation
```javascript 
var stats = require('stats-online');

// calculating the standard deviation online
var foo = new stats.incrementer();
for (var i = 0; i < 10; i++){
  foo.push(i);
  console.log(foo.standardDeviation());
}
```

### Sample Size
```javascript 
var stats = require('stats-online');
// calculating the minimum sample size online
var foo = new stats.incrementer();
for (var i = 0; i < 10; i++){
  foo.push(i);
  foo.push(i);
  foo.push(i);
  console.log(foo.minimumSample());
  console.log(foo.sufficientSampleSize());
}
```
