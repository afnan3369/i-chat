
const socket = io('http://localhost:3000')
const messageForm= document.getElementById('send-container')
const messageInput= document.getElementById('message-input')

const nameOFNewUser =  prompt("what is your name?")
appendMessage("you joined")
socket.emit('new-user', nameOFNewUser)

socket.on('chat-message' , data=>{
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-conectedmesg-message' , data=>{
    appendMessage(data+' connected')
})
socket.on('user-disconnected' , data=>{
    appendMessage(data+' Disconnected')
})
//function sendmsg(){
//    let msginput= document.getElementById('message-input').value
//    console.log("in script  "+msginput);
//    socket.emit('send-chat-msg' , msginput)
//}
messageForm.addEventListener('submit', e=>{
    e.preventDefault()     //?
    const message= messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-msg' , message)
    messageInput.value=''
})

function appendMessage(message){
    const messageElement= document.createElement('div');
    messageElement.innerText= message
    document.getElementById('message-container').append(messageElement);
}