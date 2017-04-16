/**
 * Created by Ekaterina.Zharova on 16.04.17.
 */

'use strict';

window.data = (function () {
  var COMMENTS = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandElement = function (Arr) {
    return Arr[Math.floor(Math.random() * Arr.length)];
  };

  return {
    generatePicture: function (i) {
      return {
        url: 'photos/' + (i + 1) + '.jpg',
        like: getRandomInt(15, 200),
        comment: getRandElement(COMMENTS)
      };
    }
  };
})();
