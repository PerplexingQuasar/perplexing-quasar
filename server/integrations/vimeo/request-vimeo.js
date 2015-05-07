"use strict";


// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));


// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


//==================== VIMEO AUTHENTICATION ================================
//==========================================================================

var Vimeo = require('./module-vimeo').Vimeo;

var clientId = process.env.VIMEO_client_id;
var clientSecret = process.env.VIMEO_client_secret
var accessToken = process.env.VIMEO_access_token;

// console.log('Vimeo', Vimeo);


var lib = new Vimeo(clientId, clientSecret);

// =============== GENERATE TOKEN =====================
// ====================================================

// Generate a new token if the token was not found

if (accessToken) {
    lib.access_token = accessToken;
    // makeRequest(lib);
} else {
    // Unauthenticated api requests must request an access token. You should not request a new 
    // access token for each request, you should request an access token once and use it over 
    // and over.
    lib.generateClientCredentials('public', function (err, access_token) {
        if (err) {
            throw err;
        }

        // Assign the access token to the library
        lib.access_token = access_token.access_token;
        // makeRequest(lib);
    });
}

// =====================================================

// MAKING REQUEST

/* request OBJ VIMEO => pass to 
    lib.request(obj, function (error, body, status_code, headers) {
        if (error) {
            console.log('error');
            console.log(error);
        } else {
            response.send(body);
        }
    });


 var obj = { path : '/channels/staffpicks/videos',
            query : { page : 2, per_page : 10 }
           }
*/

module.exports = lib;

// app.get('/', function(request, response) {
// 	lib.request(/*options*/{
// 	        // This is the path for the videos contained within the staff picks channels
// 	        path : '/channels/staffpicks/videos',
// 	        // This adds the parameters to request page two, and 10 items per page
// 	        query : {
// 	            page : 2,
// 	            per_page : 10
// 	        }
// 	    }, /*callback*/function (error, body, status_code, headers) {
// 	        if (error) {
// 	            console.log('error');
// 	            console.log(error);
// 	        } else {
// 	            response.send(body);
// 	        }

// 	        console.log('status code');
// 	        console.log(status_code);
// 	        console.log('headers');
// 	        console.log(headers);
// 	    });
// });



