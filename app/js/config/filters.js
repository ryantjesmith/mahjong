module.exports = function(app) {

  app.filter('tileFilter', require('../filters/tileFilter'));
  app.filter('cut', require('../filters/wordCutFilter'));
  app.filter('MatchedFilter', require('../filters/matchedFilter'));
  app.filter('firstLetter', require('../filters/firstLetterFilter'));


}
