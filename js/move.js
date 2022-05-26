'use strict';

(function () {
  const dragBorder = {
    left: window.constants.activeMapBorders.LEFT,
    right: window.constants.activeMapBorders.RIGHT - window.map.mainPin.offsetWidth,
    top: window.constants.activeMapBorders.TOP - window.map.mainPin.offsetHeight - window.constants.mainPinTailLength,
    bottom: window.constants.activeMapBorders.BOTTOM - window.map.mainPin.offsetHeight - window.constants.mainPinTailLength,
  };

  const onResetClick = () => {
    window.map.mainPin.style.left = window.constants.defaultMainPinPosition.X + 'px';
    window.map.mainPin.style.top = window.constants.defaultMainPinPosition.Y + 'px';
    window.form.setAddress();

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

      window.form.setAddress();
    };

    const onDraggedMainMapPinMouseUp = () => {
      window.form.setAddress();

      window.map.resetButton.addEventListener('click', onResetClick);

      document.removeEventListener('mousemove', onMainMapPinMouseMove);
      document.removeEventListener('mouseup', onDraggedMainMapPinMouseUp);
    };

    document.addEventListener('mousemove', onMainMapPinMouseMove);
    document.addEventListener('mouseup', onDraggedMainMapPinMouseUp);
  });
})();
