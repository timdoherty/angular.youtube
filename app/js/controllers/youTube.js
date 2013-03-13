/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var $ = require('jquery');
  var angular = require('angular');
  var controllers = require('./controllers');
  var _ = require('underscore');

  //local variables

  var controller = controllers.controller('YouTubeCtrl', function ($scope, $location, $routeParams, $http) {
      $scope.searchTerm = 'pat metheny';
      $scope.startIndex = 1;
      $scope.totalItems = 0;
      $scope.pageSize = 20;
      $scope.currentPage = 1;

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

      function setVideos(response) {
        var data = response.data;
        var entries = data.feed.entry;
        $.each(entries, function(index, value) {
          var paths = value.id.$t.split('/');

          value.source = paths[paths.length-1];

          //durations
        });
        $scope.videos = entries;
        $scope.currentVideo = entries[0];
        $scope.totalItems = data.feed.openSearch$totalResults.$t;
        $scope.currentPage = parseInt($scope.startIndex / $scope.pageSize) + 1;
        $scope.$$phase || $scope.$digest();
      }

      function getRelatedVideos(video) {
        var url = video.id.$t + '/related' + '?format=5&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setRelatedVideos);
      }

      function setRelatedVideos(response) {
        var data = response.data;
        var entries = data.feed.entry;
        $.each(entries, function(index, value) {
          var paths = value.id.$t.split('/');
          var seconds = value.media$group.yt$duration.seconds;
          var minutes;
          value.source = paths[paths.length-1];

          minutes = parseInt(seconds / 60);
          seconds = '' + (seconds % 60);
          if (seconds.length === 1) { seconds = '0' + seconds; }
          value.duration = minutes + ':' + seconds;

        });
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
      $scope.search = function () {
        var url =  'http://gdata.youtube.com/feeds/videos?vq=' + $scope.searchTerm + '&format=5&max-results=20&start-index=' + $scope.startIndex + '&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setVideos);
      };

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

      $scope.findByID = function (id) {
        var video = _.find($scope.videos, function(val) {
          return val.source === id;
        });
        return video;
      };

      $scope.page = function (start) {
        $scope.startIndex = start;
        $scope.search();
      };

      if ($routeParams.videoID) {
        console.log($routeParams.videoID);
        $scope.getByID($routeParams.videoID);
      } else {
        if ($routeParams.searchTerm)
        {
          $scope.searchTerm = $routeParams.searchTerm;
        }
        $scope.search();
     }
    }
  );
  controller.$inject = ['$scope', '$location', '$routeParams', '$http'];
  return controller;


});
