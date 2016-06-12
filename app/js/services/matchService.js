module.exports = function () {

  var matchService = {};
  var self = this;
  
  self.matchingTiles = [];
  self.currentGame;

  return matchService = {
      checkMatch: function(tile){

          if(tile.match !== undefined){
            return null;
          }

          if(self.matchingTiles.length == 0){
              self.matchingTiles.push(tile);
              return null;
          }
          else{
            console.log(self.matchingTiles);
              self.matchingTiles.push(tile);

              //checkCards
              if(checkIdentical(self.matchingTiles)){
                var tiles = {tile1Id: self.matchingTiles[0]._id, tile2Id: self.matchingTiles[1]._id};
                self.matchingTiles = [];
                return tiles;
              }
              else{
                console.log("kaarten komen niet overeen");
                self.matchingTiles = [];
              }
          }
      }
  }

  function checkIdentical(tiles){
    if((tiles[0].tile.suit == tiles[1].tile.suit) && (tiles[0].tile.name == tiles[1].tile.name)){
      return true;
    }
    return false;
  }  
}

