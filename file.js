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
    'n_commits'
];

fs.writeFile("/tmp/test", fields, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

var fields2 = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    'n_languages',
    '7',
    '8',
    '9',
    '10',
    'n_subscribers',
    'n_downloads',
    'n_pulls',
    'n_contributors',
    'n_collaborators',
    'n_commits'
];

fs.appendFile("/tmp/test", '\n' + fields2, function(err) {
    if(err) {
        return console.log(err);
    }
}); 

module.exports = fs;