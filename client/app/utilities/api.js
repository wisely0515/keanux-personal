'use strict';

var xhr = require('./xhr.js');

module.exports = {
  getStatus: function() {
    return xhr('/api/login/getStatus');
  },

  getPosts: function() {
    return xhr('/api/posts');
  }
};