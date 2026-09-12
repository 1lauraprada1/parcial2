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
function calcularResultados() {

    let horas = Number(document.querySelector("#horas").value);
    let honorario = Number(document.querySelector("#honorario").value);

    // Validamos los datos generales
    if (horas < 1 || honorario < 1) {
        alert("Ingresá correctamente las horas y el honorario.");
        return;
    }

    // 1. Calculamos el costo de un día de trabajo
    let totalPersonas = 0;

    for (let i = 0; i < instalaciones.length; i++) {
        totalPersonas += instalaciones[i].personas;
    }

    let costoDia = totalPersonas * horas * honorario;


    // 2. Buscamos la instalación que necesita más días
    let instalacionMayor = instalaciones[0];

    for (let i = 1; i < instalaciones.length; i++) {

        if (instalaciones[i].dias > instalacionMayor.dias) {
            instalacionMayor = instalaciones[i];
        }
    }


    // Calculamos el costo de la instalación que más días necesita
    let costoInstalacionMayor =
        instalacionMayor.personas *
        horas *
        honorario *
        instalacionMayor.dias;


    // Calculamos el costo total de todas las instalaciones
    let costoTotal = 0;

    for (let i = 0; i < instalaciones.length; i++) {

        costoTotal +=
            instalaciones[i].personas *
            horas *
            honorario *
            instalaciones[i].dias;
    }


    // 3. Calculamos el porcentaje
    let porcentaje =
        (costoInstalacionMayor / costoTotal) * 100;


    // Mostramos los resultados
    let contenedor = document.querySelector("#instalaciones");

    contenedor.innerHTML = `
        <h2>Resultados</h2>

        <p>
            <strong>Costo total de un día de trabajo:</strong>
            $${costoDia}
        </p>

        <p>
            <strong>Instalación que necesita más días:</strong>
            ${instalacionMayor.nombre}
        </p>

        <p>
            <strong>Días de producción:</strong>
            ${instalacionMayor.dias}
        </p>

        <p>
            <strong>Costo total de esa instalación:</strong>
            $${costoInstalacionMayor}
        </p>

        <p>
            <strong>Porcentaje del costo total:</strong>
            ${porcentaje.toFixed(2)}%
        </p>

        <button id="reiniciar">Reiniciar</button>
    `;


    // Habilitamos el botón Reiniciar
    let reiniciar = document.querySelector("#reiniciar");

    reiniciar.addEventListener("click", reiniciarPrograma);
}


// Función para reiniciar todo
function reiniciarPrograma() {
    location.reload();
}