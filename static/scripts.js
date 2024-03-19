var socket = io.connect("http://" + document.domain + ":" + location.port);

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
