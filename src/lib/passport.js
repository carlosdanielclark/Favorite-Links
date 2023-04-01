const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../mysql/mysql_connect');
const helper = require('../lib/helpers')

//Objeto de configuracion SingUp
passport.use('local.singup', new LocalStrategy({
  usernameField: 'username',//Leer campo username
  passwordField: 'password',//Leer campo password
  passReqToCallback: true   //Leer otros datos  
}, async (request, username, password, done)=>{
    //Datos del formulario 
    const { fullname } = request.body;
    //Objeto Usuario
    const newUser = {
      username: username,
      password: password,
      fullname: fullname
    }
    //Encriptar password
    newUser.password = await helper.encryptPassword(password);
    //Guardar Usuario en la DataBase
    const result = await pool.query(`INSERT INTO users (username, password, fullname) VALUES ("${newUser.username}", "${newUser.password}", "${newUser.fullname}")`);
    //Asignar id al Usuario
    newUser.id = result.insertId;
    return done(null, newUser);
  }
 ));

 //Objeto de configuracion SingIn
passport.use('local.singin', new LocalStrategy({
  usernameField: 'username',//Leer campo username
  passwordField: 'password',//Leer campo password
  passReqToCallback: true   //Leer otros datos  
}, async (request, username, password, done)=>{
    //Consultar DataBase para buscar Usuario
    const result = await pool.query(`SELECT * FROM users WHERE username = "${username}"`);
    //Verificacion de usuario
    if(result.length > 0){
      //Datos de usuario
      const user = result[0];
      //Validacion de pasword
      const validPasword = await helper.matchPassword(password, user.password);
      if(validPasword){
        done(null, user, request.flash('success', 'Welcome '+ user.username));
      }else{
        done(null, false, request.flash('menssage', 'Invalid passwords'));
      }
    }else{
      return done(null, false, request.flash('menssage','Username does not exists'));
    }
  }
 ));

//Guardar en seccion
passport.serializeUser((user, done)=>{
  done(null, user.id);
});
//Obtener de seccion
passport.deserializeUser(async (id, done)=>{
  const rows = await pool.query(`SELECT * FROM users WHERE id =${id}`)
  done(null, rows[0]);
});