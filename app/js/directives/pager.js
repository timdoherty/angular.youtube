/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var angular = require('angular');
  var directives = require('./directives');
  var template = require('text!../../templates/pager.html');

  var directive = directives.directive('pager', function () {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      template: template

    };
  });

  return directive;
});
