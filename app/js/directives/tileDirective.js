module.exports = function($filter){

    return {
        restrict: 'AE',
        replace: 'true',
        scope: {
            tileModel: '=',
            render: '@',
            //bindAttr: '='
        },
        templateUrl: "/js/templates/tile.html",
        controller: function($scope, $element){

        },
        link: function(scope, element, attributes){
            element.css('left', '' + scope.tileModel.xPos * 20);
            element.css('top', '' + scope.tileModel.yPos * 34.5);
            element.css('z-index', '' + scope.tileModel.zPos);

            var myFilter = $filter('tileFilter');
            element.css('background-position-y', '' + myFilter(scope.tileModel.tile.suit, scope.tileModel.tile.name));
        }
    };
}
