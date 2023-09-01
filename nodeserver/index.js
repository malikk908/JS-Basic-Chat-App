// node erver which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500"
      }
    });


const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', userName=>{
        // console.log("New User", userName)
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName)
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
})