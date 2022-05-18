'use strict';

(function () {
  window.utils = {
    getRandomFromInterval(interval) {
      return Math.floor((interval.MAX - interval.MIN + 1) * Math.random()) + interval.MIN;
    },

    getRandomFromArray(array) {
      const randomIndex = Math.floor(array.length * Math.random());
      return array[randomIndex];
    },

    getRandomArray(array) {
      const originalArray = array.slice();
      const randomArray = [];
      const randomLength = Math.floor(originalArray.length * Math.random() + 1);

      for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(originalArray.length * Math.random());
        const arrayElement = originalArray[randomIndex];
        originalArray.splice(randomIndex, 1);
        randomArray.push(arrayElement);
      }

      return randomArray;
    },

    getShuffledArray(array) {
      const originalArray = array.slice();
      const shuffledArray = [];

      for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(originalArray.length * Math.random());
        const arrayElement = originalArray[randomIndex];
        originalArray.splice(randomIndex, 1);
        shuffledArray.push(arrayElement);
      }

      return shuffledArray;
    },
  };
})();
