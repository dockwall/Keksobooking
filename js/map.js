'use strict';

(function () {
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

  const DEFAULT_MAIN_PIN_POSITION = {
    X: 570,
    Y: 375,
  };

  const map = document.querySelector('.map');
  const mainPin = map.querySelector('.map__pin--main');
  const form = document.querySelector('.ad-form');
  const resetButton = form.querySelector('.ad-form__reset');
  const addressField = form.querySelector('#address');

  let isActive = false;

  const activateMap = () => {
    isActive = true;

    map.classList.remove('map--faded');

    renderOfferPins(window.pins.pinsArray);

    map.addEventListener('click', onOfferPinClick);
  };

  const deactivateMap = () => {
    isActive = false;

    map.classList.add('map--faded');

    removeOfferPins();
    removeOfferCard();

    map.removeEventListener('click', onOfferPinClick);

    mainPin.addEventListener('mouseup', onMainPinMouseUp);
  };

  const setAddress = () => {
    let MainPinLocationX;
    let MainPinLocationY;

    if (isActive) {
      MainPinLocationY = mainPin.offsetTop + mainPin.offsetHeight;
      MainPinLocationX = mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2);
    } else {
      MainPinLocationY = mainPin.offsetTop + Math.floor(mainPin.offsetHeight / 2);
      MainPinLocationX = mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2);
    }

    addressField.value = `${MainPinLocationX}, ${MainPinLocationY}`;
  };

  const setMainPinDefaultPosition = () => {
    mainPin.style.left = DEFAULT_MAIN_PIN_POSITION.X + 'px';
    mainPin.style.top = DEFAULT_MAIN_PIN_POSITION.Y + 'px';
  };

  const renderOfferPins = (pinsArray) => {
    const pinsFragment = document.createDocumentFragment();
    pinsArray.forEach(element => pinsFragment.appendChild(element));

    map.querySelector('.map__pins').appendChild(pinsFragment);
  };

  const removeOfferPins = () => {
    window.pins.pinsArray.forEach(element => map.querySelector('.map__pins').removeChild(element));
  };

  const removeOfferCard = () => {
    const offerCardPopup = map.querySelector('.popup');

    if (offerCardPopup) {
      offerCardPopup.remove();
    }
  };

  const getOfferIndex = (evt) => {
    let indexOfferObject;
    const parentNode = evt.target.parentNode;

    if (evt.target.nodeName === 'IMG' && parentNode.classList.value === 'map__pin') {
      indexOfferObject = window.pins.pinsArray.indexOf(parentNode);
    } else if (evt.target.nodeName === 'BUTTON' && evt.target.classList.value === 'map__pin') {
      indexOfferObject = window.pins.pinsArray.indexOf(evt.target);
    }

    return indexOfferObject;
  };

  const renderOfferCard = (offerCardDOM) => {
    map.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', offerCardDOM);
  };

  const onMainPinMouseUp = () => {
    activateMap();

    mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    resetButton.addEventListener('click', onResetClick);
  };

  const onResetClick = () => {
    deactivateMap();
    setMainPinDefaultPosition();
  };

  const onOfferPinClick = (evt) => {
    const indexOfferObject = getOfferIndex(evt);

    if (indexOfferObject !== undefined) {
      removeOfferCard();

      const offerObject = window.data.offersArray[indexOfferObject];
      const offerCardElement = window.card.createCard(offerObject);
      const closePopupButton = offerCardElement.querySelector('.popup__close');

      closePopupButton.addEventListener('click', onCloseOfferCardButtonClick);

      renderOfferCard(offerCardElement);
    }
  };

  const onCloseOfferCardButtonClick = () => {
    removeOfferCard();
  };

  mainPin.addEventListener('mousedown', function (mouseDownEvt) {
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
        x: mainPin.offsetLeft - shiftCoordinates.x,
        y: mainPin.offsetTop - shiftCoordinates.y,
      };

      if (newCoordinates.x >= DRAG_LIMIT.X.MIN && (newCoordinates.x + mainPin.offsetWidth) <= DRAG_LIMIT.X.MAX) {
        mainPin.style.left = (newCoordinates.x) + 'px';
      }

      if ((newCoordinates.y + mainPin.offsetHeight) >= DRAG_LIMIT.Y.MIN && (newCoordinates.y + mainPin.offsetHeight) <= DRAG_LIMIT.Y.MAX) {
        mainPin.style.top = (newCoordinates.y) + 'px';
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

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.map = {
    isActive: isActive,
    mainPin: mainPin,
    setAddress: setAddress,
  };
})();
