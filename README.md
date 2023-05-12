<div style="display: flex; flex-direction: column; align-items: center;">
<img src="https://drive.google.com/uc?export=view&id=1QdVq3T3Ab1LW68y3YzaZ5LyemsJ0glon" style="border-radius: 30%; margin-bottom: 3rem; border: 1px solid black">
</div>
<div style="text-align: center">
    <h1 style="color: black; text-decoration: underline">Ejercicio 5<h1>
    <h2 style="color: black; text-decoration: underline; margin-bottom: 2rem"> Javascript: Trabajo Integrador<h2>
</div>

<h2 style="text-align: center; color: black">El código contiene</h2>
    <ul style="text-align: left; color: black">
        <li>una clase Producto que representa un producto que vende el super</li>
        <li>una clase Carrito que representa el carrito de compras de un cliente</li>
        <li>una clase ProductoEnCarrito que representa un producto que se agrego al carrito</li>
        <li>una función findProductBySku que simula una base de datos y busca un producto por su sku</li>
    </ul>
<br>    
<h3 style="text-align: left; color: black">El código tiene errores y varias cosas para mejorar / agregar</h3>

<br>
<div style="text-align: left; color: black">
    <ul>
        <h1>Ejercicios</h1>
        <li>
        <h3>1) Arreglar errores existentes en el código</h3>
        <br>
        <p> a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.</p>
        <p>b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.</p>
        <p>c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.</p>
        </li>
        <br>
        <br>
        <li>
        <h3>2) Agregar la función eliminarProducto a la clase Carrito</h3>
        <br>
        <p>a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)</p>
        <p>b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto</p>
        <p>c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito</p>
        <p>d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error</p>
        <p>e) La función debe retornar una promesa</p>
        </li>
        <br>
        <br>
        <li>
        <h3>3) Utilizar la función eliminarProducto utilizando .then() y .catch()</h3>
        </li>
        <br>
        <br>
    </ul>
<div style="text-align: center; font-size: 24px">
    <h1 style="text-decoration: underline; color: black;  margin-top: 10rem">Profesores</h1>
</div>
<div style="display: flex; align-items: center; justify-content: space-around">
    <div style="display: flex; flex-direction: column; align-items: center; color: black">
        <img src="https://drive.google.com/uc?export=view&id=11H-HDPnfVEHkfFkrvcu3_bZ9xe7l4LbL" style="border-radius: 50%; width: 250px; border: 3px solid black; float: left">
        <p>Matias Benitez</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; color: black">
        <img src="https://drive.google.com/uc?export=view&id=1pvskPTgdJCVSDNIb9War8eYfQUnfWI15" style="border-radius: 50%; width: 250px; border: 3px solid black; float: rigth">
        <p>Gaston Fernandez</p>
    </div>
        <div style="display: flex; flex-direction: column; align-items: center; color: black">
        <img src="https://drive.google.com/uc?export=view&id=1sCYth4XEvx0Efa__jjHdx3PtDZYTR-Cu" style="border-radius: 50%; width: 250px; border: 3px solid black; float: rigth">
        <p>Quentin</p>
    </div>
</div>