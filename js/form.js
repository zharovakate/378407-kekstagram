'use strict';

window.form = (function () {
  var uploadInput = document.querySelector('.upload-input');
  var uploadCropOverlay = document.querySelector('.upload-overlay');

  var comment = document.querySelector('.upload-form-description');
  var formCancel = document.querySelector('.upload-form-cancel');

  // var valueResizeControl = document.querySelector('.upload-resize-controls-value');

  var submitButton = document.querySelector('.upload-form-submit');
  var filterControls = document.querySelector('.upload-filter-controls');

  var imagePreview = document.querySelector('.filter-image-preview');
  var currentFilterSelector;

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
  filterControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      setImageFilter(evt.target);
    }
  });

  var filterSliderBlock = document.querySelector('.upload-filter-level');
  var filterPin = filterSliderBlock.querySelector('.upload-filter-level-pin');
  var filterLevelValue = filterSliderBlock.querySelector('.upload-filter-level-val');

  var applyDefaultFilterLevel = function () {
    filterLevelValue.style.width = '100%';
    filterPin.style.left = '100%';
    imagePreview.style.filter = '';
  };

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

  window.initializeFilters(applyCurrentFilterSelector, filterSliderBlock);

  var changeValue = function (scale) {
    imagePreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(changeValue);

  return {
    uploadFormCancel: uploadFormCancel
  };
})();
