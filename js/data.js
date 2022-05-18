'use strict';

(function () {
  const ADS_COUNT = 8;

  const offersArray = [];

  const generateOfferObject = (i) => {
    const randomLocationX = window.utils.getRandomFromInterval(window.constants.offerOptions.LOCATION_X);
    const randomLocationY = window.utils.getRandomFromInterval(window.constants.offerOptions.LOCATION_Y);

    const offerObject = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },

      offer: {
        title: window.constants.offerOptions.TITLES[i],
        address: `${randomLocationX}, ${randomLocationY}`,
        price: window.utils.getRandomFromInterval(window.constants.offerOptions.PRICES),
        type: window.utils.getRandomFromArray(window.constants.offerOptions.TYPES),
        rooms: window.utils.getRandomFromInterval(window.constants.offerOptions.ROOMS),
        guests: window.utils.getRandomFromInterval(window.constants.offerOptions.GUESTS),
        checkin: window.utils.getRandomFromArray(window.constants.offerOptions.TIMES),
        checkout: window.utils.getRandomFromArray(window.constants.offerOptions.TIMES),
        features: window.utils.getRandomArray(window.constants.offerOptions.FEATURES),
        desrciption: '',
        photos: window.utils.getShuffledArray(window.constants.offerOptions.PHOTOS),
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
