var Promise = require("bluebird");
var Vimeo   = require("../integrations/vimeo/request-vimeo"); 
var filter  = require("../integrations/vimeo/filter-vimeo");
var RequestApi = require('../models/model.js');

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
	        // console.log('status code', status_code);
	        // console.log('headers', headers);
    });
}

exports.multipleRequests = function(categories, resultJSON, res){

  // Promisify the request function ========================= //
  var makeRequestAsync = Promise.promisify(exports.makeRequest);

  // Multiple Promisify requests ============================ //

  Promise.map(categories, function(gallery) {
      return makeRequestAsync(gallery)
              .then(function(data){
                var dataFiltered = filter(data);
                // increase the number of galleries (categories)
                resultJSON.total++;
                // set the new gallery into the header
                resultJSON.header.push({'name': gallery});
                // set the content for this gallery (category)
                resultJSON.content[gallery] = dataFiltered;
                // return the data (this data is not been used)
                return dataFiltered;
              })
              .catch(function(e){ console.log('error:', e); });
  }).then(function(dataArray) {
      // res.status(200).json({results: resultJSON});
      var dataString = JSON.stringify(resultJSON);
      
      // Create the new request model
      var newRequestApi = new RequestApi({
        data: dataString,
        api: 'Vimeo'
      });

      // Fetch the Database to check if there's any request stored
      RequestApi.findOne({}, function(err, result){
        if (err) {
          console.log('Failed to fecth the database');
        } else {
          
          // If the request doesn't exist
          if (result === null) {
            // Create the new request model
            var newRequestApi = new RequestApi({
              data: dataString,
              api: 'Vimeo'
            });

            // Save the new model into the DB
            newRequestApi.save(function(err, result){
              if (err) { 
                console.log('Failed to SAVE the request in the Database');
              } else {
                console.log('Request successfuly SAVED in the Database ');
              }
            });
          } 

          // If the request exists, just update with the new data
          else {
            // Update the data
            result.data = dataString;
            // Save it
            result.save(function(err, result){
              if (err) { 
                console.log('Failed to UPDATE the request in the Database');
              } else {
                console.log('Request successfuly UPDATED in the Database ');
              }
            })
          }

        }
      })

  }).catch(SyntaxError, function(e) {
     console.log("Invalid JSON in file " + e.fileName + ": " + e.message);
  });

  // ========================================================== //

}

exports.createJSON = function(req, res, categories, target){

  // The JSON Object to send to the client
  var resultJSON = {
    total: 0, 
    settings: {
      contentWidth: 295,
      contentHeight: 166 
    },
    header: [],
    content: {}
  };

  // Invoke all the requests
  exports.multipleRequests(categories, resultJSON, res); 

};

exports.updateRequest = function(){
  // setInterval(fun);
}