'use strict';

window.gallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  document.querySelector('.upload-overlay').classList.add('invisible');
  document.querySelector('.upload-form').classList.remove('invisible');
  document.querySelector('.gallery-overlay').classList.remove('invisible');

  var picturesArray = [];
  for (var i = 0, pictureData; i < 25; i++) {
    pictureData = window.data.generatePicture(i);

    window.picture.initPictureElement(pictureData);
    picturesArray.push(pictureData);
  }

  galleryOverlay.querySelector('.gallery-overlay-image').src = picturesArray[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = picturesArray[0].like;
  galleryOverlay.querySelector('.comments-count').textContent = picturesArray[0].comment;

  var hideOverlay = function () {
    galleryOverlay.classList.add('hidden');
  };

  var showOverlay = function () {
    galleryOverlay.classList.remove('hidden');
  };

  var updateData = function (data) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = data.url;
    galleryOverlay.querySelector('.comments-count').textContent = data.comment;
    galleryOverlay.querySelector('.likes-count').textContent = data.like;
  };


  galleryOverlayClose.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (evt.keyCode === 13) {
      hideOverlay();
    }
  });

  galleryOverlayClose.addEventListener('click', function () {
    hideOverlay();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      window.gallery.hideOverlay();
      window.form.uploadFormCancel(evt);
    }
  });

  return {
    showOverlay: showOverlay,
    hideOverlay: hideOverlay,
    updateData: updateData
  };
})();
