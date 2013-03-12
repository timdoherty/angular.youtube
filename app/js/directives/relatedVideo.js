/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var angular = require('angular');
  var directives = require('./directives');
  var template = require('text!../../templates/relatedVideo.html');

  var directive = directives.directive('relatedVideo', function () {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      template: template
    };
  });

  return directive;
});
