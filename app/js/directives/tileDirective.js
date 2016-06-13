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

                            MatchService.setMatch(matchingTiles, result.data[0].match.foundBy);

                        },
                        onError: function(err){
                            MatchService.removeSelected();
                        }
                    })

                }

                $(".gameboard_tile_wrapper .divTile").each(function( index ) {
                    var element = $(this);
                    var id = element.attr('tileId');

                    if(tile._id == id){
                        element.addClass('divTileSelected');
                    }
                });

            }

        },
        link: function(scope, element, attributes){
            var myFilter = $filter('tileFilter');
            element.css('background-position-y', '' + myFilter(scope.tileModel.tile.suit, scope.tileModel.tile.name));

            if(scope.render == "inGame"){
                element.css('left', '' + scope.tileModel.xPos * 25);
                element.css('top', '' + scope.tileModel.yPos * 34.5);
                element.css('z-index', '' + scope.tileModel.zPos);
                if(scope.tileModel.zPos == 0){
                    element.css('box-shadow', 'none !important');
                }
                else if(scope.tileModel.zPos == 1){
                    element.css('box-shadow', '#4a4a4a 5px 5px 10px 0px');
                }
                else if(scope.tileModel.zPos == 2){
                    element.css('box-shadow', '#4a4a4a 10px 10px 20px 2px');
                }
                else if(scope.tileModel.zPos == 3){
                    element.css('box-shadow', '#4a4a4a 15px 15px 25px 5px');
                }
                else if(scope.tileModel.zPos == 4){
                    element.css('box-shadow', '#4a4a4a 15px 15px 25px 5px');
                }
            }
            else if(scope.render == "matched"){
                element.css('float', 'left');
                element.css('position', 'relative');
            }

        }
    };
}
