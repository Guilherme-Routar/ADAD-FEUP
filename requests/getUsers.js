

// Read repos file, add unique users and randomly assign country


var parser = require("csv-to-array");
var file = require('fs');
var reposMetadata = ["id", "name", "owner", "full_name", "size", "created_at", "main_language", "n_issues", "n_stargazers", "n_watchers", "n_forks", "n_contributors", "n_commits"];
var forksMetadata = ["id", "repos_id", "owner", "created_at", "n_forks", "n_stargazers", "n_watchers", "size", "n_issues"];
var commitsMetadata = ["id", "project_id", "author", "created_at", "additions", "deletions", "total"];

/**
 * Checking if each commit and fork belongs to a repository listed in the file
 */

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv",
    columns: reposMetadata
}, function (err, reposArray) {

    parser({
        file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv",
        columns: forksMetadata
    }, function (err, forksArray) {

        parser({
            file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv",
            columns: commitsMetadata
        }, function (err, commitsArray) {

            var data = [];
            var inc = 1;
            var rLen = reposArray.length;
            var fLen = forksArray.length;
            var cLen = commitsArray.length;
            var users = [];

            for (var i = 0; i < rLen; i++) {
                var owner = reposArray[i].owner;
                if (users.indexOf(owner) == -1) {
                    data = [inc, owner, getRandomCountry()];
                    file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/country.csv", '\n' + data);
                    users.push(owner);
                    inc++;
                    console.log('Adding ' + data);
                }
            }

            for (var i = 0; i < fLen; i++) {
                var owner = forksArray[i].owner;
                if (users.indexOf(owner) == -1) {
                    data = [inc, owner, getRandomCountry()];
                    file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/country.csv", '\n' + data);
                    users.push(owner);
                    inc++;
                }
            }

            for (var i = 0; i < cLen; i++) {
                var owner = commitsArray[i].author;
                if (users.indexOf(owner) == -1) {
                    data = [inc, owner, getRandomCountry()];
                    file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/country.csv", '\n' + data);
                    users.push(owner);
                    inc++;
                }
            }

        });
    });
});

function getRandomCountry() {

    var countries1 = ['USA', 'Canada', 'UK', 'France', 'Japan', 'Switzerland'];
    var countries2 = ['Germany', 'Russia', 'Australia', 'Sweden'];
    var countries3 = ['Portugal', 'Spain', 'Italy', 'Belgium'];

    var freq = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3];

    var rand = freq[Math.floor(Math.random() * freq.length)];

    var min, max;

    switch (rand) {
        case 1:
            return countries1[Math.floor(Math.random() * countries1.length)];
        case 2:
            return countries2[Math.floor(Math.random() * countries2.length)];
        case 3:
            return countries3[Math.floor(Math.random() * countries3.length)];
            break;
    }
}