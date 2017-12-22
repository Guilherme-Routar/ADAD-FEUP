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

    /* Getting repositories (30 per loop) */
    sleep.msleep(1000);
    fullPath = host + searchPath + minSize + '..' + maxSize + pagePath + pageNumber + '&client_id=' + clientID + '&client_secret=' + clientSecret;
    reqCounter++;
    console.log('Request #' + reqCounter + ', path - ' + fullPath);
    var res = request('GET', fullPath, {
        'headers': {
            'user-agent': userAgent
        }
    });
    
    /* Getting each repository statistics, forks and commits */
    var results = (JSON.parse(res.getBody())).items;
    for (var j = 0; j < results.length; j++) {
        var reposValue = results[j];
        var subPath = host + '/repos/' + reposValue.full_name + '/';

        // COMMITS STATISTICS
        sleep.msleep(1000);
        reqCounter++;
        console.log('Request #' + reqCounter + ', path - ' + subPath + 'commits');
        var commitsRes = request('GET', subPath + 'commits' + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
            'headers': {
                'user-agent': userAgent
            }
        });
        var commits = JSON.parse(commitsRes.getBody());

        for (var i = 0; i < commits.length; i++) {
            var commitsValue = commits[i];
            
            sleep.msleep(1000);
            reqCounter++;
            var singleCommitRes = request('GET', subPath + 'commits/' + commitsValue.sha + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
                'headers': {
                    'user-agent': userAgent
                }
            });
            var commit = JSON.parse(singleCommitRes.getBody());

            var commitsData = [
                commitsValue.sha,
                reposValue.id,
                commitsValue.commit.message,
                commitsValue.commit.author.name,
                commitsValue.commit.author.date,
                commit.stats.additions,
                commit.stats.deletions,
                commit.stats.total
            ];
            
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv", '\n' + commitsData);
        }

        // FORKS STATISTICS
        sleep.msleep(1000);
        reqCounter++;
        console.log('Request #' + reqCounter + ', path - ' + subPath + 'forks');
        var forksRes = request('GET', subPath + 'forks' + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
            'headers': {
                'user-agent': userAgent
            }
        });
        var forks = JSON.parse(forksRes.getBody());
        for (var i = 0; i < forks.length; i++) {
            var forksValue = forks[i];
            var forksData = [
                forksValue.id,
                reposValue.id,
                forksValue.owner.login,
                forksValue.created_at,
                forksValue.forks,
                forksValue.stargazers_count,
                forksValue.watchers,
                forksValue.size,
                forksValue.open_issues
            ];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv", '\n' + forksData);
        }

        // Getting contributors
        sleep.msleep(1000);
        reqCounter++;
        console.log('Request #' + reqCounter + ', path - ' + subPath + 'contributors');
        var contribRes = request('GET', subPath + 'contributors' + '?client_id=' + clientID + '&client_secret=' + clientSecret, {
            'headers': {
                'user-agent': userAgent
            }
        });
        
        var reposData = [
            reposValue.id,
            reposValue.name,
            reposValue.owner.login,
            reposValue.full_name,
            reposValue.size,
            reposValue.created_at,
            reposValue.language,
            reposValue.open_issues,
            reposValue.stargazers_count,
            reposValue.watchers,
            reposValue.forks,
            Object.keys(JSON.parse(commitsRes.getBody())).length, //repos/user/reposName/commits
            Object.keys(JSON.parse(contribRes.getBody())).length  //repos/user/reposName/contributors
          ];

        file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv", '\n' + reposData);
    }
    pageNumber++;
}