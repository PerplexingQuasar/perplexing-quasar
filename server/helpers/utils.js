var Promise = require("bluebird");

exports.makeRequest = function(value, cb){
	// make the request
	cb();

}

// exports.allRequests = function(){

// }

exports.createJSON = function(header, target){
	var results = [];
	// For each item in header make a request to target
	// for (var i = 0; i < header.length; i++) {
	// 	// make a request for each category and save a 
	// 	results[i] = exports.makeRequest(header[i]);
	// 	// filter the request
	// 	// send to the results object
	// }

	var prom = new Promise(function(resolve, reject) {

		exports.makeRequest(null, function(){
		 	if (true) {
		    	resolve('workinggggg Blue Bird');
		 	} else {
		   	    reject('nooooo');
		 	}
		});
	});
	 
	prom.then(function(data) {
		// After the data comes from vimeo
	        console.log(data);
	    })
	    .catch(function(e) {
	        console.log('error: ' + e);
	    });
}