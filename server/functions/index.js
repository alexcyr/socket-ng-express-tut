const functions = require("firebase-functions");
const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
    cors: {
      origin: "https://minigamestadium.web.app",
      credentials: true
    }
  });

var position = {
    x: 200,
    y: 200
};

Socketio.on("connection", socket => {
    console.log("emitting");

    socket.emit("position", position);
    socket.on("move", direction => {

        const moveAmount = 5;

        switch(direction) {
            case 'right':
                position.x = position.x + moveAmount;
            break;

            case 'left':
                position.x = position.x - moveAmount;
            break;

            case 'up':
                position.y = position.y - moveAmount;
            break;

            case 'down':
                position.y = position.y + moveAmount;
            break;
            
            default:
                break;
        }
        Socketio.emit("position", position);
    })
})

Http.listen(3000, () => {
    console.log("listening at port :3000...");
});

exports.app = functions.https.onRequest(Socketio);