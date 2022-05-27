'use strict';

(function () {
  const templateOfferPin = window.constants.template.querySelector('.map__pin');

  const createPinElement = (offerObject) => {
    const pinElement = templateOfferPin.cloneNode('true');
    const pinElementImg = pinElement.querySelector('img');
    const locationX = window.utils.getRandomFromInterval(window.constants.offerLocationOptions.X);
    const locationY = window.utils.getRandomFromInterval(window.constants.offerLocationOptions.Y);

    pinElement.style.left = `${locationX - (window.constants.offerPinSize.WIDTH / 2)}px`;
    pinElement.style.top = `${locationY - window.constants.offerPinSize.HEIGHT}px`;
    pinElementImg.src = offerObject.author.avatar;
    pinElementImg.alt = offerObject.offer.title;

    return pinElement;
  };

  window.pins = {
    createPinElement,
  };
})();
