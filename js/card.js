'use strict';

(function () {
  const TYPES_DICT = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  const templateCard = window.constants.template.querySelector('.map__card');
  const templateCardPhoto = templateCard.querySelector('.popup__photos').querySelector('img');

  window.card = {
    createCard(offerObject) {
      const offerCardElement = templateCard.cloneNode('true');
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

      window.constants.offerOptions.FEATURES.forEach(element => {
        const classToDelete = (offerObject.offer.features.includes(element)) ? '' : `.popup__feature--${element}`;

        if (classToDelete) {
          const featureToDelete = offerCardElementFeatures.querySelector(classToDelete);
          offerCardElementFeatures.removeChild(featureToDelete);
        }
      });

      offerObject.offer.photos.forEach(element => {
        const photoElement = templateCardPhoto.cloneNode('true');
        photoElement.src = element;
        offerCardPhotosFragment.appendChild(photoElement);
      });

      offerCardElementPhotos.removeChild(offerCardElementPhotos.querySelector('.popup__photo'));
      offerCardElementPhotos.appendChild(offerCardPhotosFragment);

      return offerCardElement;
    },
  };
})();
