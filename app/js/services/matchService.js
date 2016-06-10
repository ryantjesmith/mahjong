module.exports = function () {

  var matchService = {};
  var self = this;
  
  self.matchingTiles = [];

  return matchService = {
      checkMatch: function(tile){
          
          if(self.matchingTiles.length == 0){
            self.matchingTiles.tile1Id = tile._id;
            return null;
          }
          else{
            console.log("hhj");
            self.matchingTiles.tile2Id = tile._id;
            return matchingTiles;
          }
      }
  }
}
