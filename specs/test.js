import TuningTimer from '../index';

let tuningTimer = new TuningTimer();

// let startTime = Date.now();
// tuningTimer.timetick(() => {
//     let now = Date.now();
//     let diff = now - startTime;
//     startTime = now;
//     // console.log('diff: ' + diff);
// }, 5000);

// let tuningTimer2 = new TuningTimer();
// tuningTimer2.setTimeout(() => {
//     console.log('hello, dandan at ' + Date.now());
// }, 2000);

// tuningTimer2.clearTimeout();

let tuningTimer3 = new TuningTimer(50);
tuningTimer3.setInterval(() => {
    // console.log('hello, dandan at ' + Date.now());
}, 2000);
// tuningTimer3.clearInterval();
