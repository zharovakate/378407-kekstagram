'use strict';
var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

window.gallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  window.load(URL, function (data) {
    var arr = [];
    for (var i = 0, pictureData; i < data.length; i++) {
      var serverData = {
        url: data[i].url,
        like: data[i].likes,
        comment: data[i].comments.length,
      };
      pictureData = serverData;
      window.picture.initPictureElement(pictureData);
      arr.push(pictureData);
    }
    galleryOverlay.querySelector('.gallery-overlay-image').src = arr[0].url;
    galleryOverlay.querySelector('.likes-count').textContent = arr[0].like;
    galleryOverlay.querySelector('.comments-count').textContent = arr[0].comment;
  }, function (error) {
    document.querySelector('.error').textContent = error;
  });

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

  document.querySelector('.upload-overlay').classList.add('invisible');
  document.querySelector('.upload-form').classList.remove('invisible');
  document.querySelector('.gallery-overlay').classList.remove('invisible');

  return {
    showOverlay: showOverlay,
    hideOverlay: hideOverlay,
    updateData: updateData
  };
})();
