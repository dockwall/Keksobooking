'use strict';

(function () {
  const ALL_URL = {
    forLoad: 'https://22.javascript.pages.academy/keksobooking/data',
    forSave: 'https://22.javascript.pages.academy/keksobooking',
  };

  const ERROR_MESSAGES = {
    serverError: 'Произошла ошибка сервера, повторите попытку позднее',
    connectionError: 'Произошла ошибка соединения. Проверьте подключение к интернету',
    timeoutError: 'Превышено время ожидания ответа сервера. Проверьте подключение к интернету',

  };

  const createXhr = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    return xhr;
  };

  const loadData = (onLoad, onError) => {
    const URL = ALL_URL.forLoad;
    const xhr = createXhr();

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status === 200) {
        onLoad(evt.target.response);
      } else {
        onError(`${ERROR_MESSAGES.serverError}.\n ${evt.target.status}: ${evt.target.statusText}`);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGES.connectionError);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_MESSAGES.timeoutError);
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  const saveForm = (formData, onLoad, onError) => {
    const URL = ALL_URL.forSave;
    const xhr = createXhr();

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status === 200) {
        onLoad(evt.target.response);
      } else {
        onError('Статус ответа:' + evt.target.status + '. ' + evt.target.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGES.connectionError);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_MESSAGES.timeoutError);
    });

    xhr.open('POST', URL);
    xhr.send(formData);
  };

  window.backend = {
    loadData,
    saveForm,
  };
})();
