// ROUTE ==> http://localhost:port/api/vimeo

var express = require('express');
var router  = express.Router();
var utils   = require('../helpers/utils');
var vimeoHeader  = require('../integrations/integration-headers').vimeo;
// Bring the DB Model
var RequestApi = require('../models/model.js');

// Update the DB



/* GET home page. */
router.get('/', function(req, res, next) {
  
  // Fetch the database to serve the last JSON requested for the Vimeo API to the client
  RequestApi.findOne({}, function(err, data){
  	if (err) {
  		console.log('Failed fetching the database');
  		res.status(500).json( {error: 'Failed fetching the database'} );
  	} else {
  		if (data === null) {
  			utils.createJSON(req, res, vimeoHeader, 'vimeo');
  			res.status(200).json( {message: 'The server is been updated. Try again in few minutes'} );
 		} else {
	  		var parsedData = JSON.parse(data.data);
	  		res.status(200).json( {results: parsedData} );	
 		}
  	}
  });

  // invoke the createJSON function to return the data to the client (data, target)
  // var data = utils.createJSON(req, res, vimeoHeader, 'vimeo');
  // res.status(200).json({results: data});
});

module.exports = router;
