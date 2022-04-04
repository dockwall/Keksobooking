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

const getRandomArray = (array) => {
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
};

const getShuffledArray = (array) => {
  const originalArray = array.slice();
  const shuffledArray = [];

  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(originalArray.length * Math.random());
    const arrayElement = originalArray[randomIndex];
    originalArray.splice(randomIndex, 1);
    shuffledArray.push(arrayElement);
  }

  return shuffledArray;
};

const mapDOM = document.querySelector('.map');
mapDOM.classList.remove('map--faded');

const generateOfferObject = (i) => {
  const randomLocationX = getRandomFromInterval(offerOptions.LOCATION_X);
  const randomLocationY = getRandomFromInterval(offerOptions.LOCATION_Y);

  const offerObject = {
    author: {
      avatar: `img/avatars/user0${i}.png`,
    },

    offer: {
      title: offerOptions.TITLES[i],
      address: `${randomLocationX}, ${randomLocationY}`,
      price: getRandomFromInterval(offerOptions.PRICES),
      type: getRandomFromArray(offerOptions.TYPES),
      rooms: getRandomFromInterval(offerOptions.ROOMS),
      guests: getRandomFromInterval(offerOptions.GUESTS),
      checkin: getRandomFromArray(offerOptions.TIMES),
      checkout: getRandomFromArray(offerOptions.TIMES),
      features: getRandomArray(offerOptions.FEATURES),
      desrciption: '',
      photos: getShuffledArray(offerOptions.PHOTOS),
      location: {
        x: randomLocationX,
        y: randomLocationY,
      },
    },
  };

  return offerObject;
};


const offersArray = [];

for (let i = 0; i < ADS_COUNT; i++) {
  const offerObject = generateOfferObject(i);
  offersArray.push(offerObject);
}
