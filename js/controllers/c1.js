/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  var controllers = require('./controllers');

  //module dependencies
  var angular = require('angular');

  var controller = controllers.controller('myCtrl1', [
  '$scope', function ($scope) {

    }
  ]);

  return controller;

//  function MyCtrl1() {}
//  MyCtrl1.$inject = [];
//  return MyCtrl1;
});
