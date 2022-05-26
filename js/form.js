'use strict';

(function () {

  const formFieldsets = window.map.form.querySelectorAll('fieldset');
  const titleField = window.map.form.querySelector('#title');
  const typeField = window.map.form.querySelector('#type');
  const priceField = window.map.form.querySelector('#price');
  const timeInField = window.map.form.querySelector('#timein');
  const timeOutField = window.map.form.querySelector('#timeout');
  const roomsCountField = window.map.form.querySelector('#room_number');
  const capacityField = window.map.form.querySelector('#capacity');
  const addressField = window.map.form.querySelector('#address');
  const successSaveMessage = document.querySelector('.success');

  const showFieldValidity = (fieldName) => {
    if (!fieldName.checkValidity()) {
      fieldName.style.borderColor = 'red';
    } else {
      fieldName.removeAttribute('style');
    }
  };

  const setMinPrice = (typeFieldValue) => {
    const minPrice = window.constants.minPrices[typeFieldValue];
    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  const showRoomCapacityError = (roomsCount) => {
    const guestsCount = window.constants.roomCapacities[roomsCount];

    if (!guestsCount.includes(capacityField.value)) {
      capacityField.setCustomValidity('Выберите доступное количество гостей');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  const disableInvalidCapacities = (roomsCount) => {
    const guestsCount = window.constants.roomCapacities[roomsCount];

    for (let i = 0; i < capacityField.children.length; i++) {
      if (!guestsCount.includes(capacityField.children[i].value)) {
        capacityField.children[i].setAttribute('disabled', '');
        capacityField.children[i].style.backgroundColor = 'silver';
      } else {
        capacityField.children[i].removeAttribute('disabled');
        capacityField.children[i].removeAttribute('style');
      }
    }
  };

  const setAddress = () => {
    let MainPinAddressX;
    let MainPinAddressY;

    if (window.map.isActive) {
      MainPinAddressX = window.map.mainPin.offsetLeft + Math.floor(window.map.mainPin.offsetWidth / 2);
      MainPinAddressY = window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.constants.mainPinTailLength;
    } else {
      MainPinAddressX = window.map.mainPin.offsetLeft + Math.floor(window.map.mainPin.offsetWidth / 2);
      MainPinAddressY = window.map.mainPin.offsetTop + Math.floor(window.map.mainPin.offsetHeight / 2);
    }

    addressField.value = `${MainPinAddressX}, ${MainPinAddressY}`;
  };

  const activateForm = () => {
    window.map.form.classList.remove('ad-form--disabled');

    formFieldsets.forEach(element => {
      element.removeAttribute('disabled');
    });

    showRoomCapacityError(roomsCountField.value);
    disableInvalidCapacities(roomsCountField.value);

    showFieldValidity(titleField);
    showFieldValidity(priceField);
    showFieldValidity(capacityField);

    setMinPrice(typeField.value);

    titleField.addEventListener('change', onTitleFieldChange);
    typeField.addEventListener('change', onTypeFieldChange);
    priceField.addEventListener('change', onPriceFieldChange);
    timeInField.addEventListener('change', onTimeInFieldChange);
    timeOutField.addEventListener('change', onTimeOutFieldChange);
    roomsCountField.addEventListener('change', onRoomsCountFieldChange);
    capacityField.addEventListener('change', onCapacityFieldChange);
    window.map.form.addEventListener('submit', onFormSubmit);
  };

  const deactivateForm = () => {
    window.map.form.classList.add('ad-form--disabled');

    formFieldsets.forEach(element => {
      element.setAttribute('disabled', '');
    });

    window.map.form.reset();

    titleField.removeEventListener('change', onTitleFieldChange);
    typeField.removeEventListener('change', onTypeFieldChange);
    priceField.removeEventListener('change', onPriceFieldChange);
    timeInField.removeEventListener('change', onTimeInFieldChange);
    timeOutField.removeEventListener('change', onTimeOutFieldChange);
    roomsCountField.removeEventListener('change', onRoomsCountFieldChange);
    capacityField.removeEventListener('change', onCapacityFieldChange);
    window.map.form.removeEventListener('submit', onFormSubmit);

    setMinPrice(typeField.value);

  };

  const showSuccessMessage = () => {
    successSaveMessage.classList.remove('hidden');

    document.addEventListener('keydown', hideSuccessMessage);
    document.addEventListener('click', hideSuccessMessage);
  };

  const hideSuccessMessage = (evt) => {
    if (evt.type === 'keydown' && evt.keyCode !== window.constants.keyCodes.ESC) {
      return;
    }

    successSaveMessage.classList.add('hidden');
    document.removeEventListener('keydown', hideSuccessMessage);
    document.removeEventListener('click', hideSuccessMessage);
  };

  const onMainPinMouseUp = () => {
    activateForm();

    window.map.resetButton.addEventListener('click', onResetClick);
    window.map.mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  };

  const onTitleFieldChange = (evt) => {
    showFieldValidity(evt.target);
  };

  const onTypeFieldChange = (evt) => {
    setMinPrice(evt.target.value);
    showFieldValidity(priceField);
  };

  const onPriceFieldChange = (evt) => {
    showFieldValidity(evt.target);
  };

  const onTimeInFieldChange = () => {
    timeOutField.value = timeInField.value;
  };

  const onTimeOutFieldChange = () => {
    timeInField.value = timeOutField.value;
  };

  const onRoomsCountFieldChange = (evt) => {
    showRoomCapacityError(evt.target.value);
    disableInvalidCapacities(evt.target.value);
    showFieldValidity(capacityField);
  };

  const onCapacityFieldChange = (evt) => {
    showRoomCapacityError(roomsCountField.value);
    showFieldValidity(evt.target);
  };

  const onResetClick = () => {
    deactivateForm();

    window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
    window.map.resetButton.removeEventListener('click', onResetClick);
  };

  const onSuccessSave = () => {
    onResetClick();
    window.map.deactivateMap();
    window.move.onResetClick();

    showSuccessMessage();
  };

  const onErrorSave = (errorText) => {
    console.log(errorText);
  };

  const onFormSubmit = (evt) => {
    var formData = new FormData(window.map.form);

    window.backend.saveForm(formData, onSuccessSave, onErrorSave);

    evt.preventDefault();
  };

  setAddress();

  window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.form = {
    setAddress,
  };
})();
