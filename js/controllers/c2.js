/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  var controllers = require('./controllers');

  //module dependencies
  var angular = require('angular');

  var controller = controllers.controller('myCtrl2', [
  '$scope', function ($scope) {

    }
  ]);

  return controller;

});


  //module dependencies
//  var angular = require('angular');
//  function MyCtrl2() {}
//  MyCtrl2.$inject = [];
//  return MyCtrl2;
