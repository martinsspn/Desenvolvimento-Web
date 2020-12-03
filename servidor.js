var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer')
const login = require('./login.js');
const cadastrar = require('./cadastrar.js')
const fs = require('fs');
var username = '';

app.use(express.static('public'));

app.get('/', function (req, res) { //retorna para o clinte o arquivo da página inicial login.html
	res.sendFile(__dirname + '/public/' + 'login.html');
});

app.get('/toDoList', function(req, res) { //retorna para o cliente o arquivo toDoList.html se username != '', caso contrário retorna a página inicial de login
	if(username === ''){
		res.sendFile(__dirname + '/public/'+'login.html');
	}else{
		res.sendFile(__dirname + '/public/' + 'toDoList.html');
	}
});

app.get('/sair', function(req, res) { //método para fazer o logoff do usuário
	username = '';
	res.send('/');
});

app.post('/login', function(req, res) { //método para fazer o login do usuário
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

app.get('/getUserList', function(req, res) { //retorna o arquivo da lista do usuário que está localizado na pasta usersFiles
	var path = __dirname+'/usersFiles/'+username+'.json';
 	let s = fs.readFileSync(path);
    res.send(s);
});

app.post('/addCategoria', function(req, res) { //método para adicionar uma nova catégoria no arquivo do usuário
	let body = '';
	req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
    	body = "{\n" + body+"\n}"
    	var isListed = false;
    	let elt = JSON.parse(body);
		let todos = Object.keys(elt);
		var name = elt[todos[0]];
		var rawdata = fs.readFileSync(__dirname+'/usersFiles/'+username+'.json');
    	let elt2 = JSON.parse(rawdata);
    	let savedTodos = Object.keys(elt2);
		for(var i = 0; i < savedTodos.length; i++) {
       		if(name["Nome"] === elt2[savedTodos[i]]["Nome"]){
    			isListed = true;
    			res.send("Está catégoria já existe!");
    		}
    	}
    	if(!isListed){
    		fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', ',\n');
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
    		}
    		res.send("Catégoria adicionada!");	
    	}
	});

});

