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

var labelsArr = [
    'languages', 
    'subscribers', 
    'pulls', 
    'contributors', 
    'commits', 
    'contributors', 
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
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });

    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var value = results[j];

        var subPath = host + '/repos/' + value.full_name + '/';

        for (var k = 0; k < labelsArr.length; k++) {
            var res2 = request('GET', subPath + labelsArr[k], {
                'headers': {
                    'user-agent': userAgent
                }
            });
            var subresults =  (JSON.parse(res2.getBody()));
            if (k == 0)
                valuesArr.push(Object.keys(subResults.length)); //Not tested yet for languages json length
            else 
                valuesArr.push(subresults);
            console.log(subresults);
        }

        var data = [
            value.id,
            value.name,
            value.full_name,
            value.size,
            value.created_at,
            value.language,
            valuesArr[0], //repos/user/reposName/languages
            value.open_issues,
            value.stargazers_count,
            value.watchers,
            value.forks,
            valuesArr[1], //repos/user/reposName/subscribers
            'DOWNLOADS', //DEPRECATED--
            valuesArr[2], //repos/user/reposName/pulls
            valuesArr[3], //repos/user/reposName/contributors
            'COLLABS', //REQUIRES AUTH--
            valuesArr[4], //repos/user/reposName/commits
            //Added
            valuesArr[5], //repos/user/reposName/contributors
            valuesArr[6], //repos/user/reposName/labels
            valuesArr[7] //repos/user/reposName/deployments
          ];
        file.appendFile("/home/routar/Desktop/ADAD/ADAD-FEUP/dataset.csv", '\n' + data, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }

    pageNumber++;
}