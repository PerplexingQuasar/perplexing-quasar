// ROUTE ==> http://localhost:port/api/vimeo

var express = require('express');
var router  = express.Router();
var utils   = require('../helpers/utils');
var vimeoHeader  = require('../integrations/integration-headers').vimeo; 


/* GET home page. */
router.get('/', function(req, res, next) {
  
  // invoke the createJSON function to return the data to the client (data, target)
  var data = utils.createJSON(vimeoHeader, 'vimeo');
  // res.status(200).json({results: data});
});

module.exports = router;
