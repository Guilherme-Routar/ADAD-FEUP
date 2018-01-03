var parser = require("csv-to-array");
var file = require('fs');

var commitsMetadata = ["projectID","authorID","dateID","n_additions","n_deletions","n_total"];

parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/genCommits.csv.txt",
    columns: commitsMetadata
}, function (err, commitsArray) {

    var authorsArr = [];
    console.log(commitsArray.length);
    for (var i = 0; i < commitsArray.length; i++) {
        var data = [];
        var author = (commitsArray[i].authorID).toLowerCase();
        if (authorsArr.indexOf(author) == -1) {
            authorsArr.push(author);
            data = [
                author,
                getRandomCountry()
            ];
            file.appendFileSync("/home/routar/FEUP/ADAD/ADAD-FEUP/data/genAuthors.csv.txt", '\n' + data);
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