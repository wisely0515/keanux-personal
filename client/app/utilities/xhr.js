'use strict';

require('whatwg-fetch');
var assign = require('object-assign');

var error = function(res) {
  return Promise.reject(new Error(res.statusText));
};

var json = function(response) {
  return response.json();
};

var xhr = function(url, params) {
  params = assign({
    headers: { 'Content-Type': 'application/json' }
  }, params);

  return fetch(url, params).then(json).catch(error);
};

module.exports = xhr;
