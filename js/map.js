'use strict';

const ADS_COUNT = 8;

const MAP_PIN_CSS = {
  WIDTH: 50,
  HEIGHT: 70,
};

const MAIN_MAP_PIN_SIZE = {
  WIDTH: 65,
  HEIGHT_INACTIVE: 65,
  HEIGHT_ACTIVE: 81,
};

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

const TYPES_DICT = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

const mapDOM = document.querySelector('.map');
const mainMapPinDOM = mapDOM.querySelector('.map__pin--main');
const formDOM = document.querySelector('.ad-form');
const formFieldsetsDOM = formDOM.querySelectorAll('fieldset');
const addressFieldsetDOM = formDOM.querySelector('#address');
const fullTemplateDOM = document.querySelector('template').content;
const templateMapPin = fullTemplateDOM.querySelector('.map__pin');
const templateOfferCard = fullTemplateDOM.querySelector('.map__card');
const templateOfferCardPhoto = templateOfferCard.querySelector('.popup__photos').querySelector('img');
const offersArray = [];
const mapPinsDOMArray = [];

const getRandomFromInterval = (interval) => {
  return Math.floor((interval.MAX - interval.MIN + 1) * Math.random()) + interval.MIN;
};

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

const setActiveState = () => {
  mapDOM.classList.remove('map--faded');
  formDOM.classList.remove('ad-form--disabled');

  formFieldsetsDOM.forEach(element => {
    element.removeAttribute('disabled');
  });

  fillOffersArray();
  fillMapPinsDOMArray();
  renderMapPins(mapPinsDOMArray);
};

const setInactiveAddress = () => {
  const inactiveMainPinCenterY = mainMapPinDOM.offsetTop + (MAIN_MAP_PIN_SIZE.HEIGHT_INACTIVE / 2);
  const inactiveMainPinCenterX = mainMapPinDOM.offsetLeft + (MAIN_MAP_PIN_SIZE.WIDTH / 2);
  addressFieldsetDOM.value = `${inactiveMainPinCenterY}, ${inactiveMainPinCenterX}`;
};

const setActiveAddress = () => {
  const activeMainPinPointY = mainMapPinDOM.offsetTop + (MAIN_MAP_PIN_SIZE.HEIGHT_ACTIVE);
  const activeMainPinPointX = mainMapPinDOM.offsetLeft + (MAIN_MAP_PIN_SIZE.WIDTH / 2);
  addressFieldsetDOM.value = `${activeMainPinPointY}, ${activeMainPinPointX}`;
};

const onMainMapPinMouseup = () => {
  setActiveState();
  setActiveAddress();
  mapDOM.addEventListener('click', onMapPinClick);
  mainMapPinDOM.removeEventListener('mouseup', onMainMapPinMouseup);
};

