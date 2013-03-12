'use strict';

define(function (require) {

  var angular = require('angular');
  var controllers = require('./controllers/controllers');
  var filters = require('./filters/filters');
  var services = require('./services/services');
  var directives = require('./directives/directives');
  var MyCtrl1 = require('./controllers/c1');
  var MyCtrl2 = require('./controllers/c2');
  var youTubeCtrl = require('./controllers/youTube');
  require('./directives/appVersion');
  require('./directives/searchResult');
  require('./filters/interpolate');
  require('./services/version');

// Declare app level module which depends on filters, and services
  var m = angular.module('myApp', ['controllers', 'filters', 'services', 'directives']);
  m.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'myCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'myCtrl2'});
    $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'YouTubeCtrl'});

    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);

  return m;
});
