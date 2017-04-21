'use strict';

window.form = (function () {
  var uploadInput = document.querySelector('.upload-input');
  var uploadCropOverlay = document.querySelector('.upload-overlay');

  var comment = document.querySelector('.upload-form-description');
  var formCancel = document.querySelector('.upload-form-cancel');

  var valueResizeControl = document.querySelector('.upload-resize-controls-value');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');

  var submitButton = document.querySelector('.upload-form-submit');
  var filterControls = document.querySelector('.upload-filter-controls');
  var imagePreview = document.querySelector('.filter-image-preview');

  var currentFilterSelector;

  var zoomValue = 100;
  var Zoom = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var showCropOverlay = function () {
    uploadCropOverlay.classList.remove('invisible');
  };

  var checkValidation = function () {
    if (comment.validity.valid) {
      comment.classList.remove('upload-message-error');
    } else {
      comment.classList.add('upload-message-error');
    }
    return comment.validity.valid;
  };

  var uploadFormCancel = function (evt) {
    if (typeof evt !== 'undefined' && evt.target === comment) {
      return;
    }

    uploadCropOverlay.classList.add('invisible');
  };

  var changeValue = function () {
    valueResizeControl.value = zoomValue + '%';
    imagePreview.style.transform = 'scale(' + zoomValue / 100 + ')';
  };

  var setImageFilter = function (filterNode) {
    var filterId = filterNode.id;
    var filterSelector = filterId.replace('upload-', '');

    imagePreview.classList.remove(currentFilterSelector);

    if (filterSelector !== '') {
      imagePreview.classList.add(filterSelector);
      imagePreview.style.filter = '';
    }
    currentFilterSelector = filterSelector;
    if (currentFilterSelector === 'filter-none') {
      filterSliderBlock.classList.add('invisible');
    } else {
      filterSliderBlock.classList.remove('invisible');
      applyDefaultFilterLevel();
    }
  };
  var setFormToDefaultValues = function () {
    setImageFilter(filterControls);

    valueResizeControl.value = zoomValue + '%';
    imagePreview.style.transform = 'scale(' + zoomValue / 100 + ')';

    zoomValue = 100;
    changeValue();

    comment.value = '';
  };

  uploadInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    if (value) {
      showCropOverlay();
    }
  });

  formCancel.addEventListener('click', uploadFormCancel);

  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (checkValidation()) {
      uploadFormCancel();
      setFormToDefaultValues();
    }
  });

  buttonDec.addEventListener('click', function () {
    if (zoomValue !== Zoom.MIN) {
      zoomValue = zoomValue - Zoom.STEP;
      changeValue();
    }
  });
  buttonInc.addEventListener('click', function () {
    if (zoomValue !== Zoom.MAX) {
      zoomValue = zoomValue + Zoom.STEP;
      changeValue();
    }
  });

  filterControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      setImageFilter(evt.target);
    }
  });

  // new task
  var filterSliderBlock = document.querySelector('.upload-filter-level');
  var filterPin = filterSliderBlock.querySelector('.upload-filter-level-pin');
  var filterLevelLine = filterSliderBlock.querySelector('.upload-filter-level-line');
  var filterLevelValue = filterSliderBlock.querySelector('.upload-filter-level-val');

  filterPin.addEventListener('mousedown', function () {
    var lineCoords = getCoords(filterLevelLine);

    var moveFunction = function (evt) {
      var pinLeft = evt.pageX - lineCoords.left;
      var rightEdge = filterLevelLine.offsetWidth - (filterPin.offsetWidth / 2);
      var percentValue = (pinLeft / rightEdge) * 100;
      if (percentValue < 0) {
        percentValue = 0;
      }

      if (percentValue > 100) {
        percentValue = 100;
      }

      filterPin.style.left = percentValue + '%';
      filterLevelValue.style.width = percentValue + '%';

      var applyCurrentFilterSelector = function (percentFilterValue) {
        if (currentFilterSelector === 'filter-chrome') {
          imagePreview.style.filter = 'grayscale(' + percentFilterValue / 100 + ')';
        } else if (currentFilterSelector === 'filter-sepia') {
          imagePreview.style.filter = 'sepia(' + percentFilterValue / 100 + ')';
        } else if (currentFilterSelector === 'filter-marvin') {
          imagePreview.style.filter = 'invert(' + percentFilterValue + '%)';
        } else if (currentFilterSelector === 'filter-phobos') {
          imagePreview.style.filter = 'blur(' + (percentFilterValue / 100) * 3 + 'px)';
        } else if (currentFilterSelector === 'filter-heat') {
          imagePreview.style.filter = 'brightness(' + (percentFilterValue / 100) * 3 + ')';
        }
      };

      applyCurrentFilterSelector(percentValue);

    };

    var upFunction = function () {
      document.removeEventListener('mousemove', moveFunction);
      document.removeEventListener('mouseup', upFunction);
    };

    document.addEventListener('mousemove', moveFunction);
    document.addEventListener('mouseup', upFunction);

    return false;
  });

  function getCoords(elem) {
    var coords = elem.getBoundingClientRect();

    return {
      top: coords.top + pageYOffset,
      left: coords.left + pageXOffset
    };
  }

  var applyDefaultFilterLevel = function () {
    filterLevelValue.style.width = '100%';
    filterPin.style.left = '100%';
    imagePreview.style.filter = '';
  };

  return {
    uploadFormCancel: uploadFormCancel
  };
})();
