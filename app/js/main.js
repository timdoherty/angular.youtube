require(
  {
    baseUrl: '',
    paths: {
      'jquery': 'lib/jquery/jquery.min',
      'angular': 'lib/angular/angular'
    },
    shim: {
      'angular': {
        exports: 'angular'
      }
    }
  },
  [
    'angular',
    'js/app'
  ],
  function (angular, app) {
    angular.bootstrap(document, [app['name']]);
  }
);