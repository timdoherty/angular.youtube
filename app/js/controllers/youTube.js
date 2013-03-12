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

  var query = 'vai';
  var controller = controllers.controller('YouTubeCtrl', function ($scope, $location, $routeParams, $http) {
      $scope.searchTerm = 'pat metheny';

      var playlistURL = function () {
        return 'http://gdata.youtube.com/feeds/videos?vq=' + $scope.searchTerm + '&format=5&max-results=20&alt=json-in-script&callback=?';
      };

//--Local functions-----------------------------------------------------------------------------------------------------
      function setCurrentVideo(response) {
        var data = response.data;
        var paths = data.entry.id.$t.split('/');
        console.log(data);
        $scope.currentVideo = data.entry;
        $scope.currentVideo.source = paths[paths.length-1];
      }

      function setVideos(response) {
        var data = response.data;
        var entries = data.feed.entry;
        $.each(entries, function(index, value) {
          var paths = value.id.$t.split('/');
          value.source = paths[paths.length-1];
        });
        $scope.videos = entries;
        $scope.currentVideo = entries[0];
        $scope.$digest();
      }

//--$scope functions----------------------------------------------------------------------------------------------------
      $scope.search = function () {
        var url =  'http://gdata.youtube.com/feeds/videos?vq=' + $scope.searchTerm + '&format=5&max-results=20&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setVideos);
//        $.getJSON(playlistURL()).then(function(data) {
//          var entries = data.feed.entry;
//          $.each(entries, function(index, value) {
//            var paths = value.id.$t.split('/');
//            value.source = paths[paths.length-1];
//          });
//          $scope.videos = entries;
//          $scope.currentVideo = entries[0];
//          $scope.$digest();
//        });
      };

      $scope.getByID = function (id) {
        var url = 'http://gdata.youtube.com/feeds/videos/' + id + '?format=5&alt=json-in-script&callback=JSON_CALLBACK';
        $http.jsonp(url)
          .then(setCurrentVideo);
//            .success(function(data){
//              var paths = data.entry.id.$t.split('/');
//              console.log(data);
//              $scope.currentVideo = data.entry;
//              $scope.currentVideo.source = paths[paths.length-1];
//            });
      };

      $scope.setCurrent = function(id) {
//        $scope.currentVideo = $scope.videos[2];
        $location.path('/' + id);
//        $scope.apply();

      };

      $scope.findByID = function (id) {
        var video = _.find($scope.videos, function(val) {
          return val.source === id;
        });
        return video;
      };

      if ($routeParams.videoID) {
        console.log($routeParams.videoID);
        $scope.getByID($routeParams.videoID);
//        $scope.currentVideo = $scope.findByID($routeParams.videoID);

      } else {
        $scope.search();
      }
    }
  );
  controller.$inject = ['$scope', '$location', '$routeParams', '$http'];
  return controller;


});
