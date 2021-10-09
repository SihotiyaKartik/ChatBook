const form = document.getElementById("index-form");
const error = document.getElementById("username-text");
const temp = /^[a-zA-Z]+$/;
const socket = io(); 

form.addEventListener('submit',(e)=>{
    
    const nameOfuser = e.target.elements.username.value;
    const roomName = e.target.elements.room.value;
    console.log({nameOfuser,roomName});
    
    if(!nameOfuser.match(temp)){
        e.preventDefault();
        error.innerText = "Not a valid username";
    }
    
});


