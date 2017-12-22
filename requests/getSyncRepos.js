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
// Started at 19h30
for (var i = 0; i < 340; i++) {

    if (pageNumber == 11) {
        pageNumber = 1;
        minSize = maxSize + 1;
        maxSize += 200;
    }

    sleep.sleep(2);
    fullPath = host + searchPath + minSize + '..' + maxSize + pagePath + pageNumber + '&client_id=' + clientID + '&client_secret=' + clientSecret;
    reqCounter++;
    console.log('Request #' + reqCounter + ', path - ' + fullPath);
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });
    
    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var value = results[j];
        var subPath = host + '/repos/' + value.full_name + '/';

        sleep.sleep(2);
        reqCounter++;
        console.log('Request #' + reqCounter + ', path - ' + subPath + 'commits');
        var commitsRes = request('GET', subPath + 'commits' + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
            'headers': {
                'user-agent': userAgent
            }
        });

        sleep.sleep(2);
        reqCounter++;
        console.log('Request #' + reqCounter + ', path - ' + subPath + 'contributors');
        var contribRes = request('GET', subPath + 'contributors' + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
            'headers': {
                'user-agent': userAgent
            }
        });
        
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
            Object.keys(JSON.parse(commitsRes.getBody())).length, //repos/user/reposName/commits
            Object.keys(JSON.parse(contribRes.getBody())).length  //repos/user/reposName/contributors
          ];

        file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv", '\n' + data);
    }
    pageNumber++;
}