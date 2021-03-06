// Armamos un NodeList object con los todo-list elements que figuran en pantalla apenas cargamos la página
let myNodeList = document.getElementsByTagName("LI"); 
// Contamos la cantidad de tareas pendientes apenas cargamos la página (que serían todas)
let pendingTasks=myNodeList.length;
// Tomamos el elementos del html en donde vamos a colocar la cantidad de tareas pendientes que quedan por hacer.
let itemsLeft=document.getElementById ("items-left"); 
// Creamos una función que nos va a contabilizar las tareas que nos quedan pendientes y mostrará ese número en pantalla. La ejecutamos por primera vez 
function numberOfItemsLeft (){
  itemsLeft.innerHTML= pendingTasks+" items left";
};
numberOfItemsLeft();
// Armamos un array en donde iremos guardando las tareas que se realizaron. 
let doneTasksArray=[]; 

// Creamos una función para crear el botón "close"
// function createCloseButton (element){
//   let img = document.createElement("img");
//   img.src="./images/icon-cross.svg";
//   img.className = "close";
//   // Usamos el evento "onclick" para que al tocar sobre el close eliminemos la tarea correspondiente
//   img.onclick = function() {
//     let div = this.parentElement; //devuele el elemento padre de "close" que sería el LI correspondiente
//     let divParent =div.parentElement; 
//     divParent.removeChild(div)
      
//     for (let index = 0; index < myUL.children.length; index++ ) {
//       pendingTasks=myUL.children.length;
      
//       if (myUL.children[index].classList.contains ("crossed-text")){ 
//         pendingTasks-=1
//         console.log (pendingTasks)
//         numberOfItemsLeft ()
//         return pendingTasks
//       }
     
//       return pendingTasks
      
//     }
//     return pendingTasks
//   }
//   return element.appendChild(img),pendingTasks;
// }

// Creamos una función para armar el checkbox
function createCheckbox (element,num){
  let checkbox =document.createElement ("INPUT");
  let labelCheckbox=document.createElement("LABEL");
  let img=document.createElement("img");
  // Le asignamos atributos al checkbox
  labelCheckbox.className="label-checkbox";
  checkbox.type ="checkbox";
  checkbox.className="checkbox";

  checkbox.id=`checkbox-${num}`;
  labelCheckbox.htmlFor=`checkbox-${num}`;

  img.src="./images/icon-check.svg";
  img.className="icon-check";
  img.style.display="none";

  labelCheckbox.appendChild(img);
  labelCheckbox.appendChild(checkbox);
  element.appendChild(labelCheckbox);
  
  // agregamos una escucha para tachar el texto cuando la tearea fue realizada 
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      element.classList.add("crossed-text");
      img.style.display="inherit";
      // Retornamos las tareas pendientes, agregamos al array de tareas realizadas la tarea que acabamos de marcar y actualizamos el número de tareas pendientes
      return pendingTasks-=1, doneTasksArray.push (element),numberOfItemsLeft (); 
    } else {
      //En caso de que no esté marcado el check, le quitamos el tachado a la tarea realizada
      element.classList.remove("crossed-text")
      img.style.display="none";
      // además quitamos la tarea realizada del array que habíamos armado
      let index=doneTasksArray.indexOf (element);
      doneTasksArray.splice(index, 1);
      return pendingTasks+=1, doneTasksArray,numberOfItemsLeft ();  
    }
  });
}

// Creamos un FOR para agregar a los elementos de la lista el checkbox y el botón close "X"
for (i = 0; i < myNodeList.length; i++) {
  // Llamamos a la función createCheckbox para agregarlo
  createCheckbox(myNodeList[i],i);
  // Llamamos a la función createCloseButton para agregarlo
  //createCloseButton (myNodeList[i]);
}

// Al presionar enter agregamos un elemento a la lista 
let myInput=document.getElementById ("myInput");
myInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      newElement()
  }
}); 
// Los checkbox tienen un id que depende de un número, para que las tareas que se agreguen también tenga un id adecuado, les agregaremos un número 
let number=myNodeList.length;

//Creamos un nuevo elemento de la lista 
function newElement() {
  number+=1;
  //creamos un li
  let li = document.createElement("li"); 
  // guardamos el input ingresado
  var inputValue = document.getElementById("myInput").value;
  //creamos un nodo con ese input 
  var t = document.createTextNode(inputValue);
  //lo agregamos dentro del LI
  li.appendChild(t);
  // chequeamos que el valor ingresado sea válido
  if (inputValue.trim ()) { //trim elimina espacios
    document.getElementById("myUL").appendChild(li);
  } else {
     alert("You must write something!"); 
  }
  document.getElementById("myInput").value = "";
  
  // Llamamos a la funcióon createCloseButton para agregarla al LI 
  //createCloseButton (li);

  // Llamamos a la función createCheckbox para agregarla al LI 
  createCheckbox(li,number);

  // como agregamos una tarea para hacer tenemos que sumar uno al pendingTasks
  pendingTasks+=1;
  numberOfItemsLeft ();
  return number;
}

