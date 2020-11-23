let socket = io();

let userName = "";

function newUserConnected(user) {
    userName = user || `User${Math.floor(Math.random() * 10000)}`;
    socket.emit("new user", userName);
};

newUserConnected();

socket.on('new user', function (userConnect) {
    let chatWindow = document.getElementById('messages');
    let newMsg = document.createElement("LI");
    newMsg.className = 'user';
    let text = document.createTextNode(userConnect);

    newMsg.appendChild(text);
    chatWindow.appendChild((newMsg));
});

socket.on('user disconnected', function (userDisconnect) {
    let chatWindow = document.getElementById('messages');
    let newMsg = document.createElement("LI");
    newMsg.className = 'user';
    let text = document.createTextNode(userDisconnect);

    newMsg.appendChild(text);
    chatWindow.appendChild((newMsg));
});

socket.on('chat message', function ({message, user}) {
    let chatWindow = document.getElementById('messages');
    let newMsg = document.createElement("LI");
    let userName = document.createElement("SPAN");
    userName.className = 'user';
    let userId = document.createTextNode(user);
    let text = document.createTextNode(`: ${message}`);

    userName.appendChild(userId);
    newMsg.appendChild(userName);
    newMsg.appendChild(text);

    chatWindow.appendChild((newMsg));
});

document.getElementById('chat').addEventListener('submit', (e) => {
    e.preventDefault(); // prevents page reloading
    let message = document.getElementById('m');

    socket.emit('chat message', {
        message: message.value, 
        user: userName, 
    });

    message.value = "";

    return false;
});