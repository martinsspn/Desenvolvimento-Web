var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer')
const login = require('./login.js');
const cadastrar = require('./cadastrar.js')
const fs = require('fs');
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

app.get('/getUserList', function(req, res) {
	var path = __dirname+'/usersFiles/'+username+'.json';
 	let s = fs.readFileSync(path);
 	console.log(s);
    res.send(s);
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

app.post('/atualizarList', function(req, res) {
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
    	var exist = false;
    	body = "{\n" + body+"\n}"
    	let elt = JSON.parse(body);
		let todos = Object.keys(elt);
		var name = elt[todos[0]];
		var rawdata = fs.readFileSync(__dirname+'/usersFiles/'+username+'.json');
    	let elt2 = JSON.parse(rawdata);
    	let savedTodos = Object.keys(elt2);
		fs.writeFileSync(__dirname+'/usersFiles/'+username+'.json', "{");
    	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
   		for(var i = 0; i < savedTodos.length; i++) {
       		var aux=elt2[savedTodos[i]];
       		if(name["Nome"] === elt2[savedTodos[i]]["Nome"]){
       			var t = {"Nome": name["Nome"],
       			 		 "Tarefas a fazer": name["Tarefas a fazer"],
       					 "Tarefas em andamento": name["Tarefas em andamento"],
       					 "Tarefas Concluídas": name["Tarefas Concluídas"]};
       			fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(name["Nome"]));
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\u003A');
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(t, null, 5));
    			exist = true;
        	}else{
        		var t = {"Nome": aux["Nome"],
       			 		 "Tarefas a fazer": aux["Tarefas a fazer"],
       					 "Tarefas em andamento": aux["Tarefas em andamento"],
       					 "Tarefas Concluídas": aux["Tarefas Concluídas"]};
				fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(aux["Nome"]));
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\u003A');
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(t, null, 5));
        	}
        	if(i < savedTodos.length-1){
        		fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', ',\n');
        	}
        }
        if(!exist){
			fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', ',');
			var t = {"Nome": name["Nome"],
			 		 "Tarefas a fazer": name["Tarefas a fazer"],
   					 "Tarefas em andamento": name["Tarefas em andamento"],
   					 "Tarefas Concluídas": name["Tarefas Concluídas"]};
   			fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(name["Nome"]));
        	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\u003A');
        	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
        	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(t, null, 5));
    }
        fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n}');      	
	});
	res.send("Sucess!");
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Escutando em http://%s:%s", host, port);
});