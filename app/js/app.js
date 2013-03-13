'use strict';

define(function (require) {

  var angular = require('angular');
  var controllers = require('./controllers/controllers');
  var filters = require('./filters/filters');
  var services = require('./services/services');
  var directives = require('./directives/directives');
  var youTubeCtrl = require('./controllers/youTube');
  require('./directives/appVersion');
  require('./directives/searchResult');
  require('./directives/relatedVideo');
  require('./directives/pager');
  require('./directives/comment');
  require('./directives/keyPress');

// Declare app level module which depends on filters, and services
  var m = angular.module('myApp', ['controllers', 'filters', 'services', 'directives']);
  m.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/search.html', controller: 'YouTubeCtrl'});
    $routeProvider.when('/:searchTerm', {templateUrl: 'partials/search.html', controller: 'YouTubeCtrl'});
    $routeProvider.when('/video/:videoID', {templateUrl: 'partials/player.html', controller: 'YouTubeCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

  return m;
});
