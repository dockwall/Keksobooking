'use strict';

(function () {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mainPin = map.querySelector('.map__pin--main');
  const form = document.querySelector('.ad-form');
  const resetButton = form.querySelector('.ad-form__reset');

  const activateMap = () => {
    window.map.isActive = true;

    map.classList.remove('map--faded');

    window.backend.loadData(onSuccess, onError);
  };

  const deactivateMap = () => {
    window.map.isActive = false;

    map.classList.add('map--faded');

    removeOfferPins();
    removeOfferCard();
  };

  const renderOfferPins = (pinsArray) => {
    const pinsFragment = document.createDocumentFragment();

    pinsArray.forEach(element => {
      const pinElement = window.pins.createPinElement(element);

      pinElement.addEventListener('click', function () {
        removeOfferCard();
        const currentOfferCard = window.card.createCard(element);
        currentOfferCard.querySelector('.popup__close').addEventListener('click', removeOfferCard);
        renderOfferCard(currentOfferCard);
      });

      pinsFragment.appendChild(pinElement);
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

    resetButton.addEventListener('click', onResetClick);
    mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  };

  const onResetClick = () => {
    deactivateMap();

    resetButton.removeEventListener('click', onResetClick);
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
  };

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.map = {
    isActive: false,
    mainPin,
    form,
    resetButton,
  };
})();
