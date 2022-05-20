'use strict';

(function () {
  const form = document.querySelector('.ad-form');
  const formFieldsets = form.querySelectorAll('fieldset');
  const titleField = form.querySelector('#title');
  const typeField = form.querySelector('#type');
  const priceField = form.querySelector('#price');
  const timeInField = form.querySelector('#timein');
  const timeOutField = form.querySelector('#timeout');
  const roomsCountField = form.querySelector('#room_number');
  const capacityField = form.querySelector('#capacity');
  const resetButton = form.querySelector('.ad-form__reset');

  const checkFieldValidity = (fieldName) => {
    if (!fieldName.checkValidity()) {
      fieldName.style.borderColor = 'red';
    } else {
      fieldName.removeAttribute('style');
    }
  };

  const setMinPrice = (typeValue) => {
    let minPrice;

    switch (typeValue) {
      case 'bungalow':
        minPrice = 0;
        break;

      case 'flat':
        minPrice = 1000;
        break;

      case 'house':
        minPrice = 5000;
        break;

      case 'palace':
        minPrice = 10000;
        break;
    }

    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  const setRoomCapacityError = (invalidValues) => {
    if (invalidValues.includes(capacityField.value)) {
      capacityField.setCustomValidity('Выберите доступное количество гостей');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  const getInvalidCapacities = (roomsCount) => {
    let invalidCapacities;

    switch (roomsCount) {
      case '1':
        invalidCapacities = ['3', '2', '0'];
        break;

      case '2':
        invalidCapacities = ['3', '0'];
        break;

      case '3':
        invalidCapacities = ['0'];
        break;

      case '100':
        invalidCapacities = ['3', '2', '1'];
        break;
    }

    return invalidCapacities;
  };

  const disableInvalidCapacities = (invalidValues) => {
    for (let i = 0; i < capacityField.children.length; i++) {
      if (invalidValues.includes(capacityField.children[i].value)) {
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

    resetButton.addEventListener('click', onResetFormClick);
    window.map.mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  };

  const onTitleFieldChange = (evt) => {
    checkFieldValidity(evt.target);
  };

  const onTypeFieldChange = (evt) => {
    setMinPrice(evt.target.value);
    checkFieldValidity(priceField);
  };

  const onPriceFieldChange = (evt) => {
    checkFieldValidity(evt.target);
  };

  const onTimeInFieldChange = () => {
    timeOutField.value = timeInField.value;
  };

  const onTimeOutFieldChange = () => {
    timeInField.value = timeOutField.value;
  };

  const onRoomsCountFieldChange = (evt) => {
    const invalidCapacityValues = getInvalidCapacities(evt.target.value);

    setRoomCapacityError(invalidCapacityValues);
    disableInvalidCapacities(invalidCapacityValues);
    checkFieldValidity(capacityField);
  };

  const onCapacityFieldChange = (evt) => {
    const invalidCapacities = getInvalidCapacities(roomsCountField.value);

    setRoomCapacityError(invalidCapacities);
    checkFieldValidity(evt.target);
  };

  const onResetFormClick = () => {
    deactivateForm();
    window.map.setAddress();

    window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
    resetButton.removeEventListener('click', onResetFormClick);
  };

  const activateForm = () => {
    form.classList.remove('ad-form--disabled');

    formFieldsets.forEach(element => {
      element.removeAttribute('disabled');
    });

    const invalidCapacityValues = getInvalidCapacities(roomsCountField.value);
    setRoomCapacityError(invalidCapacityValues);
    disableInvalidCapacities(invalidCapacityValues);

    checkFieldValidity(titleField);
    checkFieldValidity(priceField);
    checkFieldValidity(capacityField);

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
    form.classList.add('ad-form--disabled');

    formFieldsets.forEach(element => {
      element.setAttribute('disabled', '');
    });

    form.reset();

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
