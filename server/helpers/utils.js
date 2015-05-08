var Promise = require("bluebird");
var Vimeo   = require("../integrations/vimeo/request-vimeo"); 
var filter  = require("../integrations/vimeo/filter-vimeo");

exports.makeRequest = function(category, callback){
	
	// Create the query to fetch the Vimeo API
	var queryObj = {
		path : '/categories/' + category + '/videos',
		query : { page : 1, per_page : 20 }
	}

	// Request the Vimeo API
	Vimeo.request(queryObj, function (error, body, status_code, headers) {
	        if (error) {
	            console.log('error', error);
	        } else {
	            callback(false, body);
	        }
	        console.log('status code', status_code);
	        console.log('headers', headers);
    });

	

}

exports.createJSON = function(req, res, header, target){

	// New version using Promisify ============================== //

	var makeRequestAsync = Promise.promisify(exports.makeRequest);

	makeRequestAsync(header[0])
		.then(function(data){
			var dataFiltered = filter(data);
			res.status(200).json({ length: dataFiltered.length, results: dataFiltered});
		})
		.catch(function(e){ console.log('error:', e); });

	// ========================================================== //

}