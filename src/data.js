const acero1 = async () => {
    const pet = await fetch('../data/acero.json');
    const res = await pet.json()
    return res
}

const acrilico1 = async () => {
    const pet = await fetch('../data/acrilico.json');
    const res = await pet.json()
    return res
}

const plastico1 = async () => {
    const pet = await fetch('../data/plastico.json');
    const res = await pet.json()
    return res
}

const catalogoTermos = [await acero1(), await acrilico1(), await plastico1()];
const termos = [];

class Termo{
    constructor(id, nom, tipo, precio){
        this.nom = nom;
        this.id = id;
        this.tipo = tipo;
        this.precio = precio;
        this.pathIMG = `../images/termos/${this.id}.png`;
    }

    getImage() {
        return this.pathIMG;
    }
}

catalogoTermos.forEach(tipo => {
    tipo.forEach(ter => {
        termos.push(
            new Termo(ter.CODIGO, ter.NOMBRE, ter.TIPO, ter['PRECIO-P'])
        )
    })
});

const prod = document.querySelector(".productosMain");
const carrusel = prod.querySelector(".carousel-inner");
let i = true;

termos.forEach(t => {
    carrusel.innerHTML +=
    `<div class="carousel-item ${i ? "active" : ""}">
        <div class="card" style="width: 20rem;">
            <div class="imgTermo">
                <img src="${t.getImage()}" alt="Termo-${t.id}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${t.nom}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary codigo">${t.id}</h6>
                <div class="card-text">
                    <span>${t.tipo}</span>
                    <span>$${t.precio}</span>
                </div>
                <div class="agregarCarrito">
                    <label for="cantidad-${t.id}">
                        <span>Cantidad</span>
                    </label>
                    <div class="cantidadCarritoMain">
                        <button type="button" class="btn-Menos" data-btnMenos>
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <input class="cantidadCarrito" type="number" id="cantidad-${t.id}" min="1" value="1">
                        <button type="button" class="btn-Mas" data-btnMas>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="btnAgregar" type="button">
                        Agregar al carrito
                </button>
            </div>
        </div>
    </div>`;
    i = false;
});

export default {termos};

class AgregarCarrito{
    constructor(tarjetas){
        this.tarjetas = tarjetas;
        this.id = this.tarjetas.querySelector(".codigo").innerHTML.toString();
        this.cantidad = this.tarjetas.querySelector(".cantidadCarrito");
        this.btnMas = this.tarjetas.querySelector("[data-btnmas]");
        this.btnMenos = this.tarjetas.querySelector("[data-btnmenos]");
        this.agregar = this.tarjetas.querySelector(".btnAgregar");

        this.btnMas.addEventListener('click', () => {
            this.cantidadMas();
        });

        this.btnMenos.addEventListener('click', () => {
            this.cantidadMenos();
        });

        this.agregar.addEventListener('click', () => {
            this.agregarCarrito();
        });
    }

    cantidadMas(){
        this.cantidad.value++;
    }

    cantidadMenos(){
        this.cantidad.value--;
    }

    agregarCarrito(){
        const cantAnterior = parseInt(JSON.parse(sessionStorage.getItem(this.id)));
        sessionStorage.setItem(this.id, JSON.stringify((parseInt(this.cantidad.value) + cantAnterior) || parseInt(this.cantidad.value)));
    }
}

const tarjetas = carrusel.querySelectorAll(".card")
tarjetas.forEach(tarjeta => {
    new AgregarCarrito(tarjeta);
})