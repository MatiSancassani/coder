import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(){
        this.path = './data/product.json';
        this.products = []
    }

    addProduct = async({ title, description, price, thumbnail, code, stock, status, category}) => {
        const id = uuidv4();

        let newProduct = {id, title, description, price, thumbnail, code, stock, status, category}

        this.products = await this.getProduct();
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));

        return newProduct
    }

    getProduct = async () => {
        const response = await fs.readFile(this.path, 'utf-8');
        const responseJSON = JSON.parse(response);

        return responseJSON;
    }

    getProductById = async(id) => {
        const response = await this.getProduct();

        const product = response.find(product => product.id === id)
        if (product) {
            return product
        } else {
            console.log("Producto no encontrado")
        }
    }

    updateProduct = async (id, {...data}) => {
        const products = await this.getProduct(); //Obtenemos todos los productos
        const index = products.findIndex(product => product.id === id ) //En el array se fija si el id es igual al que recibimos por parametros, lo hacemos con findIndex

        if(index !== -1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return products[index]
        } else {
            console.log("No se encontro el producto")
        }
    }
    
    deleteProduct = async(id) => {
        const products = await this.getProduct();
        const index = products.findIndex(product => product.id === id )

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))            
        } else {
            console.log("No se encontro el producto")
        }
    }
}

