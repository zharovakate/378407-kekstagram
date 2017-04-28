'use strict';

window.filters = (function () {
  function getCoords(elem) {
    var coords = elem.getBoundingClientRect();

    return {
      top: coords.top + pageYOffset,
      left: coords.left + pageXOffset
    };
  }

  var applyCurrentFilterSelector;

  function initializeFilters(onChangeValue, sliderBlock) {
    applyCurrentFilterSelector = onChangeValue;
    var filterSliderBlock;
    filterSliderBlock = sliderBlock;
    var filterPin = filterSliderBlock.querySelector('.upload-filter-level-pin');

    filterPin.addEventListener('mousedown', function () {
      var filterLevelLine = filterSliderBlock.querySelector('.upload-filter-level-line');
      var lineCoords = getCoords(filterLevelLine);

      var moveFunction = function (evt) {
        var pinLeft = evt.pageX - lineCoords.left;
        var rightEdge = filterLevelLine.offsetWidth - (filterPin.offsetWidth / 2);
        var percentValue = (pinLeft / rightEdge) * 100;
        if (percentValue < 0) {
          percentValue = 0;
        }

        if (percentValue > 100) {
          percentValue = 100;
        }
        var filterLevelValue = filterSliderBlock.querySelector('.upload-filter-level-val');

        filterPin.style.left = percentValue + '%';
        filterLevelValue.style.width = percentValue + '%';

        applyCurrentFilterSelector(percentValue);

      };

      var upFunction = function () {
        document.removeEventListener('mousemove', moveFunction);
        document.removeEventListener('mouseup', upFunction);
      };

      document.addEventListener('mousemove', moveFunction);
      document.addEventListener('mouseup', upFunction);

      return false;
    });
  }
  return {
    initializeFilters: initializeFilters
  };
})();


