var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" Apagar");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var todoForm = document.querySelector('.toDoForm');
//let todos = [];

todoForm.addEventListener('submit', function(event){
  event.preventDefault();
  newCategoria();
});

var sairForm = document.querySelector('.sair');
sairForm.addEventListener('submit', function(event){
  event.preventDefault();
  sair();
});

window.onload = getUserList();

function sair(){
  console.log("s");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/sair', true);
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        window.location = this.responseText;
      }
  };
  xmlhttp.onerror = function() {
     console.log("Erro de conexão");
  }
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
  xmlhttp.send();
}

var result = "Sucess!";

function salvarServidor(x, aFazer, fazendo, feito, operacao){
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
    str +='&'+operacao;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", '/atualizarList', true);
    xmlhttp.onerror = function() {
      console.log("Erro de conexão");
    }
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
    xmlhttp.send(str);
};

function renderTodos(list) {
  var categoria = document.getElementById("categorias");
  let elt = JSON.parse(list);
  let todos = Object.keys(elt);
  var child = categoria.lastElementChild;
  while(child){
    categoria.removeChild(child);
    child = categoria.lastElementChild;
  }
  for(var i=0; i<todos.length;i++){
    var element = elt[todos[i]];
    var li = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");
    var button = document.createElement("button");
    var addInput = document.createElement("input");
    var addButton = document.createElement("button");
    var br = document.createElement("br");
    var aFazer = document.createElement("ul");
    var fazendo = document.createElement("ul");
    var concluidas = document.createElement("ul");
    var aux = document.createElement("h2");
    var aux1 = document.createElement("h2");
    var aux2= document.createElement("h2");
    var spanCat = document.createElement("SPAN");
    var txtSpan = document.createTextNode(" x ");
    spanCat.className = element["Nome"];
    spanCat.appendChild(txtSpan);
    spanCat.onclick = closeCatButton;
    button.innerHTML = element["Nome"];
    addInput.type = "text";
    addInput.placeholder = "Título da tarefa...";
    addInput.style.display = "none";
    addInput.id = "input:" + element["Nome"];
    addButton.innerHTML = "Adicionar tarefa";
    addButton.style.display = "none";
    addButton.id = "addButton:" + element["Nome"];
    addButton.className = element["Nome"];
    aux.innerHTML = "Tarefas a fazer";
    aFazer.appendChild(aux);
    aux1.innerHTML = "Tarefas em andamento";
    fazendo.appendChild(aux1);
    aux2.innerHTML = "Tarefas Concluídas";
    concluidas.appendChild(aux2);
    for(var j=0;j<element["Tarefas a fazer"].length;j++){
      li2 = document.createElement("li");
      var t = document.createTextNode(element["Tarefas a fazer"][j]);
      var feito = document.createElement("button");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode(" Apagar ");
      feito.innerHTML = "Começar a fazer";
      feito.onclick = mvAndamento;
      li2.appendChild(t);
      span.className = "close";
      span.appendChild(txt);
      span.onclick = closeButton;
      li2.appendChild(span);
      li2.appendChild(feito);
      aFazer.appendChild(li2);  
    }
    for(var j=0;j<element["Tarefas em andamento"].length;j++){
      li3 = document.createElement("li");
      var t = document.createTextNode(element["Tarefas em andamento"][j]);
      var feito = document.createElement("button");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode(" Apagar ");
      feito.innerHTML = "Concluir";
      feito.onclick = concluirTarefa;
      li3.appendChild(t);
      span.className = "close";
      span.appendChild(txt);
      span.onclick = closeButton;
      li3.appendChild(span);
      li3.appendChild(feito);
      fazendo.appendChild(li3);  
    }
    for(var j=0;j<element["Tarefas Concluídas"].length;j++){
      li4 = document.createElement("li");
      var t = document.createTextNode(element["Tarefas Concluídas"][j]);
      var feito = document.createElement("button");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode(" Apagar ");
      feito.innerHTML = "Refazer";
      feito.onclick = desfazerTarefa;
      li4.appendChild(t);
      span.className = "close";
      span.appendChild(txt);
      span.onclick = closeButton;
      li4.appendChild(span);
      li4.appendChild(feito);
      concluidas.appendChild(li4);  
    }
    aFazer.id = "af:" + element["Nome"];
    aFazer.className = element["Nome"];
    fazendo.id = "fzd:" + element["Nome"];
    fazendo.className = element["Nome"];
    concluidas.id = "conc:" + element["Nome"];
    concluidas.className = element["Nome"];
    aFazer.style.display = "none";
    fazendo.style.display = "none";
    concluidas.style.display = "none";
    li.appendChild(button);
    li.appendChild(spanCat);
    li.appendChild(addInput);
    li.appendChild(addButton);
    li.appendChild(aFazer);
    li.appendChild(fazendo);
    li.appendChild(concluidas);
    li.appendChild(br);
    categoria.appendChild(li);
    button.onclick = mostrarCategoria;
    addButton.onclick = newElement;
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

var concluirTarefa = function(){
	console.log("Concluir Tarefas");
	var aux = this.parentElement.innerHTML.split('<');
  var listItem = this.parentElement;
	var tarefasFeitas = document.getElementById("conc:"+this.parentElement.parentElement.className);
	this.innerHTML = "Refazer";
	this.onclick = desfazerTarefa;
	tarefasFeitas.appendChild(listItem);
  var list = [];
  list.push(aux[0]);
  salvarServidor(this.parentElement.parentElement.className, [], [], list, "concluir");
}

var mvAndamento = function(){
  var aux = this.parentElement.innerHTML.split('<');
  var listItem = this.parentElement;
  var andamento = document.getElementById("fzd:"+this.parentElement.parentElement.className);
  this.innerHTML = "Concluir";
  this.onclick = concluirTarefa;
  andamento.appendChild(listItem);
  var list = [];
  list.push(aux[0]);
  salvarServidor(this.parentElement.parentElement.className, [], list, [], "mvAndamento");
};

var desfazerTarefa = function (){
	var aux = this.parentElement.innerHTML.split('<');
  var listItem = this.parentElement;
	var tarefa = document.getElementById("af:"+this.parentElement.parentElement.className);
	this.innerHTML = "Começar a fazer";
	this.onclick = mvAndamento;
	tarefa.appendChild(listItem);
  var list = [];
  list.push(aux[0]);
  salvarServidor(this.parentElement.parentElement.className, list, [], [], "refazer");
};

var closeButton = function() {
  var aux = this.parentElement.innerHTML.split('<');
  var x = this.parentElement.parentElement.className;
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
  var list = [];
  list.push(aux[0]);
  if(aux[3] === "button>Começar a fazer"){
    salvarServidor(x, list, [], [], "apagar");
  }else if(aux[3] === "button>Concluir"){
    salvarServidor(x, [], list, [], "apagar");
  }else{
    salvarServidor(x, [], [], list, "apagar");
  }
};

var closeCatButton = function() {
  document.getElementById("categorias").removeChild(this.parentElement);    
  salvarServidor(this.className, [], [], [], "removerCategoria");
};

var newElement = function () {
  var li = document.createElement("li");
  var aux = document.getElementById("input:"+this.className).value;
  var t = document.createTextNode(aux);
  var feito = document.createElement("button");
  var aFazer = [];
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" Apagar ");
  document.getElementById("input:"+this.className).value = "";
  feito.innerHTML = "Começar a fazer";
  feito.onclick = mvAndamento;
  li.appendChild(t);
  span.className = "close";
  span.appendChild(txt);
  span.onclick = closeButton;
  li.appendChild(span);
  li.appendChild(feito);
  if (aux === '') {
    alert("Você deve escreve algo!");
  } else {
    aFazer.push(aux);
    salvarServidor(this.className, aFazer, [], [], "addElement");
    var nodesChilds = document.getElementById("af:"+this.className).childNodes;
    nodesChilds.forEach(function(x){
      var y = x.innerHTML.split('<');
      if(y[0] === aux){
        result = "1";
      }
    })
    if(result === "Sucess!"){
      document.getElementById("af:"+this.className).appendChild(li);
    }else if(result === "1"){
      alert("Elemento já existente!");
    }
  }
};

var newCategoria = function () {
  var categoria = document.getElementById("categorias");
  var nodesChilds = categoria.childNodes;
  var inputValue = document.getElementById("myInput").value;
  var exist = false;
  nodesChilds.forEach(function(x){
    if(x.firstChild != null){
      if(inputValue === x.firstChild.innerHTML){
          alert("Categoria já existe!!!");
          exist = true;
      }
    }
  });
  if(exist){
    return -1;
  }
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" x ");
  var li = document.createElement("li");
  var button = document.createElement("button");
  var addInput = document.createElement("input");
  var addButton = document.createElement("button");
  var br = document.createElement("br");
  var aux = document.createElement("h2");
  var aux2 = document.createElement("h2");
  var aux3 = document.createElement("h2");
  var aFazer = document.createElement("ul");
  var fazendo = document.createElement("ul");
  var concluidas = document.createElement("ul");
  span.className = inputValue;
  span.appendChild(txt);
  span.onclick = closeCatButton;
  button.innerHTML = inputValue;
  addInput.type = "text";
  addInput.placeholder = "Título da tarefa...";
  addInput.style.display = "none";
  addInput.id = "input:" + inputValue;
  addButton.innerHTML = "Adicionar tarefa";
  addButton.style.display = "none";
  addButton.id = "addButton:" + inputValue;
  addButton.className = inputValue;
  aux.innerHTML = "Tarefas a fazer:";
  aFazer.appendChild(aux);
  aFazer.id = "af:" + inputValue;
  aFazer.className = inputValue;
  aux2.innerHTML = "Tarefas em andamento:";
  fazendo.appendChild(aux2);
  fazendo.id = "fzd:" + inputValue;
  fazendo.className = inputValue;
  aux3.innerHTML = "Tarefas concluidas:";
  concluidas.appendChild(aux3);
  concluidas.id = "conc:" + inputValue;
  concluidas.className = inputValue;
  aFazer.style.display = "none";
  fazendo.style.display = "none";
  concluidas.style.display = "none";
  if (inputValue === "") {
    alert("Você deve escrever algo!");
  } else {
    salvarServidor(inputValue, [], [], [], "addCategoria")
    li.appendChild(button);
    li.appendChild(span);
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
        //userList = this.responseText;
        var x = this.responseText;
        renderTodos(x.toString());
      }
  };
  xmlhttp.onerror = function() {
     console.log("Erro de conexão");
  }
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
  xmlhttp.send();
};