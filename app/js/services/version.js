define(function (require) {

  //module dependencies
  var angular = require('angular');
  var services = require('./services');

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//  var angular = require('angular');
//  var app = require('./app');


  services.value('version', '0.1');

  //return m;
});
