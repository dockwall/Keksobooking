'use strict';

(function () {
  const MAP_PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  const templatePin = window.constants.template.querySelector('.map__pin');
  const pinsArray = [];

  const generatePinElement = (offerObject) => {
    const pinElement = templatePin.cloneNode('true');
    const pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = `${offerObject.offer.location.x - (MAP_PIN_SIZE.WIDTH / 2)}px`;
    pinElement.style.top = `${offerObject.offer.location.y - MAP_PIN_SIZE.HEIGHT}px`;
    pinElementImg.src = offerObject.author.avatar;
    pinElementImg.alt = offerObject.offer.title;

    return pinElement;
  };

  const fillPinsArray = () => {
    window.data.offersArray.forEach(element => {
      pinsArray.push(generatePinElement(element));
    });
  };

  fillPinsArray();

  window.pins = {
    pinsArray: pinsArray,
  };
})();
