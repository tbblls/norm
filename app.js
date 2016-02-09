/**
 * Created by Adam on 5/17/2015.
 */
var express =  require("express"),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    config = require('./config/config.js'),
    bodyParser = require('body-parser'),
    wit = require('node-wit'),
    norm = require('./magic/norm.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname,'views'));
app.engine('html', require('hogan-express'));
app.set('view engine','html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

var env = process.env.NODE_ENV || 'development';
/*
if(env==='development'){
    //dev
    //app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));
}else
{
    //prod
   app.use(session({
        secret:config.sessionSecret,
        store: new ConnectMongo({
            mongoose_connection:mongoose.connections[0],
            stringify:true
        }),
        saveUninitialized:true,
        resave:true}));
}
*/
/*var userSchema = mongoose.Schema({
    username:String,
    password:String,
    fullnamne:String
});*/

/*app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);*/
 require('./routes/routes.js')(express, app, wit, config, norm);


app.set('port', process.env.PORT || 3000 );
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/*require('./socket/socket.js')(io, rooms);*/

server.listen(app.get('port'), function(){
    console.log('NORM on Port: ' + app.get('port'));
});
