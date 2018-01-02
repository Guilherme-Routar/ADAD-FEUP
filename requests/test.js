var randomstring = require("randomstring");
var parser = require("csv-to-array");
var datesMetadata = ["id", "date", "timeofday"];

function randomName() {
    
    if (getRandomProbabilityInt_names() == 2) {
        max = 6; 
        min = 1;
        var rand = Math.floor(Math.random() * (max - min)) + min;

        return randomstring.generate({
            length: rand,
            charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_/1234567890 '
          });
    }
    else 
        return '';
}


function getRandomProbabilityInt_names() {
    var freq = [
        1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ];

    return freq[Math.floor(Math.random() * freq.length)];
}


parser({
    file: "/home/routar/FEUP/ADAD/ADAD-FEUP/data/dates.csv.txt",
    columns: datesMetadata
}, function (err, datesArray) {
    console.log(datesArray[Math.floor(Math.random()*datesArray.length)].id);
});