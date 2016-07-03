/* eslint-disable fecs-indent */
/**
 * @file tuning-timer
 *
 * @author  Daniel Zhu <enterzhu@gmail.com>
 * @date    2016-07-02
 */
import process from 'process';

class TuningTimer {
  constructor(maxDist=25) {
    // Convert to nanosecond
    this.maxDist = maxDist * Math.pow(10, 6);
    this.diffSum = 0;
    this.standardDelay = -1;
    this.analytics = {
      runCount: 0,
      tuningCount: 0
    };
    this.expectRunCount = 0;
    this.ticktickTimer = null;
  }
  setTimeout(fn, delay, ...params) {
    this.expectRunCount = 1;
    this.ticktick(fn, delay, ...params);
  }
  clearTimeout() {
    clearTimeout(this.ticktickTimer);
  }
  setInterval(fn, delay, ...params) {
    this.ticktick(fn, delay, ...params);
  }
  clearInterval() {
    clearTimeout(this.ticktickTimer);
  }
  ticktick(fn, delay, ...params) {
    // store the standard delay
    if (this.standardDelay === -1 && delay >= 0) {
      this.standardDelay = delay;
    }

    let startTime = process.hrtime();
    this.ticktickTimer = setTimeout(() => {
      this.analytics.runCount++;

      if (this.expectRunCount === 0
        || (this.analytics.runCount <= this.expectRunCount && this.diffSum < this.maxDist)) {

        let endTime = process.hrtime(startTime);
        let entTimeNanoSecond = endTime[0] * Math.pow(10, 9) + endTime[1];
        let diff = entTimeNanoSecond - delay * Math.pow(10, 6);

        this.diffSum += diff;
        let delayLog = ' | delay: ' + (endTime[0] * Math.pow(10, 9) + endTime[1]) + '/' + delay * Math.pow(10, 6) + ' ' + (this.diffSum - diff) + (diff > 0 ? '+' : '') + diff + ' = ' + this.diffSum;

        if (Math.abs(this.diffSum) >= this.maxDist) {

          // Adjust the diffSum
          let dist = (this.diffSum > 0 ? -this.maxDist : this.maxDist);
          this.diffSum += dist;
          let tuningDelay = delay + dist / Math.pow(10, 6);
          this.analytics.tuningCount++;
          fn && fn(params);
          console.log('tuning ' + this.analytics.tuningCount + '/' + this.analytics.runCount + ' times'
            + delayLog
            + ' | diff: ' + (this.diffSum - dist) + '/' + this.maxDist);
          this.ticktick(fn, tuningDelay);
        }
        else {
          fn && fn(params);
          console.log('tuning ' + this.analytics.tuningCount + '/' + this.analytics.runCount + ' times'
            + delayLog);
          this.ticktick(fn, this.standardDelay);
        }
      }
    }, delay);
  }
}

export default TuningTimer;
