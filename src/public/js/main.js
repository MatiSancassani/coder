const socket = io();
let botonDelete = document.querySelectorAll(".delete");
const carritoVacio = document.querySelector("#carrito-vacio");
const productosDom = document.querySelector("#productos-dom");
socket.on('productos', (productos) => {  
    const productosHtml = document.getElementById("productos-dom");
    function cargarProductos() {
        if(productos.length > 0) {
        carritoVacio.classList.add("carrito-vacio");
        productosDom.classList.remove("carrito-vacio");
        productosHtml.innerHTML = '';
        
        productos.forEach( produc => {
            const div = document.createElement("div");
            div.classList.add("items");
            div.innerHTML = `
            <ul class="item-list">       
                <li class="item">${produc.title}</li>
                <li class="item">${produc.id}</li>
                <li class="item">${produc.description}</li>
                <li class="item">${produc.price}</li>
                <li class="item">${produc.thumbnail}</li>
                <li class="item">${produc.code}</li>
                <li class="item">${produc.stock}</li>
                <li class="item">${produc.status ? 'Activo': 'Desactivo'}</li>
                <li class="item">${produc.category}</li>
                <button class="delete" id="${produc.id}" type="submit">X</button>
            </ul>
            `;

            productosHtml.append(div);
        })
        } else {
            carritoVacio.classList.remove("carrito-vacio");
            productosDom.classList.add("carrito-vacio");
        }

        actualizarDelete(); 
    } 
    
    cargarProductos();

    function actualizarDelete () {
        botonDelete = document.querySelectorAll(".delete");
        botonDelete.forEach(button => {
        button.addEventListener("click", eliminarDelcarrito);
        });
        
    }
    function eliminarDelcarrito (e) {
        const idButton = e.currentTarget.id;
        const index = productos.findIndex(productos => productos.id === idButton);
        productos.splice(index, 1);
        socket.emit('deleteProduct', idButton);
        cargarProductos();
        
    }    
});

const form = document.getElementById('producto-form');

form.addEventListener('submit', function (e){
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const producto = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category
    };
    socket.emit('addproduct', producto);
    form.reset();
    window.location.reload();
});