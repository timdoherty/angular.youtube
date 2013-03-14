require(
  {
    paths: {
      'angular': '../lib/angular/angular',
      'text': '../lib/require/text'
    },
    shim: {
      'angular': {
        exports: 'angular'
      }
    }
  },
  [
    'angular',
    'app'
  ],
  function (angular, app) {
    angular.bootstrap(document, [app['name']]);
  }
);