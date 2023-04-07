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
	const log = req.query.log;
	const register = req.query.register;
	res.render('user/profile', { log, register });
};
controller_authentication.logout_get =  (req, res) => {
	req.logOut(function(err) {
		if (err) { return next(err); }
		res.redirect('/singin');
	});
};

controller_authentication.singin_post = (req, res, next) => {
	let log = encodeURIComponent("log successful");

	passport.authenticate('local.singin', {
    successRedirect: '/profile/?log='+log,
    failureRedirect: '/singin',
    failureFlash: true
	})(req, res, next);

}

controller_authentication.singup_post = (req, res, next) => {
	let register = encodeURIComponent("register successful");
	
	passport.authenticate('local.singup', {
		successRedirect: '/profile/?register='+register,
		failureRedirect: '/singup',
		failureFlash: true
	})(req, res, next);

}

module.exports = controller_authentication;