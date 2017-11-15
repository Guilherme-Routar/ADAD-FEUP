
var httpRequest = require('./httpRequest.js');

var userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36';

var options = {
  host: 'api.github.com',
  path: '/users/Guilherme-Routar',
  method: 'GET',
  headers: {'user-agent': userAgent} 
}

httpRequest.httpResponse(options, function(response) {
  console.log('response = ' + response);
})