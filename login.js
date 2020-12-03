const fs = require('fs');

/*função para fazer o login no servidor
    abre o arquivo users.json e verifica se o usuário
    consta no arquivo, retorna "1" se encontrou o usuário
    e retorna "2" não encontrou*/
exports.login = function(username, password) { 
    let rawdata = fs.readFileSync('users.json');
    let creds = JSON.parse(rawdata);
    let users = Object.keys(creds);
    for(var i = 0; i < users.length; i++) {
        var person = creds[users[i]];
        if(person['username'] === username && person['password'] === password) {
            console.log("User [" + username + "] logged in!");
            return "1";
        }
    }
    return "2";
}
