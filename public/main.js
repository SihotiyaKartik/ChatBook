const sendForm = document.getElementById("send-form"); //For sending message, typically 'form' at last in new.html
const displayMessage = document.getElementById("MainMessage");//For displaying message on screen
const roomId = document.getElementById("room-id");//For displaying room ID at top right screen
const usersList = document.querySelector(".new-users-list");
const emoji = document.getElementById("emoji");
const emoji1 = document.getElementById("emoji1");
const emoji2 = document.getElementById("emoji2");
const emoji3 = document.getElementById("emoji3");
const emoji4 = document.getElementById("emoji4");
const emoji5 = document.getElementById("emoji5");
const emoji6 = document.getElementById("emoji6");
const sendMessage = document.getElementById("msg");
const userName = document.querySelector(".left-user-name");
const leave = document.getElementById("leave-btn");
const toggle = document.getElementById("toggle-nav");
const LEFT = document.querySelector(".left");
const RIGHT = document.querySelector(".right");

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

socket.on('emojiMsg',(message) => {
    outputEmoji(message);
    displayMessage.scrollTop  = displayMessage.scrollHeight;
})



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
    const p1 = document.createElement('span');
    p1.classList.add("p-text-name");
    p1.innerText = message.username + ": ";
    const p2 = document.createElement('span');
    p2.classList.add("p-text-text");
    p2.innerText = message.text;
    p.appendChild(p1);
    p.appendChild(p2);
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

function outputEmoji(message){
    const div = document.createElement('div');
    div.classList.add("emoji-msg");
    const p = document.createElement('p');
    p.classList.add("emoji-msg-e");
    const p1 = document.createElement('span');
    p1.classList.add("p-text-name");
    p1.innerText = message.username + ": ";
    const p2 = document.createElement('span');
    p2.classList.add("p-text-emoji");
    const p3 = document.createElement('i');
    if(message.text=='squint-tears'){
        p3.className = "far fa-grin-squint-tears";
    }
    if(message.text=='angry'){
        p3.className="fas fa-angry";
        
    }
    if(message.text=='heart'){
        p3.className = "far fa-kiss-wink-heart";
    }
    if(message.text=='tear'){
        p3.className = "far fa-sad-tear";
    }
    if(message.text=='suprise'){
        p3.className = "far fa-surprise";
    }
    if(message.text=='laugh-squint'){
        p3.className = "far fa-laugh-squint";
    }
    p2.appendChild(p3);
    p.appendChild(p1);
    p.appendChild(p2);
    div.appendChild(p);
    const pf = document.createElement('p');
    pf.classList.add("p-time");
    pf.innerText = message.time;
    div.appendChild(pf);
    displayMessage.append(div);


}

toggle.addEventListener('click',() => {
    if(LEFT.style.visibility === 'hidden'){
        RIGHT.style.visibility = 'hidden';
        LEFT.style.visibility = 'visible';
    }
    else{
        RIGHT.style.visibility = 'visible';
        LEFT.style.visibility = 'hidden';
    }
})


emoji.addEventListener('click',() => {
    var x = document.querySelector(".reaction");
    if(x.style.visibility === 'hidden'){
        x.style.visibility = 'visible';
    }
    else{
        x.style.visibility = 'hidden';
    }
});

emoji1.addEventListener('click',() => {
    var sentEmoji = "squint-tears";
    socket.emit('emoji', sentEmoji);
});

emoji2.addEventListener('click',() => {
    var sentEmoji = "laugh-squint";
    socket.emit('emoji', sentEmoji);
});

emoji3.addEventListener('click',() => {
    var sentEmoji = "angry";
    socket.emit('emoji', sentEmoji);
});

emoji4.addEventListener('click',() => {
    var sentEmoji = "tear";
    socket.emit('emoji', sentEmoji);
});

emoji5.addEventListener('click',() => {
    var sentEmoji = "heart";
    socket.emit('emoji', sentEmoji);
});

emoji6.addEventListener('click',() => {
    var sentEmoji = "suprise";
    socket.emit('emoji', sentEmoji);
});

leave.addEventListener('click',()=>{

    const l = confirm("Are you sure you want to leave?");
    if(l){
        window.location = "./index.html";
    }
    else{}

});


