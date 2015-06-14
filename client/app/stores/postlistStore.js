'use strict';

// Required Library
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var api = require('../utilities/api');
var logError = require('../utilities/logError');

// Flux
var Dispatcher = require('../dispatchers/appDispatcher');

// Data
var postlist = [];

// Store
var postlistStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.off('change', callback);
  },
  getPosts: function () {
    return postlist;
  }
});

// Watch
postlistStore.dispatchToken = Dispatcher.register(function (payload) {
  var actions = {
    getAllPosts: function (payload) {
      api.getPosts().then(function(data) {
        postlist = data;

        postlistStore.emit('change');
      }).catch(logError);
    }
  };

  actions[payload.action.type] && actions[payload.action.type](payload);
});

module.exports = postlistStore;


