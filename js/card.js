'use strict';

(function () {
  const TYPES_DICT = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };

  const templateCard = window.constants.template.querySelector('.map__card');
  const templateCardPhoto = templateCard.querySelector('.popup__photos img');

  const getCardPhotos = (offerObject) => {
    const cardPhotosFragment = document.createDocumentFragment();

    offerObject.offer.photos.forEach(element => {
      const photoElement = templateCardPhoto.cloneNode('true');
      photoElement.src = element;
      cardPhotosFragment.appendChild(photoElement);
    });

    return cardPhotosFragment;
  };

  window.card = {
    createCard(offerObject) {
      const cardElement = templateCard.cloneNode('true');
      const cardElementFeatures = cardElement.querySelector('.popup__features');
      const cardElementPhotos = cardElement.querySelector('.popup__photos');

      cardElement.querySelector('.popup__title').textContent = offerObject.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offerObject.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = `${offerObject.offer.price}\u20BD/ночь`;
      cardElement.querySelector('.popup__type').textContent = TYPES_DICT[offerObject.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = `${offerObject.offer.rooms} комнаты для ${offerObject.offer.guests} гостей`;
      cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${offerObject.offer.checkout}`;
      cardElement.querySelector('.popup__description').textContent = offerObject.offer.desrciption;
      cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;

      window.constants.offerOptions.FEATURES.forEach(element => {
        const classToDelete = (offerObject.offer.features.includes(element)) ? '' : `.popup__feature--${element}`;

        if (classToDelete) {
          const featureToDelete = cardElementFeatures.querySelector(classToDelete);
          cardElementFeatures.removeChild(featureToDelete);
        }
      });

      const cardPhotosFragment = getCardPhotos(offerObject);

      cardElementPhotos.removeChild(cardElementPhotos.querySelector('.popup__photo'));
      cardElementPhotos.appendChild(cardPhotosFragment);

      return cardElement;
    },
  };
})();
