console.log("Prueba de JS");

var socket = null;

function connectWebSocket() {
  socket = io.connect("wss://" + document.domain + ":" + location.port, {
    secure: true,
    transports: ["websocket"],
  });

  socket.on("connect", function () {
    console.log("Conexión establecida con el servidor WebSocket");
  });

  socket.on("message", function (msg) {
    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);
  });

  socket.on("disconnect", function () {
    console.log("Conexión WebSocket cerrada. Intentando reconectar...");
    // Intentar reconectar después de un breve período de tiempo (500 ms)
    setTimeout(connectWebSocket, 500);
  });

  document.getElementById("messageForm1").onsubmit = function (event) {
    event.preventDefault();
    var messageInput = document.getElementById("messageInput");
    console.log("Mensaje enviado: " + messageInput.value);
    socket.emit("message", messageInput.value);
    messageInput.value = "";
  };
}

connectWebSocket();
