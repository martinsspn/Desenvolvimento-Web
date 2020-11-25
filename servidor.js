var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer')
const login = require('./login.js');
const cadastrar = require('./cadastrar.js')
var username = '';

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/' + 'login.html');
});

app.get('/toDoList', function(req, res) {
	res.sendFile(__dirname + '/public/' + 'toDoList.html');
});

app.post('/login', function(req, res) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        var credentials = body.split('&');
        if(!(credentials[0] === '')) {
            username = credentials[0].substring(9);
            var password = credentials[1].substring(9);
            result = login.login(username, password);
        }
        if(result === "1"){
            res.send('/toDoList');
        }
        else{
            res.send(result);
        }
    });
    
});

app.get('/getUserName', function(req, res) {
    res.send(username);
});

app.post("/cadastrar", function(req, res) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        var credentials = body.split('&');
        if(!(credentials[0] === '')) {
            username = credentials[0].substring(9);
            var password = credentials[1].substring(9);
            console.log(username + " " + password);
            result = cadastrar.cadastrar(username, password);
        }
    	res.send(result);
    	
    });
});

app.post("/addCategoria", function(req, res) {
	let rawdata = fs.readFileSync('users.json');
	console.log(req);
	res.send("success!");
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Escutando em http://%s:%s", host, port);
});