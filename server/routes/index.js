// ROUTE ==> http://localhost:port/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({message: 'ClientApp will be displayed here'});
});

module.exports = router;
