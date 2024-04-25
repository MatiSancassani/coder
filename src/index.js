import express from 'express';
import config from './config/config.js';
import { ProductManager } from '../src/managers/productManager.js';
import { productsRouter } from '../src/routes/products.router.js';

import { CartManager } from '../src/managers/cartManager.js';
import { cartsRouter } from '../src/routes/carts.router.js';

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); 
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`);
})
