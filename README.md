# linear-arbitrary-precision

[![Build Status](https://travis-ci.org/javiercejudo/linear-arbitrary-precision.svg)](https://travis-ci.org/javiercejudo/linear-arbitrary-precision)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/linear-arbitrary-precision/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/linear-arbitrary-precision?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/linear-arbitrary-precision/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/linear-arbitrary-precision)

Arbitrary precision for linear operations

## Install

    npm i linear-arbitrary-precision

## Usage

### Factory and configuration

```js
var decimalFactory = require('linear-arbitrary-precision');
var Decimal = decimalFactory();

decimalFactory.getPrecision(); // => number (eg. 20)

new Decimal(1).div(3).toString(); // => '0.33333333333333333333'

decimalFactory.setPrecision(5); // => number (eg. 20)

new Decimal(1).div(3).toString(); // => '0.33333'
```

### Operations

```js
new Decimal(0.1).plus(0.2).toString(); // => '0.3'

new Decimal(0.3).minus(0.1).toString(); // => '0.2'

new Decimal(0.6).times(3).toString(); // => '1.8'

new Decimal(0.3).div(0.2).toString(); // => '1.5'
```

### toString, valueOf and toJSON

```js
var decimalThird = new Decimal(1).div(3);

decimalThird.toString() === decimalThird.valueOf() === decimalThird.toJSON(); // => true

Number(decimalThird); // => 1/3
```

### JSON.stringify and JSON.parse with reviver

```js
var Decimal40 = decimalFactory();

Decimal40.setPrecision(40);

var decimalThird = new Decimal40(1).div(3);
var stringified = JSON.stringify([decimalThird]); // => '["0.3333333333333333333333333333333333333333"]'

JSON.parse(stringified, Decimal40.JSONReviver)[0]; // => new Decimal40(1).div(3)
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [linear-conversion](https://github.com/javiercejudo/linear-conversion): Linear conversion class for *linear-converter*.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [rescale-util](https://github.com/javiercejudo/rescale-util): Rescale utilities.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
