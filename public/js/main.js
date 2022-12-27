const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector( ".chat-messages");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');



const socket = io(); 


// Getting username and room from URL
const query = Qs.parse(location.search , {
    ignoreQueryPrefix: true
});

console.log(query);

//Sends the username and room to server
socket.emit('joinRoom' ,query)

//get room and users 
socket.on('roomUsers', (data)=>{
    outputRoomName(data.room);
    outputUsers(data.users);
})

socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    chatMessage.scrollTop = chatMessage.scrollHeight;
})

//message submit
chatForm.addEventListener('submit' , (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    
    //emitting message to the server
    socket.emit('chatMessage' , msg);

    //clearing the input area
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;

});

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}     <span>${message.time}</span></p>
    <p class="text">${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

//add room name
function outputRoomName(room){
console.log(room);
    roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `;
}
//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

