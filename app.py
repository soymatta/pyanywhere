from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("message")
def handle_message(msg):
    emit("message", msg, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=443, debug=True, ssl_context="adhoc")
