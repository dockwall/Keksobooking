'use strict';

(function () {
  const templateOfferPin = window.constants.template.querySelector('.map__pin');

  const createPinElement = (offerObject) => {
    const pinElement = templateOfferPin.cloneNode('true');
    const pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = `${offerObject.location.x - (window.constants.offerPinSize.WIDTH / 2)}px`;
    pinElement.style.top = `${offerObject.location.y - window.constants.offerPinSize.HEIGHT}px`;
    pinElementImg.src = offerObject.author.avatar;
    pinElementImg.alt = offerObject.offer.title;

    return pinElement;
  };

  window.pins = {
    createPinElement,
  };
})();
