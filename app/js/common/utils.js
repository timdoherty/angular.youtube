/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  return {
    getDuration: function (seconds) {
      minutes = parseInt(seconds / 60);
      seconds = '' + (seconds % 60);
      if (seconds.length === 1) { seconds = '0' + seconds; }
      return minutes + ':' + seconds;
    }
  }
});
