
const io = require('socket.io')(3000)
const users= {}

io.on('connection',socket=>{            // conection compulsary & socket is variable
    socket.on('new-user', name=>{          //socket.emit bhajna or socket.on received krna
        users[socket.id]= name
        socket.broadcast.emit('user-conectedmesg-message', name)
    })
    
    socket.on('send-chat-msg', msginput=>{
    socket.broadcast.emit('chat-message', {message: msginput, name: users[socket.id]})
   })
   socket.on('disconnect', ()=>{
     socket.broadcast.emit('user-disconnected', users[socket.id])
     delete users[socket.id]

   })



})


