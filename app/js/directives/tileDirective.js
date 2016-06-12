module.exports = function($filter){

    return {
        restrict: 'AE',
        replace: 'true',
        //transclude: false,
        scope: {
            tileModel: '=',
            render: '@',
            //bindAttr: '='
        },
        templateUrl: "/js/templates/tile.html",
        controller: function($scope, MatchService, GameService, $stateParams){

            $scope.tileClick = function(tile){
                var matchingTiles = MatchService.checkMatch(tile);

                if(matchingTiles != null){

                    GameService.checkMatchedTiles(MatchService.currentGame._id, matchingTiles, {
                        onSuccess: function(result){

                            console.log(result);

                            $( ".divTile" ).each(function( index ) {
                                var element = $(this);
                                var id = element.attr('tileId');
                                if(id == matchingTiles.tile1Id || id == matchingTiles.tile2Id){
                                    console.log("MATCHED ------------------------------------------------");

                                    element.css('float', 'left');
                                    element.css('position', 'relative');
                                    element.css('top', 'auto');
                                    element.css('left', 'auto');

                                    //detach is remove but keeps the element in the memory so i can add it to another container in the next couple of lines
                                    element.detach();

                                    var name = result.data[0].match.foundBy;


                                    
                                    var className = name.substring(0,5);
                                    console.log(className);

                                    var player_matchedTiles = document.getElementById(className);
                                    console.log(player_matchedTiles);

                                    
                                    if(player_matchedTiles !== null){
                                        player_matchedTiles.appendChild( element.get(0) ); 
                                    }
                                    else{
                                        $('.matchedTiles_container .scroll_container').appendChild("<div class='player_container' id="+className+"><span class='playerName'>"+name+"</span>"+element.get(0)+"<div style='clear:both'></div></div>");
                                    }

                                    
                                    
                                }
                            });
                        },
                        onError: function(err){
                            console.log(err);
                        }
                    })

                }

            }
            
        },
        link: function(scope, element, attributes){
            var myFilter = $filter('tileFilter');
            element.css('background-position-y', '' + myFilter(scope.tileModel.tile.suit, scope.tileModel.tile.name));

            if(scope.render == "inGame"){
                element.css('left', '' + scope.tileModel.xPos * 25);
                element.css('top', '' + scope.tileModel.yPos * 34.5);
                element.css('z-index', '' + scope.tileModel.zPos);
            }
            else if(scope.render == "matched"){
                element.css('float', 'left');
                element.css('position', 'relative');
            }
            
        }
    };
}
