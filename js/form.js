'use strict';

window.form = (function () {
  var uploadInput = document.querySelector('.upload-input');
  var comment = document.querySelector('.upload-form-description');
  var formCancel = document.querySelector('.upload-form-cancel');

  uploadInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    if (value) {
      showCropOverlay();
    }
  });

  var uploadCropOverlay = document.querySelector('.upload-overlay');

  function showCropOverlay() {
    uploadCropOverlay.classList.remove('invisible');
  }

  function checkValidation() {
    if (comment.validity.valid) {
      comment.classList.remove('upload-message-error');
    } else {
      comment.classList.add('upload-message-error');
    }
    return comment.validity.valid;
  }

  function uploadFormCancel(evt) {
    if (typeof evt !== 'undefined' && evt.target === comment) {
      return;
    }

    uploadCropOverlay.classList.add('invisible');
  }

  formCancel.addEventListener('click', function () {
    uploadFormCancel();
  });


  var submitButton = document.querySelector('.upload-form-submit');

  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (checkValidation()) {
      uploadFormCancel();
      setFormToDefaultValues();
    }
  });


  var valueResizeControl = document.querySelector('.upload-resize-controls-value');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var imagePreview = document.querySelector('.filter-image-preview');

  var uploadFilterPreviews = document.querySelectorAll('input[name="upload-filter"]');


  var value = 100;
  var step = 25;
  var min = 25;
  var max = 100;

  buttonDec.addEventListener('click', function () {
    if (value !== min) {
      value = value - step;
      changeValue();
    }
  });
  buttonInc.addEventListener('click', function () {
    if (value !== max) {
      value = value + step;
      changeValue();
    }
  });

  var changeValue = function () {
    valueResizeControl.value = value + '%';
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var currentFilterSelector;

  for (var n = 0; n < uploadFilterPreviews.length; n++) {
    uploadFilterPreviews[n].addEventListener('click', function (evt) {
      setImageFilter(evt.target);
    });
  }

  function setImageFilter(node) {
    var filterId = node.id;
    var filterSelector = filterId.replace('upload-', '');

    imagePreview.classList.remove(currentFilterSelector);
    imagePreview.classList.add(filterSelector);

    currentFilterSelector = filterSelector;
  }

  function setFormToDefaultValues() {
    setImageFilter(uploadFilterPreviews[0]);

    valueResizeControl.value = value + '%';
    imagePreview.style.transform = 'scale(' + value / 100 + ')';

    value = 100;
    changeValue();

    comment.value = '';
  }

  return {
    uploadFormCancel: uploadFormCancel
  };
})();
