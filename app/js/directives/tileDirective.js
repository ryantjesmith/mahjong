module.exports = function($filter){

    return {
        restrict: 'AE',
        replace: 'true',
        transclude: true,
        scope: {
            tileModel: '=',
            //bindAttr: '='
        },
        templateUrl: "/js/templates/tile.html",
        link: function(scope, element, attributes){
            element.css('left', '' + scope.tileModel.xPos * 22);
            element.css('top', '' + scope.tileModel.yPos * 32);
            element.css('z-index', '' + scope.tileModel.zPos);

            var myFilter = $filter('tileFilter');
            element.css('background-position-y', '' + myFilter(scope.tileModel.tile.suit, scope.tileModel.tile.name));
        }
    };
}
