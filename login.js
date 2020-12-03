const fs = require('fs');

exports.login = function(username, password) {
    let rawdata = fs.readFileSync('users.json');
    let creds = JSON.parse(rawdata);
    let users = Object.keys(creds);
    console.log(rawdata);
    for(var i = 0; i < users.length; i++) {
        var person = creds[users[i]];
        if(person['username'] === username && person['password'] === password) {
            console.log("User [" + username + "] logged in!");
            return "1";
        }
    }
    return "2";
}