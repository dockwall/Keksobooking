'use strict';

(function () {
  const MAIN_PIN_TAIL_LENGTH = 16;

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
  };

  const setAddress = () => {
    let MainPinAddressX;
    let MainPinAddressY;

    if (isActive) {
      MainPinAddressX = mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2);
      MainPinAddressY = mainPin.offsetTop + mainPin.offsetHeight + MAIN_PIN_TAIL_LENGTH;
    } else {
      MainPinAddressX = mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2);
      MainPinAddressY = mainPin.offsetTop + Math.floor(mainPin.offsetHeight / 2);
    }

    addressField.value = `${MainPinAddressX}, ${MainPinAddressY}`;
  };

  const renderOfferPins = (pinsArray) => {
    const pinsFragment = document.createDocumentFragment();
    pinsArray.forEach(element => pinsFragment.appendChild(element));

    map.querySelector('.map__pins').appendChild(pinsFragment);
  };

  const removeOfferPins = () => {
    const mapPinsDOM = map.querySelector('.map__pins');
    window.pins.pinsArray.forEach(element => mapPinsDOM.removeChild(element));
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

    map.removeEventListener('click', onOfferPinClick);
    resetButton.removeEventListener('click', onResetClick);
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
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

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.map = {
    isActive: isActive,
    mainPin: mainPin,
    setAddress: setAddress,
    mainPinTailLength: MAIN_PIN_TAIL_LENGTH,
    form: form,
    resetButton: resetButton,
  };
})();
