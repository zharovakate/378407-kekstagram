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

  var setImageFilter = function (node) {
    var filterId = node.id;
    var filterSelector = filterId.replace('upload-', '');

    imagePreview.classList.remove(currentFilterSelector);
    if (filterSelector !== '') {
      imagePreview.classList.add(filterSelector);
    }
    currentFilterSelector = filterSelector;
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

  return {
    uploadFormCancel: uploadFormCancel
  };
})();