// Botonces "all", "active", "completed", "clear completed"
let clearCompleted=document.getElementById("clear-completed");
let completed=document.getElementById("completed");
let all=document.getElementById("all");
let active=document.getElementById("active");

let completedMobile=document.getElementById("completed-mobile");
let allMobile=document.getElementById("all-mobile");
let activeMobile=document.getElementById("active-mobile");

let arrayButtons=[all,active,completed,clearCompleted];
let arrayButtonsMobile=[allMobile,activeMobile,completedMobile,clearCompleted];

// Cuando tocamos "completed" mostramos en pantalla solo las tareas que ya fueron realizadas
let myUL=document.getElementById("myUL");
// Cuando tocamos "completed" aparecen solo las tareas realizadas
function completedFunction (array){
    array[2].addEventListener ("click", function() {
        array[0].classList.remove("button-item-click");        
        array[1].classList.remove("button-item-click");
        array[2].classList.add("button-item-click");
        array[3].classList.remove("button-item-click");
      for (let index = 0; index < myUL.children.length; index++) {
        if (myUL.children[index].classList.contains ("crossed-text")){
          myUL.children[index].style.display="flex";
        } else  myUL.children[index].style.display="none";
        }
      });
}
completedFunction (arrayButtons);
completedFunction(arrayButtonsMobile);

// Cuando tocamos "all" nos aparecen todas las tareas
function allFunction (array){
    array[0].addEventListener("click", function(){
        array[0].classList.add("button-item-click");
        array[2].classList.remove("button-item-click");
        array[3].classList.remove("button-item-click");
        array[1].classList.remove("button-item-click");
        
        for (let index = 0; index < myUL.children.length; index++) {
          myUL.children[index].style.display="flex"
        }
      });
};
allFunction(arrayButtons);
allFunction(arrayButtonsMobile);

// Cuando tocamos "active" mostrammos solo las tareas que nos quedan pendientes
function activeFunction (array){
    array[1].addEventListener("click", function(){
        array[1].classList.add("button-item-click");
        array[2].classList.remove("button-item-click");
        array[3].classList.remove("button-item-click");
        array[0].classList.remove("button-item-click");
        for (let index = 0; index < myUL.children.length; index++) {
          if (myUL.children[index].classList.contains ("crossed-text")){
            myUL.children[index].style.display="none"
         } else  myUL.children[index].style.display="flex"
       }
      });
}
activeFunction(arrayButtons);
activeFunction(arrayButtonsMobile);

// Cuando tocamos "Clear completed" eliminamos de manera definitiva los elementos de la lista que ya fueron realizados
clearCompleted.addEventListener("click", function(){
  for (let index = 0; index < myUL.children.length; index++ ) {

    {if (myUL.children[index].classList.contains ("crossed-text")){ 
      myUL.removeChild(myUL.children[index]);
      // Al index le resto uno porque al haber eliminado un elemento de la lista se me corren los índices un lugar
      index-=1
      continue
      // El continue lo necesito para que el for no se frene al haberse cumplido al condición
   }}
 }
});

// Cambiar dark/light theme
let theme=document.getElementById("theme");
let backgroundImg= document.getElementById ("background-img");
theme.addEventListener( "click", ()=>{
    if (theme.classList.contains("sun-icon")){
        //ahora estamos en el light-theme
        // Cambiamos el Sol por la Luna
        theme.src="./images/icon-moon.svg";
        theme.classList.remove("sun-icon");
        theme.classList.add("moon-icon");
        // Cambiamos la imagen de fondo
        backgroundImg.src="./images/bg-desktop-light.jpg";
        backgroundImg.classList.remove("dark-background");
        backgroundImg.classList.add("light-background");
        // Tomamos todos los elementos que tienen la clase "dark-theme", los devuelve como una Node List
        let nodeListDarkTheme=document.querySelectorAll(".dark-theme"); 
        for (let index = 0; index < nodeListDarkTheme.length; index++){ 
            nodeListDarkTheme[index].classList.remove ("dark-theme");
            nodeListDarkTheme[index].classList.add ("light-theme");
            } 
    }else{
        // ahora estamos en el dark-theme
        // Cambiamos la Luna por el Sol
        theme.classList.add("sun-icon");
        theme.classList.remove("moon-icon");
        theme.src="./images/icon-sun.svg";
        // Cambiamos la imagen de fondo
        backgroundImg.src="./images/bg-desktop-dark.jpg";
        backgroundImg.classList.remove("light-background");
        backgroundImg.classList.add("dark-background");

        let nodeListLightTheme=document.querySelectorAll(".light-theme"); 

        for (let i = 0; i < nodeListLightTheme.length; i++) {
            nodeListLightTheme[i].classList.remove ("light-theme");
            nodeListLightTheme[i].classList.add ("dark-theme");
        }   
    }
})