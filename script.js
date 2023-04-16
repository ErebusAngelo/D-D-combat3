
// Definimos un array vacío para guardar los personajes
let personajes = [];

// Función que agrega un personaje a la lista
function agregarPersonaje() {
  // Obtenemos los valores de los inputs
  const nombre = document.getElementById("nombre").value;
  let combate = document.getElementById("combate").value;
  let PGM= document.getElementById("PGM").value;
  let iniciativa = document.getElementById("iniciativa").value;
  const CA = document.getElementById("CA").value;
  // Creamos un objeto con los valores
  const personaje = {
    nombre: nombre,
    combate: combate,
    PGM: PGM,
    iniciativa: iniciativa,
    CA: CA,
    
  };

  // Agregamos el objeto al array
  personajes.push(personaje);

  // Limpiamos los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("combate").value = "";
  document.getElementById("PGM").value = "";
  document.getElementById("iniciativa").value = "";
  document.getElementById("CA").value = "";



  // Ordenamos el array por iniciativa de mayor a menor
  personajes.sort((a, b) => b.iniciativa - a.iniciativa);
  
  // Actualizamos la lista de personajes
  actualizarLista();
}

// Función que actualiza la lista de personajes
function actualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  
  
}

// Función que modifica los puntos de golpe de un personaje en el array y actualiza la lista
function modificarPG(index, cantidad) {
  // Obtenemos el valor actual de los puntos de golpe del personaje
  let pgActual = parseInt(personajes[index].combate);

  // Actualizamos el valor de los puntos de golpe
  pgActual += cantidad;

  // Verificamos que los puntos de golpe no sean negativos
  if (pgActual < 0) {
    pgActual = 0;
  }

  // Actualizamos los puntos de golpe del personaje en el array
  personajes[index].combate = pgActual.toString();

  // Actualizamos la lista de personajes
  actualizarLista();
}
// Función que modifica un atributo de un personaje en el array y actualiza la lista
function modificarAtributo(index, atributo, valor) {
  // Actualizamos el valor del atributo
  personajes[index][atributo] = valor;

  // Ordenamos el array por iniciativa de mayor a menor
  personajes.sort((a, b) => b.iniciativa - a.iniciativa);

  // Actualizamos la lista de personajes
  actualizarLista();
}

// Función que maneja el evento de presionar el botón "-" para disminuir los puntos de golpe
function restarPuntosDeGolpe(index) {
  const personaje = personajes[index];
  if (personaje.combate > 0) {
    personaje.combate--;
    actualizarLista();
  }
}

// Función que maneja el evento de presionar el botón "+" para aumentar los puntos de golpe
function sumarPuntosDeGolpe(index) {
  const personaje = personajes[index];
  personaje.combate++;
  actualizarLista();
}

// Función que elimina un personaje del array y actualiza la lista
function eliminarPersonaje(index) {
  // Eliminamos el personaje del array
  personajes.splice(index, 1);

  // Actualizamos la lista de personajes
  actualizarLista();
}

// Agregamos una variable global para almacenar una referencia al botón global
let btnGlobal;
// Función que actualiza la lista de personajes
function actualizarLista() {
  const lista = document.getElementById("lista");

  // Eliminamos todos los elementos li existentes
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Recorremos el array de personajes y creamos un elemento li por cada uno
  personajes.forEach((personaje, index) => {
    const li = document.createElement("li");
    hp = personaje.combate 
    li.innerHTML = `
      <span>${personaje.nombre} - Iniciativa <input type="number" id="ini" min="0" value="${personaje.iniciativa}" onchange="modificarAtributo(${index}, 'iniciativa', event.target.value)"> - <img src="
      ./CA.png" alt="Descripción de la imagen"> ${personaje.CA} 
      <label for="Estado"></label>
      <input type="number" placeholder ="CA Bonus" id="CAB" class="bar" name="PGT">
      </span>
      <span id="PGpg">
        <button onclick="restarPuntosDeGolpe(${index})">-</button>
        PG actuales: ${personaje.combate}
        <button onclick="sumarPuntosDeGolpe(${index})">+</button>
        PG Maximos: ${personaje.PGM}
      </span>
      <span id="estadotemp">
      <label for="Tempora"></label>
      <input type="number" placeholder ="PG temporales" id="PGT" class="bar" name="PGT">
      <label for="Estado"></label>
      <input type="text" placeholder ="Estado" id="Estado" class="bar" name="Estado"></span>
      <button onclick="eliminarPersonaje(${index})">Eliminar</button>
    `;
    
    // Agregamos el elemento li a la lista
    lista.appendChild(li);
  });

  // Creamos el botón global si aún no existe
  if (!btnGlobal) {
    btnGlobal = document.createElement("button");
    btnGlobal.textContent = "Descanso largo";
    btnGlobal.onclick = actualizarTodosLosPG;
    document.body.appendChild(btnGlobal);
  }
}




// Agregamos la función actualizarTodosLosPG()
function actualizarTodosLosPG() {
  // Recorremos el array de personajes y actualizamos los valores de combate
  personajes.forEach((personaje) => {
    personaje.combate = personaje.PGM;
  });
  actualizarLista();
}

// Agregamos la función reemplazarPuntosDeGolpe()
function reemplazarPuntosDeGolpe(index) {
  personajes[index].combate = personajes[index].PGM;
  actualizarLista();
}
const cambiarTurnoBtn = document.getElementById("cambiar-turno");
let turnoActual = 0;


function cambiarTurno() {
  const personajes = document.querySelectorAll("li");
  personajes[turnoActual].classList.remove("resaltado");
  turnoActual = (turnoActual + 1) % personajes.length;
  personajes[turnoActual].classList.add("resaltado");
}

cambiarTurnoBtn.addEventListener("click", cambiarTurno);

