module.exports = function ($http, API) {

  var gameService = {};

  return gameService = {
    // Get all games from the API
    getAllGames: function (options) {
      $http.get(API.games).then(
        options.onSuccess, options.onError
      )
    },
    getCurrentGame: function (id, options){
      $http.get(API.games + '/' + id).then(
        options.onSuccess, options.onError 
      )
    },
    // Get all gameTemplates
    getGameTemplates: function(options) {
      $http.get(API.gameTemplates).then(
        options.onSuccess, options.onError
      )
    },
    // Create a game.
    createGame: function (gameParameters, options) {
      $http.post(API.games, gameParameters).then(
        options.onSuccess, options.onError
      )
    },
    // Join a game
    joinGame: function (id, options) {
      $http.post(API.games + '/' + id + '/Players').then(
        options.onSuccess, options.onError
      )
    },
    // start a game
    startGame: function (id, options) {
      $http.post(API.games + '/' + id + '/Start').then(
        options.onSuccess, options.onError
      )
    },
    // Get players in a game
    getPlayers: function (id, options) {
      $http.get(API.games + '/' + id + '/Players').then(
        options.onSuccess, options.onError
      )
    },
    getGameTiles: function(id, options) {
      $http.get(API.games + '/' + id + '/Tiles').then(
        options.onSuccess, options.onError
      )
    },
    checkMatchedTiles: function(gameId, tiles, options) {
      $http.post(API.games + '/' + gameId + '/' + API.tiles + '/' + API.matches, tiles).then(
        options.onSuccess, options.onError
      );
    }
  }
}