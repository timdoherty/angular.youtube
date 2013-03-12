/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var angular = require('angular');
  var directives = require('./directives');
  var template = require('text!../../templates/searchResult.html');

  var directive = directives.directive('searchResult', function () {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      template: template

    };
  });

  return directive;
});
