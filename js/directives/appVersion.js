define(function (require) {
'use strict';

  var angular = require('angular');
  var directives = require('./directives');
  var version = require('../services/version');
/* Directives */

  var directive = directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  return directive;


});

/* Directives */


//angular.module('myApp.directives', []).
//  directive('appVersion', ['version', function(version) {
//    return function(scope, elm, attrs) {
//      elm.text(version);
//    };
//  }]);
