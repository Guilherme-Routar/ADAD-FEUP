var sleep = require('sleep');
var request = require('sync-request');
var file = require('./file.js');

var userAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0';

var host = 'https://api.github.com',
    searchPath = '/search/repositories?q=size:',
    minSize = 100001;
    maxSize = 100201;
    pagePath = '&page=',
    pageNumber = 1;
var fullPath = '';

var labelsArr = [
    'languages', 
    'subscribers', 
    'pulls', 
    'contributors', 
    'commits', 
    'labels', 
    'deployments'
];
var valuesArr = [];

// 30 repositories per loop
for (var i = 0; i < 1; i++) {

    if (pageNumber == 11) {
        pageNumber = 1;
        minSize = maxSize + 1;
        maxSize += 200;
    }

    fullPath = host + searchPath + minSize + '..' + maxSize + pagePath + pageNumber;
    //console.log('search path = ' + fullPath);
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });

    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var value = results[j];

        
        var subPath = host + '/repos/' + value.full_name + '/';
        for (var label = 0; label < labelsArr.length; label++) {
            //console.log('sub path = ' + subPath + labelsArr[label]);
            sleep.sleep(8);
            var subRes = request('GET', subPath + labelsArr[label], {
                'headers': {
                    'user-agent': userAgent
                }
            });
            var subresults =  (JSON.parse(subRes.getBody()));
            if (label == 0) valuesArr.push(Object.keys(subRes).length); //getting number of languages
            else valuesArr.push(subresults);
        }
        
        var data = [
            value.id,
            value.name,
            value.full_name,
            value.size,
            value.created_at,
            value.language,
            'lang', //repos/user/reposName/languages
            value.open_issues,
            value.stargazers_count,
            value.watchers,
            value.forks,
            'lang', //repos/user/reposName/subscribers
            'DOWNLOADS', //DEPRECATED--
            'lang', //repos/user/reposName/pulls
            'lang', //repos/user/reposName/contributors
            'COLLABS', //REQUIRES AUTH--
            'lang', //repos/user/reposName/commits
            //Added
            'lang', //repos/user/reposName/contributors
            'lang', //repos/user/reposName/labels
            'lang' //repos/user/reposName/deployments
          ];
        file.appendFile("/home/routar/FEUP/ADAD/ADAD-FEUP/dataset.csv", '\n' + data, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }

    pageNumber++;
}