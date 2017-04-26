'use strict';


window.picture = (function () {
  var similarListElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;

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

  var initPictureElement = function (data) {
    var pictureElement = createNewPictureElement(data);
    var pictureLink = pictureElement.querySelector('.picture');
    var showPicture = function (evt) {
      evt.preventDefault();

      window.gallery.updateData(data);
      window.gallery.showOverlay();
    };

    pictureLink.addEventListener('click', showPicture);

    window.picture.addNewPictureElement(pictureElement);
  };
  var clearPictures = function () {
    while (similarListElement.hasChildNodes()) {
      similarListElement.removeChild(similarListElement.lastChild);
    }
  };

  return {
    addNewPictureElement: addNewPictureElement,
    initPictureElement: initPictureElement,
    clearPictures: clearPictures
  };
})();
