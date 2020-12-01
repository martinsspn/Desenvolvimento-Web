// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" Apagar");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var userList = '';
// Click on a close button to hide the current list item
/*var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}*/

var todoForm = document.querySelector('.toDoForm');
let todos = [];

todoForm.addEventListener('submit', function(event){
  event.preventDefault();
  newCategoria();
});

inicializar();

function inicializar(){
  console.log("inicializar");
  getUserList();
  if(userList != ""){
    var teste = JSON.parse(userList);
    console.log(teste);
    renderTodos(teste);
  }else{
    console.log("Usuário ainda não tem lista!");
  }
}
    

function salvarServidor(x, aFazer, fazendo, feito){
  var str = '';
    str +='"'+x+'"'+":"+'\n';
    str +="{\n";
    str +='"Nome":'+'"'+x+'",'; 
    str +='"Tarefas a fazer":[';
    for(var i=0; i<aFazer.length; i++){
      if(i != aFazer.length -1)
        str += '"'+aFazer[i]+'",';
      else
        str += '"'+aFazer[i]+'"'; 
    }
    str += '],\n';
    str +='"Tarefas em andamento":[';
    for(var i=0; i<fazendo.length; i++){
      if(i != fazendo.length -1)
        str += '"'+fazendo[i]+'",';
      else
        str += '"'+fazendo[i]+'"'; 
    }
    str += '],\n';
    str +='"Tarefas Concluídas":[';
    for(var i=0; i<feito.length; i++){
      if(i != feito.length -1)
        str += '"'+feito[i]+'",';
      else
        str += '"'+feito[i]+'"'; 
    }
    str +=']\n';
    str +='}\n';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", '/atualizarList', true);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //userList = this.responseText;
        console.log("Salvo com sucesso!!!");
      }
    };
    xmlhttp.onerror = function() {
      console.log("Erro de conexão");
    }
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
    xmlhttp.send(str);
};



function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  var todoItemsList = document.getElementById("categorias");
  todoItemsList.innerHTML = "Categorias";

  // run through each item inside todos
  //todos.forEach(function(item) {
  todos.forEach(function(x){
    // check if the item is completed
    var li = document.createElement("li");
    li.appendChild(x.button);
    li.appendChild(x.input);
    li.appendChild(x.addButton);
    li.appendChild(x.list1);
    li.appendChild(x.list2);
    li.appendChild(x.list3);
    li.appendChild(x.br);
    todoItemsList.append(li);

  });
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

var concluirTarefa = function(){
	console.log("COncluir Tarefas");
	var listItem = this.parentElement;
	var tarefasFeitas = document.getElementById("conc:"+this.parentElement.parentElement.className);
	this.innerHTML = "Refazer";
	this.onclick = desfazerTarefa;
	tarefasFeitas.appendChild(listItem);
  //addToLocalStorage(todos)

}

var mvAndamento = function(){
  var listItem = this.parentElement;
  var andamento = document.getElementById("fzd:"+this.parentElement.parentElement.className);
  this.innerHTML = "Concluir";
  this.onclick = concluirTarefa;
  andamento.appendChild(listItem);
  //addToLocalStorage(todos)
}

var desfazerTarefa = function (){
	var listItem = this.parentElement;
	var tarefa = document.getElementById("af:"+this.parentElement.parentElement.className);
	this.innerHTML = "Começar a fazer";
	this.onclick = mvAndamento;
	tarefa.appendChild(listItem);
  //addToLocalStorage(todos)
}

var closeButton = function() {
      var listItem=this.parentNode;
      var ul=listItem.parentNode;
      //Remove the parent list item from the ul.
      ul.removeChild(listItem);var listItem=this.parentNode;
      //addToLocalStorage(todos)
};

// Create a new list item when clicking on the "Add" button
var newElement = function () {
  console.log(this.className);
  var li = document.createElement("li");
  var aux = document.getElementById("input:"+this.className).value;
  var t = document.createTextNode(this.className);
  var feito = document.createElement("button");
  feito.innerHTML = "Começar a fazer";
  feito.onclick = mvAndamento;
  li.appendChild(t);
  
  if (aux === '') {
    alert("Você deve escreve algo!");
  } else {
    document.getElementById("af:"+this.className).appendChild(li);
  }
  document.getElementById("input:"+this.className).value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" Apagar ");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = closeButton;
  li.appendChild(span);
  li.appendChild(feito);

  /*for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }*/
    //addToLocalStorage(todos);  
}

var newCategoria = function () {
  var categoria = document.getElementById("categorias");
  var li = document.createElement("li");
  var button = document.createElement("button");
  var inputValue = document.getElementById("myInput").value;
  button.innerHTML = inputValue;

  var addInput = document.createElement("input");
  addInput.type = "text";
  addInput.placeholder = "Título da tarefa...";
  addInput.style.display = "none";
  addInput.id = "input:" + inputValue;
  var addButton = document.createElement("button");
  var br = document.createElement("br");
  addButton.innerHTML = "Adicionar tarefa";
  addButton.style.display = "none";
  addButton.id = "addButton:" + inputValue;
  addButton.className = inputValue;
  var aFazer = document.createElement("ul");
  var aux = document.createElement("h2");
  aux.innerHTML = "Tarefas a fazer:";
  aFazer.appendChild(aux);
  aFazer.id = "af:" + inputValue;
  aFazer.className = inputValue;

  var fazendo = document.createElement("ul");
  var aux = document.createElement("h2");
  aux.innerHTML = "Tarefas em andamento:";
  fazendo.appendChild(aux);
  fazendo.id = "fzd:" + inputValue;
  fazendo.className = inputValue;

  var concluidas = document.createElement("ul");
  var aux = document.createElement("h2");
  aux.innerHTML = "Tarefas concluidas:";
  concluidas.appendChild(aux);
  concluidas.id = "conc:" + inputValue;
  concluidas.className = inputValue;
  aFazer.style.display = "none";
  fazendo.style.display = "none";
  concluidas.style.display = "none";
  
  if (inputValue === "") {
    alert("Você deve escrever algo!");
  } else {
    li.appendChild(button);
    li.appendChild(addInput);
    li.appendChild(addButton);
    li.appendChild(aFazer);
    li.appendChild(fazendo);
    li.appendChild(concluidas);
    li.appendChild(br);
    categoria.appendChild(li);
  }
  document.getElementById("myInput"). value = "";
  button.onclick = mostrarCategoria;
  addButton.onclick = newElement;

  salvarServidor(inputValue, aFazer, fazendo, concluidas);
  };

var mostrarCategoria = function () {
  document.getElementById("af:"+this.innerHTML).style.display = "block";
  document.getElementById("fzd:"+this.innerHTML).style.display = "block";
  document.getElementById("conc:"+this.innerHTML).style.display = "block";
  document.getElementById("input:"+this.innerHTML).style.display = "block";
  document.getElementById("addButton:"+this.innerHTML).style.display = "block";
  this.onclick = esconderCategoria;
  
};

var esconderCategoria = function(){
  document.getElementById("af:"+this.innerHTML).style.display = "none";
  document.getElementById("fzd:"+this.innerHTML).style.display = "none";
  document.getElementById("conc:"+this.innerHTML).style.display = "none";
  document.getElementById("input:"+this.innerHTML).style.display = "none";
  document.getElementById("addButton:"+this.innerHTML).style.display = "none";
  this.onclick = mostrarCategoria;
  
};

function getUserList(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/getUserList', true);
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        userList = this.responseText;
      }
  };
  xmlhttp.onerror = function() {
     console.log("Erro de conexão");
  }
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
  xmlhttp.send();
};