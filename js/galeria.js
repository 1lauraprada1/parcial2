// Array con los datos de las obras
let obras = [
    {
        nombre: "Still Life (RGB B)",
        anio: "2016-2021",
        imagen: "img/reas-1.jpg"
    },
    {
        nombre: "Path 24",
        anio: 2001,
        imagen: "img/reas-2.jpg"
    },
    {
        nombre: "Still Life (HSB E)",
        anio: 2023,
        imagen: "img/reas-3.jpg"
    },
    {
        nombre: "Software Structures",
        anio: 2001,
        imagen: "img/reas-4.jpg"
    },
    {
        nombre: "Process Compendium",
        anio: 2004,
        imagen: "img/reas-5.jpg"
    }
];

// Buscamos el lugar donde se va a mostrar la galería
let galeria = document.querySelector("#galeria");

// Recorremos el array para crear cada obra
for (let i = 0; i < obras.length; i++) {

    let obra = document.createElement("div");

    obra.innerHTML = `
        <img src="${obras[i].imagen}" alt="${obras[i].nombre}">
        <h3>${obras[i].nombre}</h3>
        <p>${obras[i].anio}</p>
    `;

    galeria.appendChild(obra);
}

// Buscamos el botón
let boton = document.querySelector("#cambiarDiseno");

// Cuando se hace click, ejecutamos la función
boton.addEventListener("click", cambiarDiseno);

// Función para cambiar el tamaño de las imágenes
function cambiarDiseno() {
    let imagenes = document.querySelectorAll("#galeria img");

    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].style.width = "300px";
    }
}