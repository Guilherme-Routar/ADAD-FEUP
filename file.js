var fs = require('fs');

var fields = [
    'id',
    'name',
    'full_name',
    'size',
    'created_at',
    'main_language',
    'n_languages',
    'n_issues',
    'n_stargazers',
    'n_watchers',
    'n_forks',
    'n_subscribers',
    'n_downloads',
    'n_pulls',
    'n_contributors',
    'n_collaborators',
    'n_commits',
    'n_releases', 
    'n_labels', 
    'n_deployments' 
];

fs.writeFile("/home/routar/Desktop/ADAD/ADAD-FEUP/dataset.csv", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;