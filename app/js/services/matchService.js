module.exports = function ($timeout) {

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

              //checkCards
              if(matchService.checkIdentical(self.matchingTiles)){
                if(matchService.checkPosition(self.matchingTiles)){
                    var tiles = {tile1Id: self.matchingTiles[0]._id, tile2Id: self.matchingTiles[1]._id};
                    self.matchingTiles = [];
                    return tiles;
                }
                else{
                  matchService.popupMessage("There is a card in the way!");
                  self.matchingTiles = [];
                  $timeout(function() {
                    matchService.removeSelected();
                  }, 100);
                  
                }
              }
              else{
                matchService.popupMessage("These stones don't match!");
                self.matchingTiles = [];
                $timeout(function() {
                    matchService.removeSelected();
                }, 100);
              }
          }
      },

      setMatch: function(tiles, user){
          $(".gameboard_tile_wrapper .divTile").each(function( index ) {
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
          if((tiles[0].tile.suit == "Season" && tiles[1].tile.suit == "Season") || (tiles[0].tile.suit == "Flower" && tiles[1].tile.suit == "Flower")){
            return true;
          }
          else if((tiles[0].tile.suit == tiles[1].tile.suit) && (tiles[0].tile.name == tiles[1].tile.name)){
            return true;
          }
          return false;
      },

      //checks position by checking if tiles next to the selected tiles are filled
      checkPosition: function(tiles){
        var tile1_collide = 0;
        var tile2_collide = 0;
        var tile_covered = false;

        $( ".gameboard_tile_wrapper .divTile" ).each(function( index ) {
            var element = $(this);
            var xPos = parseInt(element.attr('xPos'));
            var yPos = parseInt(element.attr('yPos'));
            var zPos = parseInt(element.attr('zPos'));

            tile1_collide += checkPos(tiles[0]);
            tile2_collide += checkPos(tiles[1]);

            function checkPos(tile){
              
              if((tile.xPos - 2) == xPos){
                if(tile.yPos == yPos || tile.yPos == yPos - 1 || tile.yPos == yPos + 1){
                  if(tile.zPos == zPos){
                    //steen links
                    return 1;
                  }
                }
              }
              
              if((tile.xPos + 2) == xPos){
                if(tile.yPos == yPos || tile.yPos == yPos - 1 || tile.yPos == yPos + 1){
                  if(tile.zPos == zPos){
                    //steen rechts
                    return 1;
                  }
                }
              }
              return 0;
            }
        });
        console.log(tiles[1]);
        console.log(tile1_collide);
        console.log(tile2_collide);
        if(tile1_collide < 2 && tile2_collide < 2 && tile_covered == false){
          return true;
        }

        return false;
      },

      removeSelected: function(){
        $(".gameboard_tile_wrapper .divTile").each(function( index ) {
            var element = $(this);

            element.removeClass('divTileSelected');

        });
      },

      emptyTileSelected: function(){
        self.matchingTiles = [];
      },

      popupMessage: function(message){
          $('.popup_message').empty();
          $('.popup_message').append(message);
          $(".popup_message").addClass("flash_popup");
          $timeout(function(){
              $(".popup_message").removeClass("flash_popup");
              $('.popup_message').empty();
          }, 3000);
      }
  }

  


}
