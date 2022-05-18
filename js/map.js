'use strict';

const MAP_PIN_CSS = {
  WIDTH: 50,
  HEIGHT: 70,
};

const DRAG_LIMIT = {
  X: {
    MIN: 0,
    MAX: 1200,
  },
  Y: {
    MIN: 130,
    MAX: 630,
  },
};

const DEFAULT_MAP_PIN_POSITION = {
  X: 570,
  Y: 375,
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

const TYPES_DICT = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

const mapDOM = document.querySelector('.map');
const mainMapPinDOM = mapDOM.querySelector('.map__pin--main');
const formDOM = document.querySelector('.ad-form');
const resetDOM = formDOM.querySelector('.ad-form__reset');
const formFieldsetsDOM = formDOM.querySelectorAll('fieldset');
const titleFieldDOM = formDOM.querySelector('#title');
const addressFieldDOM = formDOM.querySelector('#address');
const typeFieldDOM = formDOM.querySelector('#type');
const priceFieldDOM = formDOM.querySelector('#price');
const timeInFieldDOM = formDOM.querySelector('#timein');
const timeOutFieldDOM = formDOM.querySelector('#timeout');
const roomsCountFieldDOM = formDOM.querySelector('#room_number');
const capacityFieldDOM = formDOM.querySelector('#capacity');
const descriptionFieldDOM = formDOM.querySelector('#description');
const featureCheckboxesDOM = formDOM.querySelectorAll('input[name=features]');
const avatarUploadFieldDOM = formDOM.querySelector('#avatar');
const imagesUploadFieldDOM = formDOM.querySelector('#images');
const fullTemplateDOM = document.querySelector('template').content;
const templateMapPin = fullTemplateDOM.querySelector('.map__pin');
const templateOfferCard = fullTemplateDOM.querySelector('.map__card');
const templateOfferCardPhoto = templateOfferCard.querySelector('.popup__photos').querySelector('img');

const mapPinsDOMArray = [];

let isActive = false;

const setActiveState = () => {
  isActive = true;

  mapDOM.classList.remove('map--faded');
  formDOM.classList.remove('ad-form--disabled');

  formFieldsetsDOM.forEach(element => {
    element.removeAttribute('disabled');
  });

  fillMapPinsDOMArray();

  renderMapPins(mapPinsDOMArray);

  mapDOM.addEventListener('click', onMapPinClick);

  titleFieldDOM.addEventListener('change', onTitleFieldChange);

  typeFieldDOM.addEventListener('change', onTypeFieldChange);
  setMinimalPrice(typeFieldDOM.value);

  timeInFieldDOM.addEventListener('change', onTimeInFieldChange);
  timeOutFieldDOM.addEventListener('change', onTimeOutFieldChange);

  roomsCountFieldDOM.addEventListener('change', onRoomsCountFieldChange);
  capacityFieldDOM.addEventListener('change', onCapacityFieldChange);

  priceFieldDOM.addEventListener('change', onPriceFieldChange);

  const invalidCapacityValues = getInvalidCapacities(roomsCountFieldDOM.value);
  setCapacityFieldCustomValidity(invalidCapacityValues);
  disableInvalidCapacities(invalidCapacityValues);
  checkFieldValidity(titleFieldDOM);
  checkFieldValidity(priceFieldDOM);
  checkFieldValidity(capacityFieldDOM);
};

const setInactiveState = () => {
  isActive = false;

  mapDOM.classList.add('map--faded');
  formDOM.classList.add('ad-form--disabled');

  removeMapPins();
  removeOfferCard();

  formFieldsetsDOM.forEach(element => {
    element.setAttribute('disabled', '');
  });

  mapDOM.removeEventListener('click', onMapPinClick);
  titleFieldDOM.removeEventListener('change', onTitleFieldChange);

  typeFieldDOM.removeEventListener('change', onTypeFieldChange);
  setMinimalPrice(typeFieldDOM.value);

  timeInFieldDOM.removeEventListener('change', onTimeInFieldChange);
  timeOutFieldDOM.removeEventListener('change', onTimeOutFieldChange);

  roomsCountFieldDOM.removeEventListener('change', onRoomsCountFieldChange);
  capacityFieldDOM.removeEventListener('change', onCapacityFieldChange);

  priceFieldDOM.removeEventListener('change', onPriceFieldChange);

  clearField(titleFieldDOM);
  clearField(typeFieldDOM);
  clearField(priceFieldDOM);
  clearField(roomsCountFieldDOM);
  clearField(capacityFieldDOM);
  clearField(timeInFieldDOM);
  clearField(timeOutFieldDOM);
  clearField(descriptionFieldDOM);
  clearField(avatarUploadFieldDOM);
  clearField(imagesUploadFieldDOM);

  setMinimalPrice(typeFieldDOM.value);
  setUnchecked(featureCheckboxesDOM);
};

const setAddress = () => {
  if (isActive) {
    const activeMainPinPointY = mainMapPinDOM.offsetTop + mainMapPinDOM.offsetHeight;
    const activeMainPinPointX = mainMapPinDOM.offsetLeft + Math.floor(mainMapPinDOM.offsetWidth / 2);
    addressFieldDOM.value = `${activeMainPinPointX}, ${activeMainPinPointY}`;
  } else {
    const inactiveMainPinCenterY = mainMapPinDOM.offsetTop + Math.floor(mainMapPinDOM.offsetHeight / 2);
    const inactiveMainPinCenterX = mainMapPinDOM.offsetLeft + Math.floor(mainMapPinDOM.offsetWidth / 2);
    addressFieldDOM.value = `${inactiveMainPinCenterX}, ${inactiveMainPinCenterY}`;
  }
};

const setMainPinDefaultPosition = () => {
  mainMapPinDOM.style.left = DEFAULT_MAP_PIN_POSITION.X + 'px';
  mainMapPinDOM.style.top = DEFAULT_MAP_PIN_POSITION.Y + 'px';
};

const setUnchecked = (checkboxes) => {
  checkboxes.forEach(element => {
    element.checked = false;
  });
};

const clearField = (fieldName) => {
  if (fieldName.style) {
    fieldName.removeAttribute('style');
  }

  if (fieldName.nodeName === 'SELECT') {
    fieldName.value = fieldName.querySelector('[selected]').value;
  } else if (fieldName.nodeName === 'INPUT' || fieldName.nodeName === 'TEXTAREA' || fieldName.type === 'file') {
    fieldName.value = '';
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
  window.data.offersArray.forEach(element => {
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

const removeMapPins = () => {
  mapPinsDOMArray.forEach(element => mapDOM.querySelector('.map__pins').removeChild(element));
};

const removeOfferCard = () => {
  const offerCardPopup = mapDOM.querySelector('.popup');

  if (offerCardPopup) {
    offerCardPopup.remove();
  }
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

const setMinimalPrice = (typeValue) => {
  let minPrice;

  switch (typeValue) {
    case 'bungalo':
      minPrice = 0;
      break;

    case 'flat':
      minPrice = 1000;
      break;

    case 'house':
      minPrice = 5000;
      break;

    case 'palace':
      minPrice = 10000;
      break;
  }

  priceFieldDOM.min = minPrice;
  priceFieldDOM.placeholder = minPrice;
};

const disableInvalidCapacities = (invalidValues) => {
  for (let i = 0; i < capacityFieldDOM.children.length; i++) {
    if (invalidValues.includes(capacityFieldDOM.children[i].value)) {
      capacityFieldDOM.children[i].setAttribute('disabled', '');
      capacityFieldDOM.children[i].style.backgroundColor = 'silver';
    } else {
      capacityFieldDOM.children[i].removeAttribute('disabled');
      capacityFieldDOM.children[i].removeAttribute('style');
    }
  }

};

const getInvalidCapacities = (roomsCount) => {
  let invalidCapacities;

  switch (roomsCount) {
    case '1':
      invalidCapacities = ['3', '2', '0'];
      break;

    case '2':
      invalidCapacities = ['3', '0'];
      break;

    case '3':
      invalidCapacities = ['0'];
      break;

    case '100':
      invalidCapacities = ['3', '2', '1'];
      break;
  }

  return invalidCapacities;
};

const setCapacityFieldCustomValidity = (invalidValues) => {
  if (invalidValues.includes(capacityFieldDOM.value)) {
    capacityFieldDOM.setCustomValidity('Выберите доступное количество гостей');
  } else {
    capacityFieldDOM.setCustomValidity('');
  }
};

const checkFieldValidity = (fieldName) => {
  if (!fieldName.checkValidity()) {
    fieldName.style.borderColor = 'red';
  } else {
    fieldName.removeAttribute('style');
  }
};

const onTitleFieldChange = (evt) => {
  checkFieldValidity(evt.target);
};

const onMainMapPinMouseup = () => {
  setActiveState();
  setAddress();

  mainMapPinDOM.removeEventListener('mouseup', onMainMapPinMouseup);
  resetDOM.addEventListener('click', onResetClick);
};

const onResetClick = () => {
  setInactiveState();
  setMainPinDefaultPosition();
  setAddress();

  mainMapPinDOM.addEventListener('mouseup', onMainMapPinMouseup);
  resetDOM.removeEventListener('click', onResetClick);
};

const onRoomsCountFieldChange = (evt) => {
  const invalidCapacityValues = getInvalidCapacities(evt.target.value);

  setCapacityFieldCustomValidity(invalidCapacityValues);
  disableInvalidCapacities(invalidCapacityValues);
  checkFieldValidity(capacityFieldDOM);
};

const onCapacityFieldChange = (evt) => {
  const invalidCapacities = getInvalidCapacities(roomsCountFieldDOM.value);

  setCapacityFieldCustomValidity(invalidCapacities);
  checkFieldValidity(evt.target);
};

const onTypeFieldChange = (evt) => {
  setMinimalPrice(evt.target.value);
  checkFieldValidity(priceFieldDOM);
};

const onPriceFieldChange = (evt) => {
  checkFieldValidity(evt.target);
};

const onTimeInFieldChange = () => {
  timeOutFieldDOM.value = timeInFieldDOM.value;
};

const onTimeOutFieldChange = () => {
  timeInFieldDOM.value = timeOutFieldDOM.value;
};

const onMapPinClick = (evt) => {
  const indexOfferObject = getOfferIndex(evt);

  if (indexOfferObject !== undefined) {
    removeOfferCard();

    const offerObject = window.data.offersArray[indexOfferObject];
    const offerCardElement = createOfferCardDOM(offerObject);
    const closePopupButton = offerCardElement.querySelector('.popup__close');

    closePopupButton.addEventListener('click', onCloseOfferCardButtonClick);

    renderOfferCard(offerCardElement);
  }
};

const onCloseOfferCardButtonClick = () => {
  removeOfferCard();
};

setAddress();

mainMapPinDOM.addEventListener('mousedown', function (mouseDownEvt) {
  let startCoordinates = {
    x: mouseDownEvt.clientX,
    y: mouseDownEvt.clientY,
  };

  const onMainMapPinMouseMove = (mouseMoveEvt) => {
    const shiftCoordinates = {
      x: startCoordinates.x - mouseMoveEvt.clientX,
      y: startCoordinates.y - mouseMoveEvt.clientY,
    };

    startCoordinates = {
      x: mouseMoveEvt.clientX,
      y: mouseMoveEvt.clientY,
    };

    const newCoordinates = {
      x: mainMapPinDOM.offsetLeft - shiftCoordinates.x,
      y: mainMapPinDOM.offsetTop - shiftCoordinates.y,
    };

    if (newCoordinates.x >= DRAG_LIMIT.X.MIN && (newCoordinates.x + mainMapPinDOM.offsetWidth) <= DRAG_LIMIT.X.MAX) {
      mainMapPinDOM.style.left = (newCoordinates.x) + 'px';
    }

    if ((newCoordinates.y + mainMapPinDOM.offsetHeight) >= DRAG_LIMIT.Y.MIN && (newCoordinates.y + mainMapPinDOM.offsetHeight) <= DRAG_LIMIT.Y.MAX) {
      mainMapPinDOM.style.top = (newCoordinates.y) + 'px';
    }

    setAddress();
  };

  const onDraggedMainMapPinMouseUp = function () {
    setAddress();

    document.removeEventListener('mousemove', onMainMapPinMouseMove);
    document.removeEventListener('mouseup', onDraggedMainMapPinMouseUp);
  };

  document.addEventListener('mousemove', onMainMapPinMouseMove);
  document.addEventListener('mouseup', onDraggedMainMapPinMouseUp);
});

mainMapPinDOM.addEventListener('mouseup', onMainMapPinMouseup);
