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

              $( ".divTile" ).each(function( index ) {
                  var element = $(this);

                  element.removeClass('divTileSelected');

              });

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
      },

      setMatch: function(tiles, user){
          $( ".divTile" ).each(function( index ) {
              var element = $(this);
              var id = element.attr('tileId');

              if(id == tiles.tile1Id || id == tiles.tile2Id){
                  console.log("MATCHED ------------------------------------------------");

                  element.css('float', 'left');
                  element.css('position', 'relative');
                  element.css('top', 'auto');
                  element.css('left', 'auto');

                  //detach is remove but keeps the element in the memory so i can add it to another container in the next couple of lines
                  element.detach();


                  var className = user.substring(0,5);

                  var player_matchedTiles = document.getElementById(className);

                  
                  if(player_matchedTiles !== null){
                      console.log("matched");
                      player_matchedTiles.appendChild( element.get(0) ); 
                  }
                  else{
                      console.log("new");

                      $("#scroll_container").append("<div class='player_container' id="+className+"><span class='playerName'>"+user+"</span></div>");
                      document.getElementById(className).appendChild( element.get(0) ); 
                  }
                  
              }
          });
      }
  }

  function checkIdentical(tiles){
    if((tiles[0].tile.suit == tiles[1].tile.suit) && (tiles[0].tile.name == tiles[1].tile.name)){
      return true;
    }
    return false;
  }
}
