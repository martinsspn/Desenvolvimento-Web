const fs = require('fs');

exports.cadastrar = function (username, password) {
    let rawdata = fs.readFileSync('users.json');
    let creds = JSON.parse(rawdata);
    let users = Object.keys(creds);
    for(var i = 0; i < users.length; i++) {
        var person = creds[users[i]];
        if(person['username'] === username && person['password'] === password) {
            return "Usuário já está cadastrado!";
        }
    }
    fs.writeFileSync('users.json', "{");
    fs.appendFileSync('users.json', '\n');
    for(var i = 0; i < users.length+1; i++) {
        var person = creds[users[i]];
    	
        if(i === (users.length)){
        	var name = {'username': username, 'password' : password}
            fs.appendFileSync('users.json', JSON.stringify(username));
            fs.appendFileSync('users.json', '\u003A');
            fs.appendFileSync('users.json', '\n');
            fs.appendFileSync('users.json', JSON.stringify(name, null, 5));}
        else{
        	var name = {'username': person['username'], 'password' : person['password']}
            //var myObj = JSON.stringify(name);
            fs.appendFileSync('users.json', JSON.stringify(person['username']));
            fs.appendFileSync('users.json', '\u003A');
            fs.appendFileSync('users.json', '\n');
            fs.appendFileSync('users.json', JSON.stringify(name, null, 5));
            fs.appendFileSync('users.json', '\u002C');
            fs.appendFileSync('users.json', '\n');
            fs.appendFileSync(__dirname + '/usersFiles/'+username+'.json', "");
        }
    }
    fs.appendFileSync('users.json', '\n');
    fs.appendFileSync('users.json', "}");
    return "Cadastro efetuado com sucesso!";
};