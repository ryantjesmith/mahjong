module.exports = function(app) {

  app.filter('tileFilter', require('../filters/tileFilter'));
  app.filter('cut', require('../filters/wordCutFilter'));

}
