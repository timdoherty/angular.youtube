/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var angular = require('angular');
  var controllers = require('./controllers');
  var utils = require('../common/utils');

  var controller = controllers.controller('YTCurrentCtrl', ['$scope', '$location', '$routeParams', '$http', function ($scope, $location, $routeParams, $http) {
      $scope.searchTerm = $scope.$parent.searchTerm || 'pat metheny';

//--Local functions-----------------------------------------------------------------------------------------------------
      function setCurrentVideo(response) {
        var data = response.data;
        var paths = data.entry.id.$t.split('/');
        console.log(data);
        $scope.currentVideo = data.entry;
        $scope.currentVideo.source = paths[paths.length-1];

        //TODO: get related videos...
        getRelatedVideos($scope.currentVideo);
        getComments($scope.currentVideo);
      }

      function getRelatedVideos(video) {
        var url = video.id.$t + '/related' + '?format=5&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setRelatedVideos);
      }

      function setRelatedVideos(response) {
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
        $scope.$$phase || $scope.$digest();
      }

      function getComments(video) {
        var url = video.gd$comments.gd$feedLink.href + '?format=5&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setComments);
      }

      function setComments(response) {
        $scope.comments = response.data.feed.entry;
        $scope.$$phase || $scope.$digest()
      }

//--$scope functions----------------------------------------------------------------------------------------------------
      $scope.searchRedirect = function () {
        $location.path('/' + $scope.searchTerm);
      };

      $scope.getByID = function (id) {
        var url = 'http://gdata.youtube.com/feeds/videos/' + id + '?format=5&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setCurrentVideo);
      };

      $scope.setCurrent = function(id) {
        $location.path('/video/' + id);
      };

      if ($routeParams.videoID) {
        console.log($routeParams.videoID);
        $scope.getByID($routeParams.videoID);
      }
    }]
  );
//  controller.$inject = ['$scope', '$location', '$routeParams', '$http'];
//  return controller;


});