app.post("/cadastrar", function(req, res) { //método para cadastrar novo usuário
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

app.post('/atualizarList', function(req, res) { //método para salvar qualquer alteração da lista do usuário
	let body = '';				//este método basicamente é puro manipulação de JSON
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
    	var exist = false;
    	var keep = false;
    	var removed = false;
    	var inst = body.split('&');
    	body = "{\n" + inst[0]+"\n}"
    	let elt = JSON.parse(body);
		let todos = Object.keys(elt);
		var name = elt[todos[0]];
		var rawdata = fs.readFileSync(__dirname+'/usersFiles/'+username+'.json');
    	let elt2 = JSON.parse(rawdata);
    	let savedTodos = Object.keys(elt2);
		for(var i=0;i<savedTodos.length;i++){
			if(name["Nome"] === elt2[savedTodos[i]]["Nome"]){
       			if(inst[1] === "addCategoria"){
       				result = "0";
       				keep = true;
       			}else if(inst[1] === "addElement"){
       				for(var j=0;j<elt2[savedTodos[i]]["Tarefas a fazer"].length;j++){
       					if(name["Tarefas a fazer"][0] === elt2[savedTodos[i]]["Tarefas a fazer"][j]){
       						result = "1";
       						keep = true;	
       					}
       				}
       			}
       		}
		}
		if(!keep){
			fs.writeFileSync(__dirname+'/usersFiles/'+username+'.json', "{");
	    	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
	   		for(var i = 0; i < savedTodos.length; i++) {
	       		var aux=elt2[savedTodos[i]];
	       		if(name["Nome"] === elt2[savedTodos[i]]["Nome"]){
	       			if(inst[1] === "mvAndamento"){
	       				for(var j=0;j<elt2[savedTodos[i]]["Tarefas a fazer"].length;j++){
	       					if(elt2[savedTodos[i]]["Tarefas a fazer"][j] === name["Tarefas em andamento"][0]){
	       						elt2[savedTodos[i]]["Tarefas a fazer"].splice(j,1);
	       						break;
	       					}
	       				}
	       			}else if(inst[1] === "concluir"){
	       				for(var j=0;j<elt2[savedTodos[i]]["Tarefas em andamento"].length;j++){
	       					if(elt2[savedTodos[i]]["Tarefas em andamento"][j] === name["Tarefas Concluídas"][0]){
	       						elt2[savedTodos[i]]["Tarefas em andamento"].splice(j,1);
	       						break;
	       					}
	       				}	
	       			}else if(inst[1] === "refazer"){
	       				for(var j=0;j<elt2[savedTodos[i]]["Tarefas Concluídas"].length;j++){
	       					if(elt2[savedTodos[i]]["Tarefas Concluídas"][j] === name["Tarefas a fazer"][0]){
	       						elt2[savedTodos[i]]["Tarefas Concluídas"].splice(j,1);
	       						break;
	       					}
	       				}
	       			}else if(inst[1] === "apagar"){
	      				if(name["Tarefas a fazer"].length > 0){
	      					for(var j=0;j<elt2[savedTodos[i]]["Tarefas a fazer"].length;j++){
	      						if(elt2[savedTodos[i]]["Tarefas a fazer"][j] === name["Tarefas a fazer"][0]){
	       							elt2[savedTodos[i]]["Tarefas a fazer"].splice(j,1);
	       							name["Tarefas a fazer"].splice(0, 1);
	       						}
	      					}
	      				}else if(name["Tarefas em andamento"].length > 0){
	      					for(var j=0;j<elt2[savedTodos[i]]["Tarefas em andamento"].length;j++){
	      						if(elt2[savedTodos[i]]["Tarefas em andamento"][j] === name["Tarefas em andamento"][0]){
	       							elt2[savedTodos[i]]["Tarefas em andamento"].splice(j,1);
	       							name["Tarefas em andamento"].splice(0, 1);
	       						}
	      					}
	      				}else if(name["Tarefas Concluídas"].length > 0){
	      					for(var j=0;j<elt2[savedTodos[i]]["Tarefas Concluídas"].length;j++){
	      						if(elt2[savedTodos[i]]["Tarefas Concluídas"][j] === name["Tarefas Concluídas"][0]){
	       							elt2[savedTodos[i]]["Tarefas Concluídas"].splice(j,1);
	       							name["Tarefas Concluídas"].splice(0, 1);
	       						}
	      					}
	      				}
	       			}else if(inst[1] === "removerCategoria"){
	   					savedTodos.splice(i, 1);
	   					removed = true;
	       			}
	       			if(!removed){
		       			for(var j=0; j<elt2[savedTodos[i]]["Tarefas a fazer"].length;j++){
		       				name["Tarefas a fazer"].push(elt2[savedTodos[i]]["Tarefas a fazer"][j]);
		       			}
		       			for(var j=0; j<elt2[savedTodos[i]]["Tarefas em andamento"].length;j++){
		       				name["Tarefas em andamento"].push(elt2[savedTodos[i]]["Tarefas em andamento"][j]);
		       			}
		     			for(var j=0; j<elt2[savedTodos[i]]["Tarefas Concluídas"].length;j++){
		       				name["Tarefas Concluídas"].push(elt2[savedTodos[i]]["Tarefas Concluídas"][j]);
		       			}
		       			var t = {"Nome": name["Nome"],
		       			 		 "Tarefas a fazer": name["Tarefas a fazer"],
		       					 "Tarefas em andamento": name["Tarefas em andamento"],
		       					 "Tarefas Concluídas": name["Tarefas Concluídas"]};
		       			fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(name["Nome"]));
		            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\u003A');
		            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', '\n');
		            	fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', JSON.stringify(t, null, 5));
	       			}
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
				if(savedTodos.length != 0){
					fs.appendFileSync(__dirname+'/usersFiles/'+username+'.json', ',\n');
				}
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
			result = "Sucess!";
		}
	});
	res.send(result);
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Escutando em http://%s:%s", host, port);
});
