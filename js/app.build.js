({
  appDir: "../",
  baseUrl: "js",
  dir: "../build",
  paths: {
    'angular': '../lib/angular/angular',
    'text': '../lib/require/text'
  },
  shim: {
    'angular': {
      exports: 'angular'
    }
  },
  optimize: "uglify", //"uglify", "closure" (Java Only), "closure.keepLines" (Java Only), "none",
  skipDirOptimize: true,
  modules: [
    {
      name: "main",
      exclude: ['angular']
    }
  ]
})