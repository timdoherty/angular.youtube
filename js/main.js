require(
  {
    baseUrl: '',
    paths: {
      'jquery': 'lib/jquery/jquery.min',
      'angular': 'lib/angular/angular',
      'text': 'lib/require/text',
      'underscore': 'lib/underscore/underscore-min'
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
      'underscore': {
        exports: '_'
      }
    }
  },
  [
    'angular',
    'js/app'//,
//    'angular-ui'
  ],
  function (angular, app) {
    angular.bootstrap(document, [app['name']]);
  }
);