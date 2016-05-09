var _ = require('underscore');

module.exports = function($timeout){
	return {
		GET: function(id, callBack){
			$timeout(function(){
				var games = [
					{id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
					{id: 3, title: "Rayman", players: [] },
					{id: 4, title: "Ryan", players: ["Tom", "Henk"] },
					{id: 5, title: "Tom", players: ["Tom", "Henk"] }
				];

				if(_.isFunction(id)){
					callBack = id; //First param is the callback
					return callBack(games);
				} 
				else{
					var result = _.findWhere(games, {id: id});
					return callBack(result);
					
				}

			}, 200);
		},
		PUT: function(game){
			//stub
		},
		POST: function(game){
			//stub
		},	
		DELETE: function(game){
			//fake

		}
	}
}