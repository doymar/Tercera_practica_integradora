const socketClient = io();
const h4Name = document.getElementById("name");
let user;
Swal.fire({
    title: "Welcome!",
    text: "What is your name",
    input: "text",
    inputValidator: (value) => {
        if (!value) {
          return "Name is required";
        }
      },
    confirmButtonText: "Enter",
}).then((input) => {
    user = input.value;
    h4Name.innerText = user;
    socketClient.emit("newUser", user);
  });

  socketClient.on("userConnected", (user) => {
    Toastify({
      text: `${user} connected`,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      duration: 5000,
    }).showToast();
  });