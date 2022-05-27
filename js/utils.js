'use strict';

(function () {
  const getRandomFromInterval = (interval) => {
    return Math.floor((interval.MAX - interval.MIN + 1) * Math.random()) + interval.MIN;
  };

  window.utils = {
    getRandomFromInterval,
  };
})();
