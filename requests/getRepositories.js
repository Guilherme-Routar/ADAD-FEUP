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
var csv = require("csv");

/**
 * HTTP request options 
 */

var userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36';

var searchPath = '/search/repositories?q=size:',
    pagePath = '&page=',
    minSize = 100001,
    maxSize = 100201;
    maxInterval = 2;
    maxPageNumber = 10;

function loadRepositories(interval, pageNumber) {

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
      var data = [
        item.id,
        item.name,
        item.full_name,
        item.size,
        item.created_at,
        item.language,
        'n_langs',
        item.open_issues,
        item.stargazers_count,
        item.watchers,
        item.forks,
        'n_subscribers',
        'n_downloads',
        'n_pulls',
        'n_contrib',
        'n_collab',
        'n_commits'
      ];
      file.appendFile('/tmp/test', '\n' + data, function (err) {
        if (err) throw err;
      });
    }
  });

  if(pageNumber == maxPageNumber) {
    pageNumber = 0;
    interval += 1;
  }

  if(interval <= maxInterval) {
    setTimeout(function() {
      loadRepositories(interval, pageNumber+1);
    }, 7000);
  }
}

var initialInterval = 1, initialPageNumber = 1;
//loadRepositories(initialInterval, initialPageNumber);





/**
 * Editing CSV
 */

 /*
var readStream = file.createReadStream("/tmp/test"); // readStream is a read-only stream wit raw text content of the CSV file
var writeStream = file.createWriteStream("/tmp/testAfter"); // writeStream is a write-only stream to write on the disk

var csvStream = csv.parse(); // csv Stream is a read and write stream : it reads raw text in CSV and output untransformed records

csvStream.on("data", function(data) {
  console.log(data[6]);
  console.log(data[11]);
  console.log(data[12]);
  console.log(data[13]);
  console.log(data[14]);
  console.log(data[15]);
  console.log(data[16]);

  data[6] = 'edited';
  data[16] = 'edited2\n';

  // Request
  var options = {
    host: 'api.github.com',
    path: '/Guilherme-Routar/SDIS-FEUP/languages',
    method: 'GET',
    headers: { 'user-agent': userAgent }
  }
  var temp = [];
  httpRequest.httpResponse(options, function (response) {
    var items = JSON.parse(response);
    console.log('lang length = ' + items.HTML);
    temp.push(items);
    //data[6] = items.length;
  });
  console.log('temp lengh = ' + temp.length);
  // End request


  writeStream.write(JSON.stringify(data));
})
.on("end", function(){
    console.log("done");
})
.on("error", function(error){
    console.log(error);
});

readStream.pipe(csvStream);
*/