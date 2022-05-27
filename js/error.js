'use strict';

(function () {
  const createErrorMessage = (errorText) => {
    const errorElement = document.createElement('div');

    errorElement.id = 'error-message';
    errorElement.textContent = errorText;

    errorElement.style.position = 'fixed';
    errorElement.style.top = 0;
    errorElement.style.left = 0;
    errorElement.style.zIndex = 2;
    errorElement.style.boxSizing = 'border-box';
    errorElement.style.width = '100%';
    errorElement.style.height = '100%';
    errorElement.style.overflow = 'auto';
    errorElement.style.fontSize = '50px';
    errorElement.style.fontWeight = 700;
    errorElement.style.textAlign = 'center';
    errorElement.style.color = 'white';
    errorElement.style.verticalAlign = 'middle';
    errorElement.style.paddingTop = '300px';
    errorElement.style.backgroundColor = 'rgba(80, 0, 0, 0.8)';

    return errorElement;
  };

  const showErrorMessage = (errorText) => {
    const errorElement = createErrorMessage(errorText);

    document.addEventListener('keydown', closeErrorMessage);
    document.addEventListener('click', closeErrorMessage);

    window.form.successSaveMessage.insertAdjacentElement('beforebegin', errorElement);

    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  };

  const closeErrorMessage = (evt) => {
    if (evt.type === 'keydown' && evt.keyCode !== window.constants.keyCodes.ESC) {
      return;
    }

    document.querySelector('#error-message').remove();
    document.removeEventListener('keydown', closeErrorMessage);
    document.removeEventListener('click', closeErrorMessage);
  };

  window.error = {
    showErrorMessage,
  };
})();
