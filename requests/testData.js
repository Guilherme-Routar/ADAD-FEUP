
var parser = require("csv-to-array");

var commitsMetadata = ["id", "project_id", "author", "date", "additions", "deletions", "total"];
var reposMetadata = ["id", "name", "owner", "full_name", "size", "created_at", "main_language", "n_issues", "n_stargazers", "n_watchers", "n_forks", "n_contributors", "n_commits"];
var forksMetadata = ["id", "repos_id", "owner", "created_at", "n_forks", "n_stargazers", "n_watchers", "size", "n_issues"];

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv",
    columns: reposMetadata
}, function (err, reposArray) {

    /* Testing commits data */
    console.log('COMMITS');
    parser({
        file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv",
        columns: commitsMetadata
    }, function (err, commitsArray) {

        var counter = 0, matches = 0;
        var cLen = commitsArray.length;
        var rLen = reposArray.length;
        for (var i = 0; i < cLen; i++) {
            matches = 0;
            for (var j = 0; j < rLen; j++) {
                if (commitsArray[i].project_id == reposArray[j].id)
                    matches++;
            }
            //console.log(matches);
            if (matches == 0) {
                counter++;
                console.log('id = ' + commitsArray[i].project_id);
            }
        }
        console.log("counter = " + counter);
    });

    /* Testing forks data */
    console.log('FORKS');
    parser({
        file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv",
        columns: forksMetadata
    }, function (err, forksArray) {

        var counter = 0, matches = 0;
        var fLen = forksArray.length;
        var rLen = reposArray.length;
        for (var i = 0; i < fLen; i++) {
            matches = 0;
            for (var j = 0; j < rLen; j++) {
                if (forksArray[i].repos_id == reposArray[j].id)
                    matches++;
            }
            //console.log(matches);
            if (matches == 0) {
                counter++;
                console.log('id = ' + forksArray[i].project_id);
            }
        }
        console.log("counter = " + counter);
    });
});
