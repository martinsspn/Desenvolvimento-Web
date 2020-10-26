var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}))


app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/toDoList.html");
});

app.listen(8080, console.log("Executando servidor na porta 8080!!!"));