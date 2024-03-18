from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
SocketIO = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")


@SocketIO.on("message")
def handle_message(msg):
    print("Message: " + msg)
    SocketIO.emit("message", msg)


if __name__ == "__main__":
    SocketIO.run(app, debug=True)
