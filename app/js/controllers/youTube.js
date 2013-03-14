/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var angular = require('angular');
  var controllers = require('./controllers');
  var utils = require('../common/utils');

  //local variables

  var controller = controllers.controller('YouTubeCtrl', function ($scope, $location, $routeParams, $http) {
      $scope.searchTerm = 'pat metheny';
      $scope.startIndex = 1;
      $scope.totalItems = 0;
      $scope.pageSize = 20;
      $scope.currentPage = 1;

//--Local functions-----------------------------------------------------------------------------------------------------
      function setVideos(response) {
        var data = response.data;
        var entries = data.feed.entry;
        var i = entries.length;
        var entry;
        var paths;

        while (i--) {
          entry = entries[i];
          paths = entry.id.$t.split('/');
          entry.source = paths[paths.length-1];
          entry.duration = utils.getDuration(entry.media$group.yt$duration.seconds);
        }

        $scope.videos = entries;
        $scope.currentVideo = entries[0];
        $scope.totalItems = data.feed.openSearch$totalResults.$t;
        $scope.currentPage = parseInt($scope.startIndex / $scope.pageSize) + 1;
        $scope.$$phase || $scope.$digest();
      }

//--$scope functions----------------------------------------------------------------------------------------------------
      $scope.search = function () {
        $scope.$parent.searchTerm = $scope.searchTerm;
        var url =  'http://gdata.youtube.com/feeds/videos?vq=' + $scope.searchTerm + '&format=5&max-results=20&start-index=' + $scope.startIndex + '&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setVideos);
      };

      $scope.page = function (start) {
        $scope.startIndex = start;
        $scope.search();
      };

      if ($routeParams.searchTerm) {
        $scope.$parent.searchTerm = $scope.searchTerm = $routeParams.searchTerm;
      }
      $scope.search();
    }
  );
  controller.$inject = ['$scope', '$location', '$routeParams', '$http'];
  return controller;

});
