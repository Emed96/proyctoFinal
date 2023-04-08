
//MOSTRAR Y OCULTAR EL MENU

// const btnMenu = document.querySelector(".btnMenu");
// const menu = document.querySelector(".menu");

// btnMenu.addEventListener("click", () => {
//     const linea1 = document.querySelector(".barra-linea1");
//     const linea2 = document.querySelector(".barra-linea2");
//     const linea3 = document.querySelector(".barra-linea3");
//     const fondo2 = document.querySelector(".fondoObscuro2")

//     linea1.classList.toggle("barra-linea1Active");
//     linea2.classList.toggle("barra-linea2Active");
//     linea3.classList.toggle("barra-linea3Active");
//     menu.classList.toggle("menuActive");
//     fondo2.classList.toggle("fondoObscuro2Active");
// });

// //MOSTRAR Y OCULTAR EL CARRITO

// const btnCarrito = document.querySelector(".btnCarrito");
// const fondo = document.querySelector(".fondoObscuro");
// const carrito = document.querySelector(".cesta");

// btnCarrito.addEventListener("click", () => {
//     carrito.style.right = "0";
//     fondo.style.display ="block";
// });

// fondo.addEventListener("click", () => {
//     carrito.style.right = "-70vw";
//     fondo.style.display = "none"
// })

class Header{
    constructor(header){
        this.header = header;

        //Elementos Menu
        this.menu = header.querySelector(".menu");
        this.btnMenu = header.querySelector(".btnMenu");
        this.linea1 = header.querySelector(".barra-linea1");
        this.linea2 = header.querySelector(".barra-linea2");
        this.linea3 = header.querySelector(".barra-linea3");
        this.fondo2 = header.querySelector(".fondoObscuro2");

        //Elementos Carrito
        this.carrito = header.querySelector(".cesta");
        this.btnCarrito = header.querySelector(".btnCarrito");
        this.fondo = header.querySelector(".fondoObscuro");

        this.btnMenu.addEventListener('click', () => {
            if (this.menu.style.left.toString() === "0px") {
                this.ocultarMenu();
            } else {
                this.mostrarMenu();
            }
        });

        this.fondo2.addEventListener('click', this.ocultarMenu.bind(this));

        this.btnCarrito.addEventListener("click", () => {
            this.carrito.style.right = "0";
            this.fondo.style.display ="block";
            this.ocultarMenu();
        });

        this.fondo.addEventListener('click', () => {
            this.carrito.style.right = "-70vw";
            this.fondo.style.display = "none";
        })
    }

    ocultarMenu(){
        this.menu.style.left = "-60vw";
        this.linea1.style.transform = "none";
        this.linea2.style.opacity = "100%";
        this.linea3.style.transform = "none";
        this.fondo2.style.display = "none";
    }

    mostrarMenu(){
        this.menu.style.left = "0";
        this.linea1.style.transform = "translate(10%, -45%) rotate(45deg)";
        this.linea2.style.opacity = "0";
        this.linea3.style.transform = "translate(10%, 50%) rotate(-45deg)";
        this.fondo2.style.display = "block";
    }
}

const h = new Header(document.querySelector("[data-headerIndex]"));
