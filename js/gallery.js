'use strict';
var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

window.gallery = (function () {
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
      window.picture.initPictureElement(pictureData);
      arr.push(pictureData);
    }
    galleryOverlay.querySelector('.gallery-overlay-image').src = arr[0].url;
    galleryOverlay.querySelector('.likes-count').textContent = arr[0].like;
    galleryOverlay.querySelector('.comments-count').textContent = arr[0].comment;
    document.querySelector('.filters').classList.remove('hidden');

  }, function (error) {
    document.querySelector('.error').textContent = error;
  });

  window.debounce = function (func, wait) {
    var timeout;
    return function () {
      var args = arguments;
      var later = function () {
        timeout = null;
        func.apply(null, args);
      };
      var callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(null, args);
      }
    };
  };

  window.sortByPopularity = function () {
    window.picture.clearPictures();
    for (var i = 0; i < arr.length; i++) {
      window.picture.initPictureElement(arr[i]);
    }
  };
  window.sortByNew = function () {
    var list = [];
    while (list.length < 10) {
      var i;
      i = window.data.getRandomInt(0, arr.length - 1);
      if (list.indexOf(i) === -1) {
        list.push(i);
      }
    }
    window.picture.clearPictures();
    for (var k = 0; k < 10; k++) {
      window.picture.initPictureElement(arr[list[k]]);
    }
  };

  window.sortByDiscussed = function () {
    var sorted = arr.slice(0);
    sorted.sort(function (a, b) {
      return b.comment - a.comment;
    });
    window.picture.clearPictures();
    for (var i = 0; i < sorted.length; i++) {
      window.picture.initPictureElement(sorted[i]);
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

  return {
    showOverlay: showOverlay,
    hideOverlay: hideOverlay,
    updateData: updateData
  };
})();
