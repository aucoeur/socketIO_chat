const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

// app.get('/', (req, res) => {
//     // res.send('<h1>goodbye world</h1>');
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('Socket connected');

    socket.on("new user", function (data) {
        socket.userId = data;
        socket.emit('new user', `Welcome. You are ${socket.userId}`);
        socket.broadcast.emit("new user", `${socket.userId} has connected`);
    });

    socket.on('disconnect', () => {
        console.log(socket.userId);
        io.emit("user disconnected", `${socket.userId} has disconnected`);
    });

    socket.on('chat message', (data) => {

        // send only to 
        // socket.emit('chat message', msg);
        io.emit('chat message', data);
        console.log(JSON.stringify(data));
    });
});