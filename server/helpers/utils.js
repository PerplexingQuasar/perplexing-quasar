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
  console.log('header', header);
	// New version using Promisify ============================== //

	var makeRequestAsync = Promise.promisify(exports.makeRequest);

  var categoryName = header[0];

  var resultJSON = {
    settings: {
      contentWidth: 295,
      contentHeight: 166 
    },

    header: [
      {name: categoryName}
    ],

    content: {
      'animation': []
    }
  } 

	makeRequestAsync(header[0])
		.then(function(data){
			var dataFiltered = filter(data);
      resultJSON.content['animation'].push(dataFiltered);

      console.log('resultJSON',resultJSON);
			res.status(200).json({ length: dataFiltered.length, results: resultJSON});
		})
		.catch(function(e){ console.log('error:', e); });

	// ========================================================== //

}