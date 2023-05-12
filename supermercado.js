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

            /* Primero valida que la cantidad a agregar sea mayor a 0 */
            if (cantidad > 0) {
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
            } else {
                console.log("No es posible agregar 0 productos");
            }


            this.precioTotal += producto.precio * cantidad;

        } catch (error) {
            /* mesansaje de error "amigable" */
            console.log("Lamentamos informarle que no disponemos del producto solicitado");
        }

    }

    /* Creamos el metodo eliminarProdcuto */
    async eliminarProducto(sku, cantidad) {
        await findProductBySku(sku).then((producto) => {
            /* una vez conseguidos los datos del producto vemos si el mismo esta en el carrito */
            const inCarrito = this.productos.findIndex(product => product.sku === sku);
            /* Si el inCarrito es diferente a -1 comprobamos  es porque encontramos el producto */
            if (cantidad > 0) {
                if (inCarrito != -1) {
                    /* si la cantidad ingresada es mayor o igual a la cantidad que ya se encuentra en el carrito */
                    if (cantidad >= this.productos[inCarrito].cantidad) {
                        /* Eliminamos el producto del carrito, actualizamos el precio total como asi tambien las categorias*/
                        this.productos.splice(inCarrito, 1);
                        this.precioTotal -= producto.precio * cantidad;
                        this.categorias.splice(inCarrito, 1);
                    } else {
                        /* Si la cantidad es menor procedemos a restar la cantida y a actualizar el precio total */
                        this.productos[inCarrito].cantidad -= cantidad;
                        this.precioTotal -= producto.precio * cantidad;
                    }
                    resolve();
                } else {
                    /* En caso de que inCarrito nos arroje -1 arrojamos un error "amigable" */
                    throw new Error("producto no encontrado en el carrito");
                }
            } else {
                console.log("No es posible eliminar 0 productos");
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

/* EJEMPLOS PUNTO POR PUNTO */

function espaciosConsola(){
    console.log("                                                                           ");
    console.log("###########################################################################");
    console.log("                                                                           ");
}

function espacioInterno(){
    console.log("                                                                           ");
    console.log("___________________________________________________________________________");
    console.log("                                                                           ");
}

function espaciado(){
    console.log(" ");
    console.log(" ");
}

async function pruebas(){

    espaciosConsola();
    
    const carrito = new Carrito();
    console.log("CREAMOS EL CARRITO: ");
    espacioInterno();
    console.log(carrito)

    espaciosConsola();

    /* agregar producto */
    console.log("AGREGAMOS EL PRIMER PRODUCTO: ");
    espacioInterno();
    await carrito.agregarProducto('WE328NJ', 2);
    espaciado();
    console.log(carrito);

    espaciosConsola();

    /* a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades. */
    console.log("1 - a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades. ");
    espacioInterno();
    console.log("AGREGAMOS UNO: ")
    espaciado();
    await carrito.agregarProducto('XX92LKI', 2);
    espaciado();
    console.log(carrito.productos);
    espaciado();
    console.log("AGREGAMOS OTRO: ");
    espaciado();
    await carrito.agregarProducto('XX92LKI', 2);
    espaciado();
    console.log("SI AGREGAMOS EL MISMO PRODUCTO SOLO SUMA CANTIDAD DE ESE PRODUCTO: ", carrito.productos);
    espaciado();
    console.log("TAMBIEN SUMA A LA CANTIDAD TOTAL DEL CARRITO: ", carrito.precioTotal);

    espaciosConsola();
    
    /* b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista. */
    console.log("1 - b Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.")
    espacioInterno();
    console.log("AGREGAMOS UNO: ")
    espaciado();
    await carrito.agregarProducto('KS944RUR', 2);
    espaciado();
    console.log("AGREGAMOS OTRO: ")
    espaciado();
    await carrito.agregarProducto('KS944RUR', 2);
    espaciado();
    console.log("AGREGAMOS OTRO: ")
    espaciado();
    await carrito.agregarProducto('WE328NJ', 2); 
    espaciado();
    console.log("AGREGAMOS PRODUCTOS SIN MULTIPLICAR LAS CATEGORIAS Y SOLO AGREMOS EL QUE NO ESTA: ", carrito.categorias);

    espaciosConsola();

    /* c) Si intento agregar un producto que no existe debería mostrar un mensaje de error. */
    console.log("1 - c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.")
    espacioInterno();
    console.log("ENVIAMOS EL SIGUIENTE MENSAJE: ")
    espaciado();
    await carrito.agregarProducto('KS944', 2);

    espaciosConsola();

    /* Adicional cuando quiero agregar cantidad 0 de un prodcuto envia mensaje de error y no agrega el producto */
    console.log("Adicional cuando quiero agregar cantidad 0 de un prodcuto envia mensaje de error y no agrega el producto");
    espacioInterno();
    console.log("ENVIAMOS EL SIGUIENTE MENSAJE: ")
    espaciado();
    await carrito.agregarProducto('PV332MJ', 0);
    espaciado();
    console.log("EL PRODUCTO NO SE AGREGO: " ,carrito.productos);
    espaciado();
    console.log("LAS CATEGORIAS NO SE MODIFICARON: ",carrito.categorias);
    espaciado();
    console.log("EL PRECIO TOTAL NO SE MODIFICO: ",carrito.precioTotal);

    espaciosConsola();

    /* 2) Agregar la función eliminarProducto a la clase Carrito */
    /* b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto */
    /* Agrego 4 gasesas pero elimino 2 me debe devolver 2 */
    console.log("2) Agregar la función eliminarProducto a la clase Carrito");
    espaciado();
    console.log("2 - b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto");
    espacioInterno();
    console.log("AGREGO 4 UNIDADES: ");
    espaciado();
    await carrito.agregarProducto('FN312PPE', 4);
    espaciado();
    console.log("PRODUCTO Y UNIDADES AGREGADOS: ", carrito.productos);
    espaciado();
    console.log("PRECIO TOTAL HASTA EL MOMENTO: ", carrito.precioTotal);
    espaciado();
    console.log("ELIMINO 2 UNIDADES DEL MISMO PRODCUTO: ");
    espaciado();
    await carrito.eliminarProducto('FN312PPE', 2);
    console.log("LUEGO DE ELIMINAR VEMOS COMO SE MODIFICA LA CANTIDAD: ", carrito.productos);
    espaciado();
    console.log("LUEGO DE ELIMINAR VEMOS COMO SE MODIFICA EL PRECIO TOTAL: ", carrito.precioTotal);

    espaciosConsola();

    /* c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito */
    /* Como tenia 2 Gaseosas elimino las 2 eliminando tambien la categoria */
    console.log("2 - c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito.")
    espacioInterno();
    await carrito.eliminarProducto('FN312PPE', 3);
    espaciado();
    console.log("SE ELIMINA LA TOTALIDAD DEL PRODUCTO: ", carrito.productos);
    espaciado();
    console.log("Y SE ELIMINA LA CATEGORIA DEL PRODUCTO: ", carrito.categorias);

    espaciosConsola();

    /* d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error. */
    console.log("2 - d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error.");
    espacioInterno();
    console.log("SI EL PRODUCTO NO ESTA EN EL CARRITO ENVIAMOS EL SIGUIENTE MENSAJE: ")
    espaciado();
    await carrito.eliminarProducto('PV332MJ', 2);

    espaciosConsola();
     
    /* Adicional no es posible eliminar 0 productos */
    console.log("Adicional no es posible eliminar 0 productos.")
    espacioInterno();
    console.log("SI SE INTENTA ELIMINAR 0 PRODUCTOS DEL CARRITO, ENVIAMOS EL MENSAJE: ");
    espaciado();
    await carrito.eliminarProducto('WE328NJ', 0);
    
    espaciosConsola();
}

pruebas();


