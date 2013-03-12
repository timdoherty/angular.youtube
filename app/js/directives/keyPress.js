define(function (require) {
'use strict';

  var angular = require('angular');
  var directives = require('./directives');

  var directive = directives.directive('ngEnter', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr, ctrl) {
        elem.bind('keypress', function(e){
          if (e.keyCode === 13) {
            scope.$apply(function(s) {
              s.$eval(attr.ngEnter);
            });
          }
        });
      }
    };
  });

  return directive;

});
