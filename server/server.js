const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const router = express.Router();
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

connectDB();

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

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Initialize chat session (HTTP GET request)
router.get('/chat', authenticate, (req, res) => {
    // The user is authenticated at this point, and `req.user` contains the user details.
    // You can generate a one-time token or ticket for the user to establish a WebSocket connection.

    // This token should be short-lived and tied to the user's session.
    const oneTimeToken = generateOneTimeToken(req.user.id); // Implement this function to generate a token.

    // Send the one-time token back to the client
    res.json({ oneTimeToken });
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