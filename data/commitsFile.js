var fs = require('fs');

var fields = [
    'id', //sha
    'project_id',
    'message',
    'author',
    'date',
    'additions',
    'deletions',
    'total'
];

fs.writeFile("/home/routar/FEUP/ADAD/ADAD-FEUP/data/commitsData.csv", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;