/**
 * HTTP Request Template
 */

var https = require('https');

//http request
module.exports.httpResponse = function (options, callback) {

    var str = '';
    var request = https.request(options, function (response) {
        console.log('options = ' + options.path);
        response.on('data', function (body) {
            str += body;
        });
        response.on('end', function () {
            return callback(str);
        });
    });

    request.on('error', (e) => {
        console.log(e);
    });
    request.end();
}