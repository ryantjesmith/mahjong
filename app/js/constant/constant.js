module.exports = function (app) {
  app.constant('API', {
    url: "http://mahjongmayhem.herokuapp.com/",
    games: 'Games',
    gameTemplates: 'GameTemplates',
    tiles: 'Tiles',
    matches: 'matches',
    test: "This is a test from a constant module outside of the app.js"
  })
}