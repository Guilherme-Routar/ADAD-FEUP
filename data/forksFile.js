var fs = require('fs');

var fields = [
    'id', 
    'owner',
    'created_at',
    'n_languages',
    'n_commits',
    'n_contributors'
];

fs.writeFile("/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;