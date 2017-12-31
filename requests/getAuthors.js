var parser = require("csv-to-array");
var file = require('fs');
var commitsMetadata = ["id", "project_id", "author", "created_at", "additions", "deletions", "total"];

users = [];

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv",
    columns: commitsMetadata
}, function (err, commitsArray) {

    var data = [];
    var cLen = commitsArray.length;
    for (var i = 0; i < cLen; i++) {
        var owner = (commitsArray[i].author).toLowerCase();
        if (users.indexOf(owner) == -1) {
            data = [owner, getRandomCountry()];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/authors.csv", '\n' + data);
            users.push(owner);
        }
    }

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