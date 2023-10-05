console.log("Prueba web");
const socketClient = io();

const form = document.getElementById('form')
const inputPrice = document.getElementById('price')

form.onsubmit = (e)=>{
    e.preventDefault()
    const price = inputPrice.value;
    socketClient.emit('newPrice',price)
}

//socketClient.on("welcome",(message)=>{
    //alert(message);
   // console.log(message);
//})