'use strict';

(function () {
  const ADS_COUNT = 8;

  const offersArray = [];

  const getRandomFromInterval = (interval) => {
    return Math.floor((interval.MAX - interval.MIN + 1) * Math.random()) + interval.MIN;
  };

  const getRandomFromArray = (array) => {
    const randomIndex = Math.floor(array.length * Math.random());
    return array[randomIndex];
  };

  const getShuffledArray = (array, isSliced = false) => {
    const originalArray = array.slice();
    const shuffledArray = [];
    let arrayLength = originalArray.length;

    if (isSliced) {
      arrayLength = Math.floor(originalArray.length * Math.random() + 1);
    }

    for (let i = 0; i < arrayLength; i++) {
      const randomIndex = Math.floor(originalArray.length * Math.random());
      const arrayElement = originalArray[randomIndex];
      originalArray.splice(randomIndex, 1);
      shuffledArray.push(arrayElement);
    }

    return shuffledArray;
  };

  const generateOfferObject = (i) => {
    const randomLocationX = getRandomFromInterval(window.constants.offerOptions.LOCATION_X);
    const randomLocationY = getRandomFromInterval(window.constants.offerOptions.LOCATION_Y);

    const offerObject = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },

      offer: {
        title: window.constants.offerOptions.TITLES[i],
        address: `${randomLocationX}, ${randomLocationY}`,
        price: getRandomFromInterval(window.constants.offerOptions.PRICES),
        type: getRandomFromArray(window.constants.offerOptions.TYPES),
        rooms: getRandomFromInterval(window.constants.offerOptions.ROOMS),
        guests: getRandomFromInterval(window.constants.offerOptions.GUESTS),
        checkin: getRandomFromArray(window.constants.offerOptions.TIMES),
        checkout: getRandomFromArray(window.constants.offerOptions.TIMES),
        features: getShuffledArray(window.constants.offerOptions.FEATURES, true),
        desrciption: '',
        photos: getShuffledArray(window.constants.offerOptions.PHOTOS),
        location: {
          x: randomLocationX,
          y: randomLocationY,
        },
      },
    };

    return offerObject;
  };

  const fillOffersArray = () => {
    for (let i = 0; i < ADS_COUNT; i++) {
      const offerObject = generateOfferObject(i);
      offersArray.push(offerObject);
    }
  };

  fillOffersArray();

  window.data = {
    offersArray: offersArray,
  };
})();
