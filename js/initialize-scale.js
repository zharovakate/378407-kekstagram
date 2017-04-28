'use strict';

window.scale = (function () {
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');

  var changeValue;

  var Zoom = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };
  var zoomValue = Zoom.MAX;

  buttonDec.addEventListener('click', function () {
    if (zoomValue !== Zoom.MIN) {
      zoomValue = zoomValue - Zoom.STEP;
      changeValue(zoomValue);
    }
  });
  buttonInc.addEventListener('click', function () {
    if (zoomValue !== Zoom.MAX) {
      zoomValue = zoomValue + Zoom.STEP;
      changeValue(zoomValue);
    }
  });
  function initializeScale(onChangeValue) {
    changeValue = onChangeValue;
  }
  return {
    initializeScale: initializeScale
  };
})();

