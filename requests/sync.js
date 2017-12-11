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

// 30 repositories per loop
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

    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var value = results[j];
        var data = [
            value.id,
            value.name,
            value.full_name,
            value.size,
            value.created_at,
            value.language,
            'n_langs',
            value.open_issues,
            value.stargazers_count,
            value.watchers,
            value.forks,
            'n_subscribers',
            'n_downloads',
            'n_pulls',
            'n_contrib',
            'n_collab',
            'n_commits'
          ];
        file.appendFile("/home/routar/Desktop/ADAD/ADAD-FEUP/dataset.csv", '\n' + data, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }

    pageNumber++;
}