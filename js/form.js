'use strict';

(function () {

  const ROOM_CAPACITIES = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  const MIN_PRICES = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  const formFieldsets = window.map.form.querySelectorAll('fieldset');
  const titleField = window.map.form.querySelector('#title');
  const typeField = window.map.form.querySelector('#type');
  const priceField = window.map.form.querySelector('#price');
  const timeInField = window.map.form.querySelector('#timein');
  const timeOutField = window.map.form.querySelector('#timeout');
  const roomsCountField = window.map.form.querySelector('#room_number');
  const capacityField = window.map.form.querySelector('#capacity');

  const showFieldValidity = (fieldName) => {
    if (!fieldName.checkValidity()) {
      fieldName.style.borderColor = 'red';
    } else {
      fieldName.removeAttribute('style');
    }
  };

  const setMinPrice = (typeFieldValue) => {
    const minPrice = MIN_PRICES[typeFieldValue];
    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  const showRoomCapacityError = (roomsCount) => {
    const guestsCount = ROOM_CAPACITIES[roomsCount];

    if (!guestsCount.includes(capacityField.value)) {
      capacityField.setCustomValidity('Выберите доступное количество гостей');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  const disableInvalidCapacities = (roomsCount) => {
    const guestsCount = ROOM_CAPACITIES[roomsCount];

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

  const onMainPinMouseUp = () => {
    activateForm();
    window.map.setAddress();

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
    window.map.setAddress();

    window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
    window.map.resetButton.removeEventListener('click', onResetClick);
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

    setMinPrice(typeField.value);

  };

  window.map.setAddress();

  window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
})();
