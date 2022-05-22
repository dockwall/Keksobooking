'use strict';

(function () {
  const DEFAULT_MAIN_PIN_POSITION = {
    X: 570,
    Y: 375,
  };

  const DRAG_LIMIT = {
    X: {
      MIN: 0,
      MAX: 1200,
    },
    Y: {
      MIN: 130,
      MAX: 630,
    },
  };

  const dragBorder = {
    left: DRAG_LIMIT.X.MIN,
    right: DRAG_LIMIT.X.MAX - window.map.mainPin.offsetWidth,
    top: DRAG_LIMIT.Y.MIN - window.map.mainPin.offsetHeight - window.map.mainPinTailLength,
    bottom: DRAG_LIMIT.Y.MAX - window.map.mainPin.offsetHeight - window.map.mainPinTailLength,
  };

  const onResetClick = () => {
    window.map.mainPin.style.left = DEFAULT_MAIN_PIN_POSITION.X + 'px';
    window.map.mainPin.style.top = DEFAULT_MAIN_PIN_POSITION.Y + 'px';

    window.map.resetButton.removeEventListener('click', onResetClick);
  };

  window.map.mainPin.addEventListener('mousedown', function (mouseDownEvt) {
    let startCoordinates = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY,
    };

    const onMainMapPinMouseMove = (mouseMoveEvt) => {
      const shiftCoordinates = {
        x: startCoordinates.x - mouseMoveEvt.clientX,
        y: startCoordinates.y - mouseMoveEvt.clientY,
      };

      startCoordinates = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY,
      };

      const newCoordinates = {
        x: window.map.mainPin.offsetLeft - shiftCoordinates.x,
        y: window.map.mainPin.offsetTop - shiftCoordinates.y,
      };

      if (newCoordinates.x >= dragBorder.left && newCoordinates.x <= dragBorder.right) {
        window.map.mainPin.style.left = (newCoordinates.x) + 'px';
      }

      if (newCoordinates.y >= dragBorder.top && newCoordinates.y <= dragBorder.bottom) {
        window.map.mainPin.style.top = (newCoordinates.y) + 'px';
      }

      window.map.setAddress();
    };

    const onDraggedMainMapPinMouseUp = () => {
      window.map.setAddress();

      if (!window.map.isActive) {
        window.map.resetButton.addEventListener('click', onResetClick);
      }

      document.removeEventListener('mousemove', onMainMapPinMouseMove);
      document.removeEventListener('mouseup', onDraggedMainMapPinMouseUp);
    };

    document.addEventListener('mousemove', onMainMapPinMouseMove);
    document.addEventListener('mouseup', onDraggedMainMapPinMouseUp);
  });
})();
