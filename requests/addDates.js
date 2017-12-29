

// Read repos file, add unique users and randomly assign country
var parser = require("csv-to-array");
var file = require('fs');
var commitsMetadata = ["id", "project_id", "author", "date", "additions", "deletions", "total"];
var reposMetadata = ["id", "name", "owner", "full_name", "size", "created_at", "main_language", "n_issues", "n_stargazers", "n_watchers", "n_forks", "n_contributors", "n_commits"];
var forksMetadata = ["id", "repos_id", "owner", "created_at", "n_forks", "n_stargazers", "n_watchers", "size", "n_issues"];

var dates = [];
var date = '';
var data = [];
/**
 * Checking if each commit and fork belongs to a repository listed in the file
 */

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv",
    columns: reposMetadata
}, function (err, reposArray) {
    for (var i = 0; i < reposArray.length; i++) {
        date = reposArray[i].created_at;
        if (dates.indexOf(date) == -1) {
            dates.push(date);
            data = [
                date,
                date.substr(0,10),
                getTimeOfDay(date)
            ];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/dates.csv", '\n' + data);
        }
    }
});

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv",
    columns: commitsMetadata
}, function (err, commitsArray) {
    for (var i = 0; i < commitsArray.length; i++) {
        date = commitsArray[i].date;
        if (dates.indexOf(date) == -1) {
            dates.push(date);
            data = [
                date,
                date.substr(0,10),
                getTimeOfDay(date)
            ];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/dates.csv", '\n' + data);
        }
    }
});

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv",
    columns: forksMetadata
}, function (err, forksArray) {
    for (var i = 0; i < forksArray.length; i++) {
        date = forksArray[i].created_at;
        if (dates.indexOf(date) == -1) {
            dates.push(date);
            data = [
                date,
                date.substr(0,10),
                getTimeOfDay(date)
            ];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/dates.csv", '\n' + data);
        }
    }
});

function getTimeOfDay(date) {

    var hour = parseInt(date.substr(11,2));
    if (hour >= 13 && hour < 19)
        return 'afternoon';
    else if (hour >= 19)
        return 'night';
    else if (hour >= 00 && hour < 07)
        return 'night';
    else if (hour >= 08 && hour < 13)
        return 'morning';
}