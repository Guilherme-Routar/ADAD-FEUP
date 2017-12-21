var sleep = require('sleep');
var request = require('sync-request');
var file = require('fs');

var userAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0';

var clientID = '6e525a2f12669a78b6de';
var clientSecret = 'fd5f0eb647f15065d197ad9c36ed7d989660dac0';

var host = 'https://api.github.com',
    searchPath = '/search/repositories?q=size:',
    minSize = 100001;
    maxSize = 100201;
    pagePath = '&page=',
    pageNumber = 1;
var fullPath = '';

var labelsArr = [
    'contributors', 
    'commits'
];
var valuesArr = [];


var firstParseArr = [];
var tempArr = [];

var reqCounter = 0;

// 30 repositories per loop
// # of requests: (1 + 30*2)*340 = 20740 requests = 4,148 hours
// Started at 18h48
for (var i = 0; i < 340; i++) {

    if (pageNumber == 11) {
        pageNumber = 1;
        minSize = maxSize + 1;
        maxSize += 200;
    }

    sleep.sleep(2);
    fullPath = host + searchPath + minSize + '..' + maxSize + pagePath + pageNumber + 'client_id=' + clientID + '&client_secret=' + clientSecret;
    reqCounter++;
    console.log('Request #' + reqCounter + ', path - ' + fullPath);
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });
    
    sleep.sleep(2);
    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var value = results[j];
        
        var subPath = host + '/repos/' + value.full_name + '/';
        for (var label = 0; label < labelsArr.length; label++) {
            sleep.sleep(3);
            reqCounter++;
            console.log('Request #' + reqCounter + ', subpath - ' + subPath + labelsArr[label]);
            var subRes = request('GET', subPath + labelsArr[label] + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
                'headers': {
                    'user-agent': userAgent
                }
            });
            valuesArr.push(Object.keys(JSON.parse(subRes.getBody())).length);
        }
        
        var data = [
            value.id,
            value.name,
            value.full_name,
            value.size,
            value.created_at,
            value.language,
            value.open_issues,
            value.stargazers_count,
            value.watchers,
            value.forks,
            valuesArr[0], //repos/user/reposName/contributors
            valuesArr[1], //repos/user/reposName/commits
          ];

        file.appendFile("/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv", '\n' + data, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }

    pageNumber++;
}