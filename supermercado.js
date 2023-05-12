// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        /* Utilizamos un try catch para poder enviar el mensaje de errro solicitado en el punto 1 - B */
        try {
            console.log(`Agregando ${cantidad} ${sku}`);

            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku)

            console.log("Producto encontrado", producto);

            /* creamos una constante que me indica si el producto esta o no en el carrito por medio del indice */
            const productIndex = this.productos.findIndex(product => product.sku === sku);

            /* findIndex retorna -1 si el elemento no esta la lista, por lo que de esta manera si no es -1 ingreso a la propiedad
            cantidad del producto y le sumo la cantidad, caso contrario agrego el nuevo producto */
            if (productIndex != -1) {
                this.productos[productIndex].cantidad += cantidad;
            } else {
                // Creo un producto nuevo
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
                this.productos.push(nuevoProducto);
                this.categorias.push(producto.categoria);
            }

            this.precioTotal += producto.precio * cantidad;

        } catch (error) {
            /* mesansaje de error "amigable" */
            console.log("Lamentamos informarle que no disponemos del producto solicitado");
        }

    }

    /* Creamos el metodo eliminarProdcuto */
    eliminarProducto(sku, cantidad) {
        /* Utilizamos la funcion findProductBySku para conseguir los datos del producto a eliminar */
        findProductBySku(sku).then((producto) => {
            /* una vez conseguidos los datos del producto vemos si el mismo esta en el carrito */
            const inCarrito = this.productos.findIndex(product => product.sku === sku);
            /* Si el inCarrito es diferente a -1 comprobamos  es porque encontramos el producto */ 
            if (inCarrito != -1) {
                /* si la cantidad ingresada es mayor o igual a la cantidad que ya se encuentra en el carrito */
                if (cantidad >= this.productos[inCarrito].cantidad) {
                    /* Eliminamos el producto del carrito y actualizamos el precio total */
                    this.productos.splice(inCarrito, 1);
                    this.precioTotal -= producto.precio * cantidad;
                } else {
                    /* Si la cantidad es menor procedemos a restar la cantida y a actualizar el precio total */
                    this.productos[inCarrito].cantidad -= cantidad;
                    this.precioTotal -= producto.precio * cantidad;
                }
            } else {
                /* En caso de que inCarrito nos arroje -1 arrojamos un error "amigable" */
                throw new Error("producto no encontrado en el carrito");
            }
        }).catch((error) => {
            /* Mostramos el error en consola */
            console.log("producto no encontrado en el carrito");
        })
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('KS944RUR', 2);
carrito.agregarProducto('KS944RUR', 3);
/* Producto no existe */
carrito.agregarProducto('KS944', 3);
/* Eliminar producto */
carrito.eliminarProducto('KS944RUR', 1);
carrito.eliminarProducto('KS944', 3);
setTimeout(() => {
    console.log(carrito);
}, 1800)

