//IMPORTAR MODULOS
const express = require('express'); 
const  controller_authentication = require('../controllers/controller_authentication');
const passport =  require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/protectedRoot');

const router = express.Router();

router.get('/singin', isNotLoggedIn,controller_authentication.singin_get);
router.get('/singup', isNotLoggedIn,controller_authentication.singup_get);
router.get('/profile', isLoggedIn,controller_authentication.profile_get);
router.get('/logout', isLoggedIn,controller_authentication.logout_get);

router.post('/singup', isNotLoggedIn,passport.authenticate('local.singup', {
	successRedirect: '/profile',
	failureRedirect: '/singup',
	failureFlash: true
}));

router.post('/singin', isNotLoggedIn,controller_authentication.singin_post);

module.exports = router;