const generateOfferObject = (i) => {
  const randomLocationX = getRandomFromInterval(OFFER_OPTIONS.LOCATION_X);
  const randomLocationY = getRandomFromInterval(OFFER_OPTIONS.LOCATION_Y);

  const offerObject = {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },

    offer: {
      title: OFFER_OPTIONS.TITLES[i],
      address: `${randomLocationX}, ${randomLocationY}`,
      price: getRandomFromInterval(OFFER_OPTIONS.PRICES),
      type: getRandomFromArray(OFFER_OPTIONS.TYPES),
      rooms: getRandomFromInterval(OFFER_OPTIONS.ROOMS),
      guests: getRandomFromInterval(OFFER_OPTIONS.GUESTS),
      checkin: getRandomFromArray(OFFER_OPTIONS.TIMES),
      checkout: getRandomFromArray(OFFER_OPTIONS.TIMES),
      features: getRandomArray(OFFER_OPTIONS.FEATURES),
      desrciption: '',
      photos: getShuffledArray(OFFER_OPTIONS.PHOTOS),
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

const generateMapPinDOM = (offerObject) => {
  const pinElement = templateMapPin.cloneNode('true');
  const pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = `${offerObject.offer.location.x - (MAP_PIN_CSS.WIDTH / 2)}px`;
  pinElement.style.top = `${offerObject.offer.location.y - MAP_PIN_CSS.HEIGHT}px`;
  pinElementImg.src = offerObject.author.avatar;
  pinElementImg.alt = offerObject.offer.title;

  return pinElement;
};

const fillMapPinsDOMArray = () => {
  offersArray.forEach(element => {
    const mapPinDOMElement = generateMapPinDOM(element);
    mapPinsDOMArray.push(mapPinDOMElement);
  });
};

const createOfferCardDOM = (offerObject) => {
  const offerCardElement = templateOfferCard.cloneNode('true');
  const offerCardElementFeatures = offerCardElement.querySelector('.popup__features');
  const offerCardElementPhotos = offerCardElement.querySelector('.popup__photos');
  const offerCardPhotosFragment = document.createDocumentFragment();

  offerCardElement.querySelector('.popup__title').textContent = offerObject.offer.title;
  offerCardElement.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  offerCardElement.querySelector('.popup__text--price').textContent = `${offerObject.offer.price}\u20BD/ночь`;
  offerCardElement.querySelector('.popup__type').textContent = TYPES_DICT[offerObject.offer.type];
  offerCardElement.querySelector('.popup__text--capacity').textContent = `${offerObject.offer.rooms} комнаты для ${offerObject.offer.guests} гостей`;
  offerCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${offerObject.offer.checkout}`;
  offerCardElement.querySelector('.popup__description').textContent = offerObject.offer.desrciption;
  offerCardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;

  OFFER_OPTIONS.FEATURES.forEach(element => {
    const classToDelete = (offerObject.offer.features.includes(element)) ? '' : `.popup__feature--${element}`;

    if (classToDelete) {
      const featureToDelete = offerCardElementFeatures.querySelector(classToDelete);
      offerCardElementFeatures.removeChild(featureToDelete);
    }
  });

  offerObject.offer.photos.forEach(element => {
    const photoElement = templateOfferCardPhoto.cloneNode('true');
    photoElement.src = element;
    offerCardPhotosFragment.appendChild(photoElement);
  });

  offerCardElementPhotos.removeChild(offerCardElementPhotos.querySelector('.popup__photo'));
  offerCardElementPhotos.appendChild(offerCardPhotosFragment);


  return offerCardElement;
};

const renderMapPins = (pinsArray) => {
  const pinsFragment = document.createDocumentFragment();
  pinsArray.forEach(element => pinsFragment.appendChild(element));

  mapDOM.querySelector('.map__pins').appendChild(pinsFragment);
};

const getOfferIndex = (evt) => {
  let indexOfferObject;
  const parentNode = evt.target.parentNode;

  if (evt.target.nodeName === 'IMG' && parentNode.classList.value === 'map__pin') {
    indexOfferObject = mapPinsDOMArray.indexOf(parentNode);
  } else if (evt.target.nodeName === 'BUTTON' && evt.target.classList.value === 'map__pin') {
    indexOfferObject = mapPinsDOMArray.indexOf(evt.target);
  }

  return indexOfferObject;
};

const renderOfferCard = (offerCardDOM) => {
  mapDOM.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', offerCardDOM);
};

const onCloseOfferCardButtonClick = (evt) => {
  evt.target.parentNode.remove();
};

const onMapPinClick = (evt) => {
  const indexOfferObject = getOfferIndex(evt);

  if (indexOfferObject !== undefined) {
    const lastCardPopup = mapDOM.querySelector('.popup');

    if (lastCardPopup) {
      lastCardPopup.remove();
    }

    const offerObject = offersArray[indexOfferObject];
    const offerCardElement = createOfferCardDOM(offerObject);
    const closePopupButton = offerCardElement.querySelector('.popup__close');

    closePopupButton.addEventListener('click', onCloseOfferCardButtonClick);

    renderOfferCard(offerCardElement);
  }
};

setInactiveAddress();
mainMapPinDOM.addEventListener('mouseup', onMainMapPinMouseup);
