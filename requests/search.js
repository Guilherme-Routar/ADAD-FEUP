/**
 * Repositories search request
 * In this section we download every repository with a size >= 100000 kb (100 Mb)
 * 348,019 repositories satisfy the query
 */

 /**
  * Query the API inbetween ranges and go through pages
  */

var httpRequest = require('./httpRequest.js');

var userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36';

var options = {
  host: 'api.github.com',
  path: '/search/repositories?q=size:>100000&page',
  method: 'GET',
  headers: {'user-agent': userAgent} 
}

httpRequest.httpResponse(options, function(response) {
  console.log('response = ' + response);
})