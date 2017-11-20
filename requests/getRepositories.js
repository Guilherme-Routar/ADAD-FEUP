/**
 * Repositories search request
 * In this section we download every repository with a size >= 100000 kb (100 Mb)
 * 348,019 repositories satisfy the query
 */

 /**
  * Query the API inbetween ranges and go through pages
  */

  /**
   * Mb 
   * 100 001 - 100 200 : 768
   * 100 201 - 100 400 : 761
   */

var sleep = require('sleep');
var httpRequest = require('./httpRequest.js');

var userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36';

var searchPath = '/search/repositories?q=size:',
    pagePath = '&page=',
    minSize = 100001,
    maxSize = 100201;

var options = [];
var arr = [];
for (var interval = 1; interval <= 2; interval++) {
  for (var nPage = 1; nPage <= 2; nPage++) {
    options = {
      host: 'api.github.com',
      path: searchPath + (minSize + 200*(interval-1)) + '..' + (maxSize + 200*(interval-1)) + pagePath + nPage,
      method: 'GET',
      headers: {'user-agent': userAgent}
    }
    httpRequest.httpResponse(options, function(response) {
      var items = JSON.parse(response).items;
      for (var index = 0; index < items.length; index++) {
        var item = items[index];
        arr.push(item.id);      
      }
      console.log('arr = ' + arr.length);
    });
  }
}