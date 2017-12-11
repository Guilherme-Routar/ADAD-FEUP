var request = require('sync-request');
var file = require('../file.js');

var userAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0';

var host = 'https://api.github.com',
    searchPath = '/search/repositories?q=size:',
    minSize = 100001,
    maxSize = 100201;
    pagePath = '&page=',
    pageNumber = 1;
var fullPath = '';

// 30 results per loop, so 1000*30 = 30k results
for (var i = 0; i < 1; i++) {

    if (pageNumber == 11) {
        pageNumber = 1;
        minSize = maxSize + 1;
        maxSize += 200;
    }

    fullPath = host + searchPath + minSize + '..' + maxSize + pagePath + pageNumber;
    //console.log('fullPath = ' + fullPath);
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });

    //we have 30 results here
    console.log((JSON.parse(res.getBody())).items);

    pageNumber++;
}