'use strict';

window.gallery = (function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var debounce = window.utils.getDebounce();
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var arr = [];
  window.load(URL, function (data) {
    for (var i = 0, pictureData; i < data.length; i++) {
      var serverData = {
        url: data[i].url,
        like: data[i].likes,
        comment: data[i].comments.length,
      };
      pictureData = serverData;
      window.picture.initializePictureElement(pictureData);
      arr.push(pictureData);
    }
    galleryOverlay.querySelector('.gallery-overlay-image').src = arr[0].url;
    galleryOverlay.querySelector('.likes-count').textContent = arr[0].like;
    galleryOverlay.querySelector('.comments-count').textContent = arr[0].comment;
    document.querySelector('.filters').classList.remove('hidden');

  }, function (error) {
    document.querySelector('.error').textContent = error;
    var errorElement = document.querySelector('.error');
    errorElement.classList.remove('invisible');
  });

  var sortByPopularity = function () {
    window.picture.clearPictures();
    for (var i = 0; i < arr.length; i++) {
      window.picture.initializePictureElement(arr[i]);
    }
  };
  var sortByNew = function () {
    var list = [];
    while (list.length < 10) {
      var i;
      i = window.utils.getRandomInt(0, arr.length - 1);
      if (list.indexOf(i) === -1) {
        list.push(i);
      }
    }
    window.picture.clearPictures();
    for (var k = 0; k < 10; k++) {
      window.picture.initializePictureElement(arr[list[k]]);
    }
  };

  var sortByDiscussed = function () {
    var sorted = arr.slice(0);
    sorted.sort(function (a, b) {
      return b.comment - a.comment;
    });
    window.picture.clearPictures();
    for (var i = 0; i < sorted.length; i++) {
      window.picture.initializePictureElement(sorted[i]);
    }
  };

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

  document.getElementById('filter-popular').addEventListener('change', debounce(sortByPopularity, 500));
  document.getElementById('filter-new').addEventListener('change', debounce(sortByNew, 500));
  document.getElementById('filter-discussed').addEventListener('change', debounce(sortByDiscussed, 500));

  return {
    showOverlay: showOverlay,
    hideOverlay: hideOverlay,
    updateData: updateData
  };
})();
