var parser = require("csv-to-array");
var file = require('fs');
var randomstring = require("randomstring");

var reposMetadata = ["id", "name", "owner", "full_name", "size", "created_at", "main_language", "n_issues", "n_stargazers", "n_watchers", "n_forks", "n_contributors", "n_commits"];
var datesMetadata = ["id", "date", "timeofday"];

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv.txt",
    columns: reposMetadata
}, function (err, reposArray) {

    parser({
        file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/dates.csv.txt",
        columns: datesMetadata
    }, function (err, datesArray) {

        var data = [];
        var rLen = reposArray.length;
        for (var i = 0; i < rLen; i++) {
            var id = reposArray[i].id;
            var commits = reposArray[i].n_commits;
            var name = reposArray[i].owner;
            for (var j = 0; j < commits; j++) {
                var additions = getRandomProbabilityInt();
                var deletions = getRandomProbabilityInt();
                var total = additions + deletions;
                data = [
                    id,
                    randomName() + name + randomName(),
                    datesArray[Math.floor(Math.random() * datesArray.length)].id,
                    additions,
                    deletions,
                    total
                ];
                file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/genCommits.csv.txt", '\n' + data);
            }
        }
    });


});

//Generate random name
function randomName(name) {

    if (getRandomProbabilityInt_names() == 2) {
        max = 6;
        min = 1;
        var rand = Math.floor(Math.random() * (max - min)) + min;

        return randomstring.generate({
            length: rand,
            charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_/1234567890'
        });
    }
    else
        return '';
}

function getRandomProbabilityInt_names() {
    var freq = [
        1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ];

    return freq[Math.floor(Math.random() * freq.length)];
}


function getRandomProbabilityInt() {

    var freq = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2,
        3, 3, 3,
        4];

    var rand = freq[Math.floor(Math.random() * freq.length)];

    var min, max;

    switch (rand) {
        case 1:
            min = 0;
            max = 200;
            break;
        case 2:
            min = 200;
            max = 500;
            break;
        case 3:
            min = 500;
            max = 2000;
            break;
        case 4:
            min = 2000;
            max = 10000;
            break;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}