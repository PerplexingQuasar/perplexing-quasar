var Promise = require("bluebird");
var Vimeo   = require("../integrations/vimeo/request-vimeo"); 
var filter  = require("../integrations/vimeo/filter-vimeo");

exports.makeRequest = function(cb, category){
	// make the request
	Vimeo.request(/*options*/{
	        // This is the path for the videos contained within the staff picks channels
	        path : '/categories/' + category + '/videos',
	        // This adds the parameters to request page two, and 10 items per page
	        query : {
	            page : 1,
	            per_page : 20
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

exports.createJSON = function(req, res, header, target){

	var prom = new Promise(function(resolve, reject) {

		exports.makeRequest(function(response){
		 	if (true) {
		    	resolve(response);
		 	} else {
		   	    reject('nooooo');
		 	}
		}, header[0]);
	});
	 
	prom.then(function(data) {
			// Filter the data returned from the server.
	        

	        var dataFiltered = filter(data);
	        res.status(200).json({ length: dataFiltered.length, results: dataFiltered});
	    })
	    .catch(function(e) {
	        console.log('error: ' + e);
	    });
}