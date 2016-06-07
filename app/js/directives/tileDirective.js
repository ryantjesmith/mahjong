module.exports = function(){

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
            element.css('left', '' + scope.tileModel.xPos * 27);
            element.css('top', '' + scope.tileModel.yPos * 27);
            element.css('z-index', '' + scope.tileModel.zPos);
        }
    };
};
