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

              matchService.removeSelected();

              return null;
          }
          else{
              self.matchingTiles.push(tile);

              //test
              console.log(self.matchingTiles);

              //checkCards
              if(matchService.checkIdentical(self.matchingTiles)){
                if(matchService.checkPosition(self.matchingTiles)){
                    console.log(matchService.checkPosition(self.matchingTiles));
                    console.log("SEND TILES");
                    var tiles = {tile1Id: self.matchingTiles[0]._id, tile2Id: self.matchingTiles[1]._id};
                    self.matchingTiles = [];
                    return tiles;
                }
                else{
                  console.log("Postiton is not good");
                  self.matchingTiles = [];
                }
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

                  element.css({
                    'float': 'left',
                    'position': 'relative',
                    'top': 'auto',
                    'left': 'auto',
                    'box-shadow': 'none !important'
                  });

                  //detach is remove but keeps the element in the memory so i can add it to another container in the next couple of lines
                  element.detach();

                  var className = user.substring(0,5);

                  var player_matchedTiles = document.getElementById(className);

                  
                  if(player_matchedTiles !== null){
                      player_matchedTiles.appendChild( element.get(0) ); 
                  }
                  else{
                      $("#scroll_container").append("<div class='player_container' id="+className+"><span class='playerName'>"+user+"</span></div>");
                      document.getElementById(className).appendChild( element.get(0) ); 
                  }
              }
          });
      },

      checkIdentical: function(tiles){
          console.log("TILES");
          console.log(tiles);
          if((tiles[0].tile.suit == "Season" && tiles[1].tile.suit == "Season") || (tiles[0].tile.suit == "Flower" && tiles[1].tile.suit == "Flower")){
            return true;
          }
          else if((tiles[0].tile.suit == tiles[1].tile.suit) && (tiles[0].tile.name == tiles[1].tile.name)){
            return true;
          }
          return false;
      },

      checkPosition: function(tiles){
        var tile1_collide = 0;
        var tile2_collide = 0;

        $( ".divTile" ).each(function( index ) {
            var element = $(this);
            var xPos = parseInt(element.attr('xPos'));
            var yPos = parseInt(element.attr('yPos'));
            var zPos = parseInt(element.attr('zPos'));

            tile1_collide += checkPos(tiles[0]);
            tile2_collide += checkPos(tiles[1]);

            function checkPos(tile){
              // if((tile.yPos == yPos || tile.yPos == yPos - 1 || tile.yPos == yPos + 1) 
              //   &&(tile.xPos == xPos || tile.xPos == xPos - 1 || tile.xPos == xPos + 1)
              //   &&(tile.zPos < zPos)){
              //   debugger;
              //   console.log("Er ligt een steen boven");
              //   correct = false;
              // }
              
              if((tile.xPos - 2) == xPos){
                if(tile.yPos == yPos || tile.yPos == yPos - 1 || tile.yPos == yPos + 1){
                  if(tile.zPos == zPos){
                    console.log("Er ligt een steen links");
                    return 1;
                  }
                }
              }
              
              if((tile.xPos + 2) == xPos){
                if(tile.yPos == yPos || tile.yPos == yPos - 1 || tile.yPos == yPos + 1){
                  if(tile.zPos == zPos){
                    console.log("Er ligt een steen rechts");
                    return 1;
                  }
                }
              }
              return 0;
            }
        });
        console.log(tile1_collide);
        console.log(tile2_collide);
        if(tile1_collide < 2 && tile2_collide < 2){
          return true;
        }

        return false;
      },

      removeSelected: function(){
        $( ".divTile" ).each(function( index ) {
            var element = $(this);

            element.removeClass('divTileSelected');

        });
      }
  }

  


}
