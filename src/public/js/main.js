const socket = io();
const productosHtml = document.getElementById("productos-dom");

socket.on('productos', (productos) => {  

    function cargarProductos() {
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
            </ul>
            `;
            productosHtml.append(div);
        })
    }  
    
    cargarProductos();
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
});