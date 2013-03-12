require(
  {
    baseUrl: '',
    paths: {
      'jquery': 'lib/jquery/jquery.min',
      'angular': 'lib/angular/angular',
      'text': 'lib/require/text'
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