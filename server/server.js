require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
// const router = express.Router();

const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const validateToken = require('./routes/validate-token');

// const setupSocketHandlers = require('./socket/socketHandlers');

const connectDB = require('./config/database');


const authenticate = require('./middleware/authenticate');

const app = express();

const server = http.createServer(app);
// const io = setupSocketHandlers(server);

// const authHelpers = require('./helpers/authHelpers');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', validateToken);

// router.get('/', (req, res) => {
//     res.json({ message: 'Hello from server!' });
// });

app.get('/', (req, res) => {

    authenticate(req, res, () => {
        if (req.user) {
            res.json({ user: req.user });
        }
        else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    });

});

// router.get('/login', (req, res) => {
//     console.log('Login route');
//     res.json({ message: 'Login route' });
// });
//
// // Initialize chat session (HTTP GET request)
// router.get('/chat', authenticate, (req, res) => {
//
//     // The user is authenticated at this point, and `req.user` contains the user details.
//     // You can generate a one-time token or ticket for the user to establish a WebSocket connection.
//
//     // This token should be short-lived and tied to the user's session.
//     const oneTimeToken = authHelpers.generateOneTimeToken(req.user.id);
//
//     // Send the one-time token back to the client
//     res.json({ oneTimeToken });
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));