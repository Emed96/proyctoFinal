import termos_db from './data.js'

class Header{
    constructor(header, termos){
        this.header = header;
        this.termos = termos.termos;

        //Elementos Menu
        this.menu = header.querySelector(".menu");
        this.btnMenu = header.querySelector(".btnMenu");
        this.btnItemMenu = header.querySelectorAll('[data-btn-ItemMenu]');
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

        this.btnItemMenu.forEach(btnMenu => {
            btnMenu.addEventListener('click', () => {
                this.ocultarMenu();
            });
        });

        this.fondo2.addEventListener('click', this.ocultarMenu.bind(this));

        this.btnCarrito.addEventListener("click", () => {
            this.carrito.style.right = "0";
            this.fondo.style.display ="block";
            this.ocultarMenu();

            //Despliegue Articulos Carrito
            //console.log(sessionStorage.getItem("1"));
            this.desplgarArticulos();
        });

        this.fondo.addEventListener('click', () => {
            this.carrito.style.right = "-70vw";
            this.carrito.innerHTML = "";
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

    desplgarArticulos(){
        this.termos.forEach(termo => {
            const articulo = JSON.parse(sessionStorage.getItem(termo["id"]));
            if (articulo){
                this.carrito.innerHTML += 
                `<li class="cestaItem">

                    <div class="card" style="width: 14rem;">
                        <div class="imgTermo">
                            <img src="${termo["pathIMG"]}" alt="Termo-${termo["id"]}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${termo["nom"]}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary codigo">${termo["id"]}</h6>
                            <div class="card-text">
                                <span>${termo["tipo"]}</span>
                                <span>$${articulo*termo["precio"]}</span>
                            </div>
                            <div class="agregarCarrito">
                                <label for="cantidad-${termo["id"]}">
                                    <span>Cantidad</span>
                                </label>
                                <div class="cantidadCarritoHeader">
                                    <button type="button" class="btn-Menos" data-btnMenos>
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input class="cantidadCarrito" type="number" id="cantidad-${termo["id"]}" min="1" value="${articulo}">
                                    <button type="button" class="btn-Mas" data-btnMas>
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                                <button class="eliminarDelCarrito">
                                    <i class='bx bx-trash'></i>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </li>`;
            }
        });

        this.carrito.innerHTML += 
        `<button class="btnComprar" type="button">
            COMPRAR
        </button>`;
    }
}

const h = new Header(document.querySelector("[data-headerIndex]"), termos_db);

//IMAGENES EN EL CARRUSEL

const itemsIMG_Carrusel = 4;
const datosCarrusel = [
    {
        encabezado: "AQUI VA UN ENCABEZADO",
        parrafo: "Lorem ipsum dolor sit ametconsectetur adipisicing elit Eos aliquid aut libero quo In quos lorem1000"
    },
    {
        encabezado: "AQUI VA UN ENCABEZADO",
        parrafo: "Lorem ipsum dolor sit ametconsectetur adipisicing elit Eos aliquid aut libero quo In quos lorem1000"
    },
    {
        encabezado: "AQUI VA UN ENCABEZADO",
        parrafo: "Lorem ipsum dolor sit ametconsectetur adipisicing elit Eos aliquid aut libero quo In quos lorem1000"
    },
    {
        encabezado: "AQUI VA UN ENCABEZADO",
        parrafo: "Lorem ipsum dolor sit ametconsectetur adipisicing elit Eos aliquid aut libero quo In quos lorem1000"
    }
]
const itemsCarrusel = document.querySelector(".carousel-inner");

for (let i = 0; i < itemsIMG_Carrusel; i++) {
    if (i === 0) {
        itemsCarrusel.innerHTML += 
        `<div class="carousel-item active" data-bs-interval="5000">
            <div class="carrusel1Items carrusel1I${i+1}">
                <div class="imgPortada"></div>
                <div class="contPortada">
                    <h3>
                        ${datosCarrusel[i].encabezado}
                    </h3>
                    <p>
                        ${datosCarrusel[i].parrafo}
                    </p>
                </div>
            </div>
        </div>`
    } else {
        itemsCarrusel.innerHTML += 
        `<div class="carousel-item">
            <div class="carrusel1Items carrusel1I${i+1}">
                <div class="imgPortada"></div>
                <div class="contPortada">
                    <h3>
                        ${datosCarrusel[i].encabezado}
                    </h3>
                    <p>
                        ${datosCarrusel[i].parrafo}
                    </p>
                </div>
            </div>
        </div>`
    }
}
