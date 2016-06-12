module.exports = function(){
	return function(data, contrary){
		var result = [];
	
		data.forEach(function(tile){
			if(tile.matched == contrary)
				result.push(tile);
		});

		return result; 
	}
}