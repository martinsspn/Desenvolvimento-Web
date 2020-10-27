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

// Click on a close button to hide the current list item
/*var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}*/

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
// Move task to "done category"
var concluirTarefa = function(){
	console.log("Concluir Tarefas");
	var listItem = this.parentElement;
	var tarefasFeitas = document.getElementById("conc:"+this.parentElement.parentElement.className);
	this.innerHTML = "Refazer";
	this.onclick = desfazerTarefa;
	tarefasFeitas.appendChild(listItem);

}

var mvAndamento = function(){
  var listItem = this.parentElement;
  var andamento = document.getElementById("fzd:"+this.parentElement.parentElement.className);
  this.innerHTML = "Concluir";
  this.onclick = concluirTarefa;
  andamento.appendChild(listItem);
}

var desfazerTarefa = function (){
	var listItem = this.parentElement;
	var tarefa = document.getElementById("af:"+this.parentElement.parentElement.className);
	this.innerHTML = "Começar a fazer";
	this.onclick = mvAndamento;
	tarefa.appendChild(listItem);
}

var closeButton = function() {
      var listItem=this.parentNode;
      var ul=listItem.parentNode;
      //Remove the parent list item from the ul.
      ul.removeChild(listItem);var listItem=this.parentNode;
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
}

var newCategoria = function () {
  var categoria = document.getElementById("categorias");
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
    categoria.appendChild(button);
    categoria.appendChild(addInput);
    categoria.appendChild(addButton);
    categoria.appendChild(aFazer);
    categoria.appendChild(fazendo);
    categoria.appendChild(concluidas);
    categoria.appendChild(br);
    
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

