# linear-arbitrary-precision

[![Build Status](https://travis-ci.org/javiercejudo/linear-arbitrary-precision.svg)](https://travis-ci.org/javiercejudo/linear-arbitrary-precision)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/linear-arbitrary-precision/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/linear-arbitrary-precision?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/linear-arbitrary-precision/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/linear-arbitrary-precision)

Abstraction for linear functionality in
[big.js](https://github.com/MikeMcl/big.js),
[bignumber.js](https://github.com/MikeMcl/bignumber.js),
[decimal.js](https://github.com/MikeMcl/decimal.js)
and others via adapters.

## Install

    npm i linear-arbitrary-precision

## Usage

See [CodePen example](http://codepen.io/javiercejudo/pen/oXqGgZ?editors=101)

### Adapters

- [[adapter]](https://github.com/javiercejudo/linear-bigjs-adapter) [[lib]](https://github.com/javiercejudo/linear-big.js) linear-big.js
- [[adapter]](https://github.com/javiercejudo/bigjs-adapter) [[lib]](https://github.com/MikeMcl/big.js) big.js
- [[adapter]](https://github.com/javiercejudo/bignumberjs-adapter) [[lib]](https://github.com/MikeMcl/bignumber.js) bignumber.js
- [[adapter]](https://github.com/javiercejudo/decimaljs-adapter) [[lib]](https://github.com/MikeMcl/decimal.js) decimal.js
- [[adapter]](https://github.com/javiercejudo/bigdecimal-adapter) [[lib]](https://github.com/iriscouch/bigdecimal.js) bigdecimal.js
- [[adapter]](https://github.com/javiercejudo/floating-adapter) [[lib]](https://github.com/javiercejudo/floating) floating
- [[adapter]](https://github.com/javiercejudo/linear-converter-adapter) [[lib]](https://github.com/javiercejudo/linear-converter) linear-converter
- [[adapter]](https://github.com/javiercejudo/very-simple-statistics-adapter) [[lib]](https://github.com/sumanla13a/statistics-module) statistics-module

See [up to date list](https://www.npmjs.com/browse/keyword/linear-arbitrary-precision-adapter).

### Factory and configuration

```js
var decimalFactory = require('linear-arbitrary-precision');
var adapter = require('bigjs-adapter'); // See adapters section for full list

var Decimal = decimalFactory(adapter);

Decimal.getPrecision(); // => 20

new Decimal('1').div(new Decimal('3')).valueOf(); // => '0.33333333333333333333'

Decimal.setPrecision(5);

new Decimal('1').div(new Decimal('3')).valueOf(); // => '0.33333'
```

### Operations

```js
new Decimal('0.1').plus(new Decimal('0.2')).valueOf(); // => '0.3'

new Decimal('0.3').minus(new Decimal('0.1')).valueOf(); // => '0.2'

new Decimal('0.6').times(new Decimal('3')).valueOf(); // => '1.8'

new Decimal('0.3').div(new Decimal('0.2')).valueOf(); // => '1.5'
```

### toString, valueOf and toJSON

```js
var decimalThird = new Decimal('1').div(new Decimal('3'));

// with bigjs-adapter (other adapters might have differing implementations)
decimalThird.toString() === decimalThird.valueOf() === decimalThird.toJSON(); // => true

Number(decimalThird); // => 1/3
```

### JSON.stringify and JSON.parse with reviver

```js
var Decimal40 = decimalFactory(adapter);

Decimal40.setPrecision(40);

var decimalThird = new Decimal40('1').div(new Decimal('3'));

var stringified = JSON.stringify([decimalThird]);
// => '["0.3333333333333333333333333333333333333333"]'

JSON.parse(stringified, Decimal40.JSONReviver)[0];
// => new Decimal40('0.3333333333333333333333333333333333333333')
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [linear-conversion](https://github.com/javiercejudo/linear-conversion): Linear conversion class for *linear-converter*.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [rescale-util](https://github.com/javiercejudo/rescale-util): Rescale utilities.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
