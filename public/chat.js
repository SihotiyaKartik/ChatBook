const sendForm = document.getElementById("send-form"); //For sending message, typically 'form' at last in new.html
const displayMessage = document.getElementById("MainMessage");//For displaying message on screen
const roomId = document.getElementById("room-id");//For displaying room ID at top right screen
const usersList = document.querySelector(".new-users-list");

const sendMessage = document.getElementById("msg");
const userName = document.querySelector(".left-user-name");
const leave = document.getElementById("leave-btn");


const socket = io();

const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});





userName.innerText = username;

//when user joins
socket.emit('userJoinsRoom',{username,room});

//for getting roomId and users list
socket.on('roomUsers',({room,users})=>{
    outputRoomId(room);
    outputUsersList(users);
});

//message when user connects and disconnects


socket.on('message',(message)=>{
    outputMsg(message);
    displayMessage.scrollTop  = displayMessage.scrollHeight;
});



sendForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if(!msg)return false;
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputRoomId(room){
    roomId.innerText = room;
}

function outputUsersList(users){
    usersList.innerHTML = '';
    users.forEach(element => {
     if(element.username !== username) {
    const div = document.createElement('div');
    div.classList.add("user");
    const img = document.createElement('IMG');
    img.setAttribute("src","user.png");
    img.setAttribute("height","40");
    img.setAttribute("width","40");
    img.setAttribute("alt","soon");
    div.appendChild(img);
    const divF = document.createElement('div');
    divF.classList.add("info");
    const divS = document.createElement('div');
    divS.classList.add("name-time");
    const pF = document.createElement('p');
    pF.classList.add("name");
    pF.innerText = element.username;
    divS.appendChild(pF);
    const pS = document.createElement('p');
    pS.classList.add("time");
    pS.innerText = element.time;
    divS.appendChild(pS);
    divF.appendChild(divS);
    const divT = document.createElement('div');
    divT.classList.add("typing");
    const pT = document.createElement('p');
    pT.classList.add('type');
    if(users.flag){
        pT.innerText = `${element.username} is typing`;
    }
    else{pT.innerText = "";}
    divT.appendChild(pT);
    divF.appendChild(divT);
    div.appendChild(divF);
    usersList.appendChild(div);
    }
    });
    
}



function outputMsg(message){
    if(message.username){
    const div  = document.createElement('div');
    div.classList.add("personal");
    const p = document.createElement('p');
    p.classList.add("p-text");
    p.innerText = message.username + ": " + message.text;
    div.appendChild(p);
    const pf = document.createElement('p');
    pf.classList.add("p-time");
    pf.innerText = message.time;
    div.appendChild(pf);
    displayMessage.append(div);
    }
    else{
        const div = document.createElement('div');
        div.classList.add("greet-msg");
        const p = document.createElement('p');
        p.classList.add("alpha");
        p.innerText = message.text;
        div.appendChild(p);
        displayMessage.appendChild(div); 
    }
}

leave.addEventListener('click',()=>{

    const l = confirm("Are you sure you want to leave?");
    if(l){
        window.location = "./index.html";
    }
    else{}

});


