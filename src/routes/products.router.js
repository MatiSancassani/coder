import { Router } from "express";
import { productManager } from "../index.js";
import { uploader } from "../utils/uploader.js";

const productsRouter = Router();

productsRouter.post('/',uploader.single('thumbnail'), async(req, res) => {
    res.status(200).send({ origin: 'server1', payload: req.body });
})
productsRouter.get('/', async(req, res) => {
    try {
        const {limit} = req.query;
        const products = await productManager.getProduct();

        if(limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts)//Si hay un limite, retornara hasta el limite
        }
        return res.json(products)//Si no hay limite, retornamos todos los productos
    } catch (error) {
        console.log(error)
        res.send('Error al intentar recibir los productos')
    }
})

productsRouter.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    try {        
        const products = await productManager.getProductById(pid);
        res.json(products);
    } catch (error) {
        console.log(error)
        res.send(`Error al intentar recibir el producto con el id ${pid}`)
    }
})

productsRouter.post('/', async(req, res) =>{
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category} = req.body;

        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category});
        res.json(response);
    } catch (error) {
        console.log(error)
        res.send(`Error al intentar agregar el producto`)
    }
})

productsRouter.put('/:pid', async(req,res) =>{
    const {pid} = req.params;        
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid,{ title, description, price, thumbnail, code, stock, status, category} ); 
        res.json(response);
    } catch (error) {
        console.log(error)
        res.send(`Error al intentar editar el producto`)
    }
})

productsRouter.delete('/:pid', async(req, res) => {
    const {pid} = req.params;     
    try {
        await productManager.deleteProduct(pid);
        res.send('Producto eliminado exitosamente')
    } catch (error) {
        console.log(error)
        res.send(`Error al intentar eliminar el producto`)
    }
})

export {productsRouter};