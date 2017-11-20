var minSize = 100001, 
    maxSize = 100200;

var arr = [];
var tempURL = '';
for (var interval = 1; interval <= 71; interval++) {
    for (page = 1; page <= 20; page++) {
        tempURL = '/search/repositories?q=size:' + minSize + '..' + maxSize + '&page=' + page;
        console.log(tempURL);
    }
    minSize += 200;
    maxSize += 200;
}
