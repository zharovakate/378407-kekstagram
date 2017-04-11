// /**
//  * Created by Ekaterina.Zharova on 05.04.17.
//  */
'use strict';
// /

document.querySelector('.gallery-overlay').classList.remove('invisible');
document.querySelector('.upload-overlay').classList.add('invisible');

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

var Arr = [];
for (var i = 0; i < 25; i++) {
  Arr.push(generatePicture(i));
  addNewPictureElement(createNewPictureElement(Arr[i]));
}

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.querySelector('.gallery-overlay-image').src = Arr[0].url;
galleryOverlay.querySelector('.likes-count').textContent = Arr[0].like;
galleryOverlay.querySelector('.comments-count').textContent = Arr[0].comment;
