import express from 'express';
import config from '../src/config/config.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'

import { ProductManager } from '../src/managers/productManager.js';
import { productsRouter } from '../src/routes/products.router.js';

import { CartManager } from '../src/managers/cartManager.js';
import { cartsRouter } from '../src/routes/carts.router.js';

import viewsRouter from '../src/routes/view.routes.js';

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); 
app.use('/static', express.static(`${config.DIRNAME}/public`));



const httpServer = app.listen(config.PORT, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`);
})
const socketServer = new Server(httpServer);

socketServer.on('connection',   async socket => {
    console.log('Cliente conectado');
    const productos = await productManager.getProduct();
    socket.emit('productos',productos )

    socket.on('addproduct',  producto => {
        const response = productManager.addProduct(producto);
        if(response.producto)
        socket.emit('productos', response.producto )
        
        
    });
});
