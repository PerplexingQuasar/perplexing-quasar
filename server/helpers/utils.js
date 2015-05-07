var Promise = require("bluebird");
var Vimeo   = require("../integrations/vimeo/requestVimeo"); 

exports.makeRequest = function(cb){
	// make the request
	Vimeo.request(/*options*/{
	        // This is the path for the videos contained within the staff picks channels
	        path : '/channels/staffpicks/videos',
	        // This adds the parameters to request page two, and 10 items per page
	        query : {
	            page : 2,
	            per_page : 10
	        }
	    }, /*callback*/function (error, body, status_code, headers) {
	        if (error) {
	            console.log('error');
	            console.log(error);
	        } else {
	            cb(body);
	        }

	        console.log('status code');
	        console.log(status_code);
	        console.log('headers');
	        console.log(headers);
    });

}

exports.createJSON = function(header, target){

	var prom = new Promise(function(resolve, reject) {

		exports.makeRequest(function(response){
		 	if (true) {
		    	resolve(response);
		 	} else {
		   	    reject('nooooo');
		 	}
		});
	});
	 
	prom.then(function(data) {
	        console.log(data);
	    })
	    .catch(function(e) {
	        console.log('error: ' + e);
	    });
}