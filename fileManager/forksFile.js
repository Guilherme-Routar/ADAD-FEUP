var fs = require('fs');

var fields = [
    'id', 
    'repos_id',
    'owner',
    'created_at',
    'n_forks',
    'n_stargazers',
    'n_watchers',
    'size',
    'n_issues'
];

fs.writeFile("/home/routar/FEUP/ADAD/ADAD-FEUP/data/forksData.csv", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;