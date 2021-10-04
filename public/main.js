const chatForm = document.getElementById("chat-form");//when we enter send button in text area in chat.html
const chatMessages = document.querySelector(".chat-right-side");//displaying messages
const roomId = document.getElementById("room-id");//for RoomID
const usersList = document.getElementById("users-list");//users list
const leaveBtn = document.getElementById('leave-btn');
const chatMsg = document.getElementById("msg");

const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
console.log({username,room});
const socket = io();

//when user joins room
socket.emit('joinRoom',{username,room});

//for getting roomId and users list
socket.on('roomUsers',({room,users})=>{
    outputRoomId(room);
    outputUsersName(users);
});

socket.on('smallMessage',(message)=>{
    outputSmallMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//when getting message from server
socket.on('message',(message)=>{
    outputMsg(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


//for sending message
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if(!msg){return false;}
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//function for setting roomID
function outputRoomId(room){
    roomId.innerText = room;
}

chatMsg.addEventListener('change',()=>{
    
})

//function for setting all users
function outputUsersName(users){
    usersList.innerHTML = '';
    users.forEach((element) => {
        const li = document.createElement('li');
        li.innerText = element.username;
        usersList.appendChild(li);
    });
}



function outputSmallMessage(message){
    const div = document.createElement('div');
    div.classList.add('small-msg');
    const p = document.createElement('p');
    p.classList.add('alpha');
    p.innerText = message.text;
    div.appendChild(p);
    chatMessages.appendChild(div);

}


//function for printing all messages
function outputMsg(message){
    const div = document.createElement('div');
    div.classList.add("complete-msg");
    const p =  document.createElement('p');
    p.classList.add("meta");
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add("para-txt");
    para.innerText = message.text;
    div.appendChild(para)
    chatMessages.appendChild(div);
}

leaveBtn.addEventListener('click',() => {
    const leaveRoom = confirm('Are you sure you want to leave?');
    if(leaveRoom){
        window.location = './index.html';
    }
    else{

    }
});
