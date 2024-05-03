/**
 * Así como destinamos un archivo para los endpoints de manejo de usuarios,
 * generamos otro para endpoints de manejo de plantillas, manteniendo las cosas ordenadas.
 * 
 * La diferencia en este caso es que el endpoint no responde mediante un res.send() y
 * un contenido JSON, sino a través de un res.render(), parseando y devolviendo el
 * resultado de una plantilla con Handlebars. Este es un contenido HTML standard que
 * puede ser interpretado y mostrado por el navegador.
 */
import { Router } from 'express';
import { ProductManager } from '../managers/productManager.js';

const router = Router();

router.get('/', async (req, res) => {
    const p =  new ProductManager();
    const productos = await p.getProduct();
    res.render('index', {productos});
});

router.get('/realtime', async (req, res) => {
    const p =  new ProductManager();
    const productos = await p.getProduct();
    res.render('realTime', productos);
});

// router.get('/users', (req, res) => {
//     const users = { users: data };
//     /**
//      * Atención!, el 2do parámetro del render debe ser siempre un objeto
//      * con las propiedades que necesitemos tener disponibles en la plantilla,
//      * en este ejemplo un elemento users que contiene el array con los datos de usuario
//      * (ver users.handlebars)
//      */
//     res.render('users', users);
// });

export default router;