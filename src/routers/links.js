//IMPORTAR MODULOS
const express = require('express'); 
const router = express.Router();
const controller_links = require('../controllers/controller_links');
const { isLoggedIn } = require('../lib/protectedRoot');

/*****************RENDERIZAR VISTAS*******************/
//View add
router.get('/add', isLoggedIn,controller_links.add_get);
//View links
router.get('/', isLoggedIn,controller_links.list_get);
//View update
router.get('/update/:id', isLoggedIn,controller_links.update_get);

/**************ACCIONES DE LAS VISTAS*****************/

//Create links
router.post('/add', isLoggedIn,controller_links.list_add);
//Update links
router.post('/update/:id', isLoggedIn,controller_links.list_update);
//Delete links
router.get('/delete/:id', isLoggedIn,controller_links.list_del);

module.exports = router;