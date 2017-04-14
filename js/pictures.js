// /**
//  * Created by Ekaterina.Zharova on 05.04.17.
//  */
'use strict';
// /

document.querySelector('.gallery-overlay').classList.remove('invisible');
document.querySelector('.upload-overlay').classList.add('invisible');
document.querySelector('.upload-form').classList.remove('invisible');

//
var similarListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var COMMENTS = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];


var getRandElement = function (Arr) {
  return Arr[Math.floor(Math.random() * Arr.length)];
};

var generatePicture = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    like: getRandomInt(15, 200),
    comment: getRandElement(COMMENTS)
  };
};

var addNewPictureElement = function (element) {
  var newPictureElement = document.createDocumentFragment();

  newPictureElement.appendChild(element);

  similarListElement.appendChild(newPictureElement);

};

var createNewPictureElement = function (data) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture-likes').textContent = data.like;
  pictureElement.querySelector('img').src = data.url;
  pictureElement.querySelector('.picture-comments').textContent = data.comment;

  return pictureElement;
};


var picturesArray = [];
for (var i = 0; i < 25; i++) {
  initPictureElement(generatePicture(i));
}

function initPictureElement(data) {
  var pictureElement = createNewPictureElement(data);
  var pictureLink = pictureElement.querySelector('.picture');
  var showPicture = function (evt) {
    evt.preventDefault();

    galleryOverlay.querySelector('.gallery-overlay-image').src = data.url;
    galleryOverlay.querySelector('.comments-count').textContent = data.comment;
    galleryOverlay.querySelector('.likes-count').textContent = data.like;

    showOverlay();
  };

  pictureLink.addEventListener('click', showPicture);

  picturesArray.push(data);
  addNewPictureElement(pictureElement);
}

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.querySelector('.gallery-overlay-image').src = picturesArray[0].url;
galleryOverlay.querySelector('.likes-count').textContent = picturesArray[0].like;
galleryOverlay.querySelector('.comments-count').textContent = picturesArray[0].comment;

var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

galleryOverlayClose.addEventListener('keydown', function (evt) {
  evt.preventDefault();

  if (evt.keyCode === 13) {
    hideOverlay();
  }
});

function hideOverlay() {
  galleryOverlay.classList.add('hidden');
}
function showOverlay() {
  galleryOverlay.classList.remove('hidden');
}

// При нажатии на элемент .gallery-overlay-close элемент .gallery-overlay должен скрываться

galleryOverlayClose.addEventListener('click', function () {
  hideOverlay();
});

var uploadInput = document.querySelector('.upload-input');

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

var formCancel = document.querySelector('.upload-form-cancel');

function checkValidation() {
  if (comment.validity.valid) {
    comment.classList.remove('upload-message-error');
  } else {
    comment.classList.add('upload-message-error');
  }
  return comment.validity.valid;
}

function uploadFormCancel() {
  uploadCropOverlay.classList.add('invisible');
}

formCancel.addEventListener('click', function () {
  uploadFormCancel();
});

var comment = document.querySelector('.upload-form-description');

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    hideOverlay();

    if (evt.target !== comment) {
      uploadFormCancel();
    }
  }
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
  imagePreview.style = 'transform: scale(' + value / 100 + ')';
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
  imagePreview.style = 'transform: scale(' + value / 100 + ')';

  value = 100;
  changeValue();

  comment.value = '';
}
