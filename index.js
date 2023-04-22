const TAREAS = "tareas";
let tareas_bd = [];

//filter change

const textArea = document.getElementById("textarea");
const checkbox = document.getElementById("urgente");
const guardar = document.getElementById("guardar");
const limpiar = document.getElementById("limpiar");
const itemsList = document.getElementById("items");

const textArea1 = document.getElementById("textarea1");
const checkbox1 = document.getElementById("urgente1");
const guardarmod = document.getElementById("guardarmod");
const close = document.getElementById("close");

let descripcion = "";
let esUrgente = false;
let id = 1;
let clickedIndex = 0;
let modalDescripcion = "";
let modalEsUrgente = "";

window.onload = function () {
  const ls = localStorage.getItem(TAREAS);

  if (ls) {
    tareas_bd = JSON.parse(ls);
    id = tareas_bd[tareas_bd.length - 1].id + 1;
  }

  Actualizar();
};

textArea.addEventListener("change", (e) => {
  descripcion = e.target.value;
});

checkbox.addEventListener("change", (e) => {
  esUrgente = e.target.checked;
});

guardar.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  tareas_bd.push({
    descripcion: descripcion,
    urgente: esUrgente,
    id,
  });
  id++;
  localStorage.setItem(TAREAS, JSON.stringify(tareas_bd));
  Actualizar();
  addEventListener();
  Limpiar();
});

limpiar.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  Limpiar();
});

textArea1.addEventListener("change", (e) => {
  modalDescripcion = e.target.value;
});

checkbox1.addEventListener("change", (e) => {
  modalEsUrgente = e.target.checked;
});

guardarmod.addEventListener("click", () => {
  const arraySinUnElemento = tareas_bd.filter(
    (tarea) => tarea.id !== clickedIndex
  );

  arraySinUnElemento.push({
    id: clickedIndex,
    descripcion: modalDescripcion,
    urgente: modalEsUrgente,
  });

  tareas_bd = arraySinUnElemento;
  localStorage.setItem(TAREAS, JSON.stringify(tareas_bd));
  Actualizar();
  addEventListener();
  close.click();
});

function Actualizar() {
  itemsList.innerHTML = null;
  tareas_bd = tareas_bd.sort((a, b) => a.id - b.id);
  tareas_bd.forEach((element) => {
    itemsList.innerHTML += `<div>
    <li>${element.descripcion} 
    </li> 
    <a class="btn btn-warning" 
    id=${element.id}
    data-bs-toggle="modal" 
    data-bs-target="#exampleModal"
    >Modificar</a><button id=${element.id} class="btn btn-danger s">Eliminar</button></div>`;
  });
}

function Limpiar() {
  textArea.value = "";
  checkbox.checked = false;
}

function addEventListener() {
  const aList = document.querySelectorAll("a");
  aList.forEach((element) => {
    element.addEventListener("click", function (e) {
      clickedIndex = +e.target.id; //convierte el string en number
      const elemento = tareas_bd.filter((tarea) => tarea.id === +e.target.id); //devuelve array
      textArea1.value = elemento[0].descripcion;
      checkbox1.checked = elemento[0].urgente;
    });
  });

  const buttonList = document.querySelectorAll(".s");

  buttonList.forEach((element) => {
    element.addEventListener("click", (e) => {
      const confirmado = confirm("desea eliminar el registro??");

      if (confirmado) {
        const arraySinUnElemento = tareas_bd.filter(
          (tarea) => tarea.id !== +e.target.id
        );
        console.log(arraySinUnElemento);
        tareas_bd = arraySinUnElemento;
        localStorage.setItem(TAREAS, JSON.stringify(tareas_bd));
        Actualizar();
        addEventListener();
      }
    });
  });
}
