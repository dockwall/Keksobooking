'use strict';

(function () {
  const ADS_COUNT = 8;

  const OFFER_OPTIONS = {
    TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    TYPES: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    TIMES: [
      '12:00',
      '13:00',
      '14:00'
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
    LOCATION_X: {
      MIN: 300,
      MAX: 900,
    },
    LOCATION_Y: {
      MIN: 130,
      MAX: 630,
    },
    PRICES: {
      MIN: 1000,
      MAX: 1000000,
    },
    ROOMS: {
      MIN: 1,
      MAX: 5,
    },
    GUESTS: {
      MIN: 1,
      MAX: 15,
    },
  };

  const offersArray = [];

  const generateOfferObject = (i) => {
    const randomLocationX = window.utils.getRandomFromInterval(OFFER_OPTIONS.LOCATION_X);
    const randomLocationY = window.utils.getRandomFromInterval(OFFER_OPTIONS.LOCATION_Y);

    const offerObject = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },

      offer: {
        title: OFFER_OPTIONS.TITLES[i],
        address: `${randomLocationX}, ${randomLocationY}`,
        price: window.utils.getRandomFromInterval(OFFER_OPTIONS.PRICES),
        type: window.utils.getRandomFromArray(OFFER_OPTIONS.TYPES),
        rooms: window.utils.getRandomFromInterval(OFFER_OPTIONS.ROOMS),
        guests: window.utils.getRandomFromInterval(OFFER_OPTIONS.GUESTS),
        checkin: window.utils.getRandomFromArray(OFFER_OPTIONS.TIMES),
        checkout: window.utils.getRandomFromArray(OFFER_OPTIONS.TIMES),
        features: window.utils.getRandomArray(OFFER_OPTIONS.FEATURES),
        desrciption: '',
        photos: window.utils.getShuffledArray(OFFER_OPTIONS.PHOTOS),
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
