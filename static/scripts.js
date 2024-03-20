console.log("Prueba de JS");

var socket = io.connect("https://" + document.domain + ":" + location.port, {
  secure: true,
  transports: ["websocket"],
});

socket.on("connect", function () {
  console.log("Conexión establecida con el servidor WebSocket");
});

document.getElementById("messageForm1").onsubmit = function (event) {
  event.preventDefault();
  var messageInput = document.getElementById("messageInput");
  socket.emit("message", messageInput.value);
  messageInput.value = "";
};

socket.on("message", function (msg) {
  var ul = document.getElementById("messages");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
});

socket.on("disconnect", function () {
  console.log("Conexión WebSocket cerrada");
});
