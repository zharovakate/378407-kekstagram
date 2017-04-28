'use strict';

window.utils = (function () {

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var DEBOUNCE_INTERVAL = 500;

  function getDebounce() {
    var lastTimeout;
    var lastCalledFunc;

    return function (func) {
      return function () {
        var args = arguments;
        var context = null;

        if (lastTimeout) {
          lastCalledFunc = func;
        } else {
          lastCalledFunc = func;

          func.apply(context, args);

          lastTimeout = window.setTimeout(function () {
            lastTimeout = null;

            if (func !== lastCalledFunc) {
              lastCalledFunc.apply(context, args);
            }
          }, DEBOUNCE_INTERVAL);
        }
      };
    };
  }
  return {
    getRandomInt: getRandomInt,
    getDebounce: getDebounce
  };
})();
