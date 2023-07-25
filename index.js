const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home");
})
app.get("/peer", (req, res) => {
    res.render("peer")
})
app.get("/secondpeer", (req, res) => {
    res.render("second_peer")
})

app.get("/server", (req,res) => {
    res.render("server")
})
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('offer', (offer) => {
        console.log(offer)
        io.emit('offer', offer);
       
    })
    socket.on('answer', (answer) => {
        console.log(answer)
        io.emit('answer', answer);
       
    })
    
})
server.listen(4000, () => console.log("listening on port 4000"))