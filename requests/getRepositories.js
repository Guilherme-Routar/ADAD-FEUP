/**
 * Repositories search request
 * In this section we download every repository with a size >= 100000 kb (100 Mb)
 * 348,019 repositories satisfy the query
 */

 /**
  * Query the API inbetween ranges and go through pages
  */

var httpRequest = require('./httpRequest.js');
var file = require('../file.js');

file.appendFile('/tmp/test', '\nWriting inside getRepos', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

console.log(file);

var userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36';

var searchPath = '/search/repositories?q=size:',
    pagePath = '&page=',
    minSize = 100001,
    maxSize = 100201;
    maxInterval = 3;
    maxPageNumber = 10;

var temp = [];

function getRepository(interval, pageNumber) {

  var options = {
    host: 'api.github.com',
    path: searchPath + 
          (minSize + 1 + 200  * (interval - 1)) + '..' + 
          (maxSize + 200 * (interval - 1)) + 
          pagePath + pageNumber,
    method: 'GET',
    headers: { 'user-agent': userAgent }
  }

  httpRequest.httpResponse(options, function (response) {
    var items = JSON.parse(response).items;
    for (var index = 0; index < items.length; index++) {
      var item = items[index];
      temp.push(item.id);
      console.log(item.name);
    }
    console.log('temp = ' + temp.length);
  });

  if(pageNumber == maxPageNumber) {
    pageNumber = 0;
    interval += 1;
  }

  if(interval<=maxInterval) {
    setTimeout(function() {
      getRepository(interval, pageNumber+1);
    }, 7000);
  }
}

getRepository(1,1);