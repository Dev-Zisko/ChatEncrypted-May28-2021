var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('Bienvenida');
    socket.on('nuevo_mensaje', (message) => {
	    // Dinfundimos el mensaje a todos los clientes
        io.sockets.emit('difundir_mensaje', message);
    });
});

app.use(express.static(__dirname + '/public'));

var server = http.listen(3000, () => {
    console.log("Servidor listo en http://127.0.0.1:3000")
});