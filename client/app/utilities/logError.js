'use strict';

module.exports = function (e) {
  return console && console.error(e.stack);
};
