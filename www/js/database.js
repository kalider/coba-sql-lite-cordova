// connection
var db;
var version;

var version1 = function () {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    }, function (error) {
        console.log('Transaction version1 ERROR: ' + error.message);
    }, function () {
        console.log('Migration version1 OK');
    });
}

var version2 = function () {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Frank', 303]);
    }, function (error) {
        console.log('Transaction version2 ERROR: ' + error.message);
    }, function () {
        console.log('Migration version2 OK');
    });
}

var versions = [version1, version2];

document.addEventListener('deviceready', async function () {
    version = localStorage.hasOwnProperty('version') ? parseInt(localStorage.getItem('version')): 0;

    db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default'
    });

    versions.forEach ( function(item, index) {
        let ver = (index + 1)
        if (ver > version ){
            item();

            version = ver
            localStorage.setItem('version', version)
        }
        else return
    })

}, false);
