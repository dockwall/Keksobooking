'use strict';

const ADS_COUNT = 8;

const offerOptions = {
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
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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

const getRandomFromInterval = (interval) => Math.floor((interval.MAX - interval.MIN + 1) * Math.random()) + interval.MIN;

const getRandomFromArray = (array) => {
  const randomIndex = Math.floor(array.length * Math.random());
  return array[randomIndex];
};

const getRandomAddress = () => `${getRandomFromInterval(offerOptions.LOCATION_X)}, ${getRandomFromInterval(offerOptions.LOCATION_Y)}`;
