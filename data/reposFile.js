var fs = require('fs');

var fields = [
    'id',
    'name',
    'owner',
    'full_name',
    'size',
    'created_at',
    'main_language',
    'n_issues',
    'n_stargazers',
    'n_watchers',
    'n_forks',
    //Extra requests
    'n_contributors',
    'n_commits',
];

fs.writeFile("/home/routar/FEUP/ADAD/ADAD-FEUP/data/reposData.csv", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;