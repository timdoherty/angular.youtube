/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var $ = require('jquery');
  var angular = require('angular');
  var controllers = require('./controllers');

  //local variables

  var query = 'vai';
  var controller = controllers.controller('YouTubeCtrl', function ($scope) {
      $scope.searchTerm = 'vai';

      var playlistURL = function () {
        return 'http://gdata.youtube.com/feeds/videos?vq=' + $scope.searchTerm + '&format=5&max-results=20&alt=json-in-script&callback=?';
      };

      $scope.search = function () {
        $.getJSON(playlistURL()).then(function(data) {
          var entries = data.feed.entry;
          $.each(entries, function(index, value) {
            var paths = value.id.$t.split('/');
            value.source = paths[paths.length-1];
          });
          $scope.videos = entries;
          $scope.currentVideo = entries[0];
          $scope.$digest();
        });
      };

      $scope.search();
    }
  );
  controller.$inject = ['$scope'];
  return controller;


});
