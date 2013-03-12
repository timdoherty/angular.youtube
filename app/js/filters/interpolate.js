define(function (require) {
'use strict';

  var angular = require('angular');
  var filters = require('./filters');
  var version = require('../services/version');
/* Filters */

  var filter = filters.filter('interpolate', ['version', function(version) {
        return function(text) {
          return String(text).replace(/\%VERSION\%/mg, version);
        }
      }
  ]);

  return filter;
//angular.module('myApp.filters', []).
//  filter('interpolate', ['version', function(version) {
//    return function(text) {
//      return String(text).replace(/\%VERSION\%/mg, version);
//    }
//  }]);

});