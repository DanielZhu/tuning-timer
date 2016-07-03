# tuning-timer
[![NPM version][npm-version-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![License][license-image]][npm-url] 

Everyone know that window.setTimeout & window.setInterval cannot be 100 precent accurate for a specified countdown timer or the clock.

So I try to figure out some simple solutions, boom... tuning-timer was bored on July 3rd , 2016

User must give the required arguments when initializing the tuning-timer **maxDist**.

## Features

- setTimeout / clearTimeout
- setInterval / clearInterval

## How to use

`npm install tuning-timer --save` 

``` js
import TuningTimer from 'tuning-timer';

let tuningTimer = new TuningTimer();
tuningTimer.timetick(() => {
    console.log('hello ticktick: ');
}, 5000);

let tuningTimer2 = new TuningTimer();
tuningTimer2.setTimeout(() => {
    console.log('hello, dandan at ' + Date.now());
}, 2000);

tuningTimer2.clearTimeout();

let tuningTimer3 = new TuningTimer();
tuningTimer3.setInterval(() => {
    console.log('hello, dandan at ' + Date.now());
}, 5000);
tuningTimer3.clearInterval();
```

## Test

For test the module, please run the commands below:
`npm run dev`

Lisence @Apache-2.0 

Copyright to @2012-2016 [Staydan.com](http://staydan.com)

[license-image]: https://img.shields.io/npm/l/tuning-timer.svg?maxAge=2592000&style=flat-square
[downloads-image]: https://img.shields.io/npm/dm/tuning-timer.svg?maxAge=2592000&style=flat-square
[npm-version-image]: http://img.shields.io/npm/v/tuning-timer.svg?maxAge=2592000&style=flat-square
[npm-url]: https://www.npmjs.com/package/tuning-timer
