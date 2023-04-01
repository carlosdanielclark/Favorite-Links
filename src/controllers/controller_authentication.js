//IMPORTAR MODULOS
const express = require('express'); 
const app = express(); 
const controller_authentication = {};
const passport =  require('passport');

controller_authentication.singin_get =  (req, res) => {
	res.render('auth/singin');
};
controller_authentication.singup_get =  (req, res) => {
	res.render('auth/singup');
};
controller_authentication.profile_get =  (req, res) => {
	res.render('user/profile');
};
controller_authentication.logout_get =  (req, res) => {
	req.logOut(function(err) {
		if (err) { return next(err); }
		res.redirect('/singin');
	  });
};

controller_authentication.singin_post = (req, res, next) => {
	passport.authenticate('local.singin', {
    successRedirect: '/profile',
    failureRedirect: '/singin',
    failureFlash: true
	})(req, res, next);

}

module.exports = controller_authentication;