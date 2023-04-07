  //IMPORTAR MODULOS
  const express = require('express'); 
  //const cors =  require('cors');
  const { JSON } = require('mysql/lib/protocol/constants/types');
  const morgan = require('morgan');
  const { engine } = require('express-handlebars');
  const path = require('path');
  const flash = require('connect-flash');
  const session = require('express-session');
  const MySQLStore = require('express-mysql-session')(session);
  const { db_key } = require('./mysql/mysql_key');
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;

 /***********************************************************/
  //INITIALIZATION
  const app = express(); //Retorna una app de express
  require('./lib/passport');

  //SETTINGS
  const port = process.env.PORT || 5000; //Numero del puerto

  const dir_apk = '/home/carlosdaniel/Documentos/03  PROJECTS DEVELOP/My APKs/apk-save-link/';
  app.set('views', path.join(dir_apk, 'views')); // Enlazar ruta con la carpeta 'views'
  app.use(express.static(path.join(dir_apk, 'public'))); //Enlazar ruta con la carpeta 'public'

  app.engine('.hbs', engine({      
    defaultLayouts: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebar.js')
  }));
  // ENABLE HANDLEBAR 
  app.set('view engine', '.hbs');

  /************************************************************/
  //MIDDLEWARES
  app.use(express.urlencoded({extended: true}))//accepted data envoy for use to form
  app.use(express.json({type: '*/*'}))// Combierte la request en formato .JSON
  //app.use(cors());
  app.use(morgan('dev'));

  app.use(session({
    secret: 'key_seccion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(db_key)
  }));
  
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  /************************************************************/
  //GLOBAL VARIABLES
  app.use((request, response, next)=>{
    app.locals.success = request.flash('success');
    app.locals.message = request.flash('message');
    app.locals.user = request.user;
    next();
  })

  /************************************************************/
  //IMPORT ROUTERS assign url(Rutas)
  app.use(require('./routers/router'));
  app.use(require('./routers/authentication'));
  app.use('/links',require('./routers/links'));
  /************************************************************/
  //STARTING SERVER
  app.listen(port, () => {
    console.log('server listen... port:', port);
  });
 
  