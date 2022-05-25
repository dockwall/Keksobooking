'use strict';

(function () {
  const loadData = (onLoad, onError) => {
    const URL = 'https://22.javascript.pages.academy/keksobooking/data';

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status === 200) {
        onLoad(evt.target.response);
      } else {
        onError('Статус ответа:' + evt.target.status + '. ' + evt.target.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа сервера');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    loadData,
  };
})();
