let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    // res.send('<h1>goodbye world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });

    socket.on('chat message', (msg) => {
        // socket.broadcast.emit('chat message', msg);
        io.emit('chat message', msg)
        console.log('message: ' + JSON.stringify(msg));
    });
});



http.listen(3000, () => {
    console.log('listening on localhost:3000')
});

module.exports = app;