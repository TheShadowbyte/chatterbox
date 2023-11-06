const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

app.use(cors());


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('chat message', (message) => {
        socket.broadcast.emit('chat message', message);
    })
    socket.on('disconnect', () => console.log('Client disconnected'));
});

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));