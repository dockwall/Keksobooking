'use strict';

(function () {
  const MAIN_PIN_TAIL_LENGTH = 16;

  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mainPin = map.querySelector('.map__pin--main');
  const form = document.querySelector('.ad-form');
  const resetButton = form.querySelector('.ad-form__reset');
  const addressField = form.querySelector('#address');
  const templatePin = window.constants.template.querySelector('.map__pin');

  const MAP_PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  let isActive = false;

  const activateMap = () => {
    isActive = true;

    map.classList.remove('map--faded');

    window.backend.loadData(onSuccess, onError);
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

  const generatePinElement = (offerObject) => {
    const pinElement = templatePin.cloneNode('true');
    const pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = `${offerObject.location.x - (MAP_PIN_SIZE.WIDTH / 2)}px`;
    pinElement.style.top = `${offerObject.location.y - MAP_PIN_SIZE.HEIGHT}px`;
    pinElementImg.src = offerObject.author.avatar;
    pinElementImg.alt = offerObject.offer.title;

    pinElement.addEventListener('click', function () {
      removeOfferCard();
      const currentOfferCard = window.card.createCard(offerObject);
      currentOfferCard.querySelector('.popup__close').addEventListener('click', removeOfferCard);
      renderOfferCard(currentOfferCard);
    });

    return pinElement;
  };

  const renderOfferPins = (pinsArray) => {
    const pinsFragment = document.createDocumentFragment();

    pinsArray.forEach(element => {
      console.log(element);
      pinsFragment.appendChild(generatePinElement(element));
    });

    map.querySelector('.map__pins').appendChild(pinsFragment);
  };

  const removeOfferPins = () => {
    const allOfferPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    allOfferPins.forEach(element => mapPins.removeChild(element));
  };

  const removeOfferCard = () => {
    const offerCardPopup = map.querySelector('.popup');

    if (offerCardPopup) {
      offerCardPopup.remove();
    }
  };

  const renderOfferCard = (offerCardDOM) => {
    map.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', offerCardDOM);
  };

  const onSuccess = (response) => {
    renderOfferPins(response);
  };

  const onError = (errorText) => {
    console.log(errorText);
  };

  const onMainPinMouseUp = () => {
    activateMap();

    mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    resetButton.addEventListener('click', onResetClick);
  };

  const onResetClick = () => {
    deactivateMap();

    resetButton.removeEventListener('click', onResetClick);
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
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
