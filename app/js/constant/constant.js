module.exports = function (app) {
  app.constant('API', {
    games: 'http://mahjongmayhem.herokuapp.com/Games',
    gameTemplates: 'http://mahjongmayhem.herokuapp.com/GameTemplates',
    tiles: 'http://mahjongmayhem.herokuapp.com/Tiles',
    matches: 'http://mahjongmayhem.herokuapp.com/matches'
  })
}