var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer')
const login = require('./login.js');
const cadastrar = require('./cadastrar.js')

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/' + 'login.html');
});

app.get('/toDoList', function(req, res) {
	res.sendFile(__dirname + '/public/' + 'toDoList.html');
});

app.post("*", function(req, res) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        var credentials = body.split('&');
        if(!(credentials[0] === '')) {
            var username = credentials[0].substring(9);
            var password = credentials[1].substring(9);
            var operacao = credentials[2].substring(9);
            console.log(username + " " + password + " " + operacao);
            if(operacao === 'login'){
                result = login.login(username, password);
            }else if(operacao === 'cadastrar'){
                result = cadastrar.cadastrar(username, password);
            }        
        }
    	if(result === '1'){
    		res.redirect('/toDoList');
    	}else{
    		res.send(result);
    	}
    });
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Escutando em http://%s:%s", host, port);
});