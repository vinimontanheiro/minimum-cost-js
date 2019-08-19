var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var root = path.normalize(__dirname + '/..');


app.set('views', root + '/client/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(root, '/client')));

app.get('/', function(req, res){
    res.render('index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');



    io.on('connection', function(server){
        console.log('Cliente connectado.');


        server.on("caminhoMinimo",function(entrada){



        });
    });
});