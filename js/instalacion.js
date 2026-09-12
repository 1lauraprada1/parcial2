console.log("Estoy en datos.html");

// Array con los datos curiosos
let datosCuriosos = [
    "Casey Reas es co-creador de Processing.",
    "Reas desarrolló Processing junto a Ben Fry.",
    "Muchas de sus obras se generan mediante reglas y algoritmos.",
    "Casey Reas ha realizado impresiones generativas de gran formato.",
    "Su obra está relacionada con el arte generativo."
];

// Buscamos dónde mostrar el dato
let datoCurioso = document.querySelector("#datoCurioso");

// Buscamos el botón
let boton = document.querySelector("#nuevoDato");

// Función para mostrar un dato al azar
function mostrarDato() {
    let numero = Math.floor(Math.random() * datosCuriosos.length);

    datoCurioso.innerText = datosCuriosos[numero];
}

// Cuando hacemos click, mostramos un nuevo dato
boton.addEventListener("click", mostrarDato);

// Mostramos un dato al entrar a la página
mostrarDato();


// INSTALACIONES

// Buscamos el botón Comenzar
let comenzar = document.querySelector("#comenzar");

// Cuando hacemos click, iniciamos la carga
comenzar.addEventListener("click", iniciar);


// Variables que vamos a necesitar
let cantidadInstalaciones;
let numeroInstalacion = 0;
let instalaciones = [];


// Función que comienza el ejercicio
function iniciar() {

    cantidadInstalaciones = Number(
        document.querySelector("#cantidadInstalaciones").value
    );

    if (cantidadInstalaciones < 1) {
        alert("Ingresá una cantidad válida.");
        return;
    }

    // Deshabilitamos la cantidad para que no se pueda cambiar
    document.querySelector("#cantidadInstalaciones").disabled = true;
    comenzar.disabled = true;

    // Mostramos la primera instalación
    mostrarInstalacion();
}


// Función para mostrar una instalación
function mostrarInstalacion() {

    let contenedor = document.querySelector("#instalaciones");

    contenedor.innerHTML = `
        <h3>Instalación ${numeroInstalacion + 1}</h3>

        <label>Nombre:</label>
        <input type="text" id="nombreInstalacion">

        <label>Personas:</label>
        <input type="number" id="personas" min="1">

        <label>Días:</label>
        <input type="number" id="dias" min="1">

        <button id="siguiente">Guardar instalación</button>
    `;

    let siguiente = document.querySelector("#siguiente");

    siguiente.addEventListener("click", guardarInstalacion);
}


// Función para guardar los datos
function guardarInstalacion() {

    let nombre = document.querySelector("#nombreInstalacion").value;
    let personas = Number(document.querySelector("#personas").value);
    let dias = Number(document.querySelector("#dias").value);

    // Validamos los datos
    if (nombre == "" || personas < 1 || dias < 1) {
        alert("Completá todos los datos correctamente.");
        return;
    }

    // Guardamos los datos de la instalación
    instalaciones.push({
        nombre: nombre,
        personas: personas,
        dias: dias
    });

    numeroInstalacion++;

    // Si todavía faltan instalaciones
    if (numeroInstalacion < cantidadInstalaciones) {

        mostrarInstalacion();

    } else {

        // Ya terminamos todas las instalaciones
        mostrarDatosGenerales();
    }
}


// Función para pedir horas y honorario
function mostrarDatosGenerales() {

    let contenedor = document.querySelector("#instalaciones");

    contenedor.innerHTML = `
        <h3>Datos generales del estudio</h3>

        <label>Horas de trabajo por día:</label>
        <input type="number" id="horas" min="1">

        <label>Honorario por hora:</label>
        <input type="number" id="honorario" min="1">

        <button id="calcular">Calcular resultados</button>
    `;

    let calcular = document.querySelector("#calcular");

    calcular.addEventListener("click", calcularResultados);
}