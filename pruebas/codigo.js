
// Create a "close" button and append it to each list item
let myNodeList = document.getElementsByTagName("LI"); // arma un NodeList object con los todo-list elements.
// array de tareas pendientes 
let pendingTasks=myNodeList.length;
for (i = 0; i < myNodeList.length; i++) {
    var span = document.createElement("SPAN");
    //creamos el checkbox
    let checkbox =document.createElement ("INPUT");
    // Assigning the attributes to created checkbox 
        checkbox.type ="checkbox";
        checkbox.className="checkbox";
    //lo agregamos al LI
    myNodeList[i].appendChild(checkbox);

// tachado cuando el checkbox está marcado
    let myNodeElement=myNodeList[i]
      checkbox.addEventListener('change', function() {
      if (this.checked) {
        myNodeElement.classList.add("crossed-text"); 
        
        return pendingTasks-=1;
      } else {
        myNodeElement.classList.remove("crossed-text");
        doneTasks-=1;
        return pendingTasks+=1;
      }
    });

    var txt = document.createTextNode("\u00D7");
    // le asignamos atributos al elemento "X"
        span.className = "close";
        span.appendChild(txt);
    //lo agregamos al LI   
    myNodeList[i].appendChild(span);
}




// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close"); //toma todos los elementos "close" y devuelve un HTML Collection, simil a un array
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement; //devuele el elemento padre de "close" que sería el LI correspondiente
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item

// !este debería modificarlo para que haga el check sobre un checkbox, para eso deberia agregar un checkbox :D
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  //creamos un li
  var li = document.createElement("li"); 
  // guardamos el input ingresado
  var inputValue = document.getElementById("myInput").value;
  //creamos un nodo con ese input 
  var t = document.createTextNode(inputValue);
  //lo agregamos dentro del LI
  li.appendChild(t);
  // chequeamos que el valor ingresado sea válido
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);  
  }
  document.getElementById("myInput").value = "";
  //completamos el Li con "x"
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  // como agregamos una tarea para hacer tenemos que sumar uno al pendindTasks
  pendingTasks+=1;

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  let checkbox =document.createElement ("INPUT");
    // Assigning the attributes to created checkbox 
        checkbox.type ="checkbox";
        checkbox.className="checkbox";
        checkbox.type = "checkbox";
    //lo agregamos al LI
    li.appendChild(checkbox);

    // tachado cuando el checkbox está marcado
    //debería agregar un event listener 
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        li.classList.add("crossed-text");
        return pendingTasks-=1;
      } else {
          li.classList.remove("crossed-text")
          return pendingTasks+=1;

      }
    });
}
