// socketHandlers.js
const socketIo = require('socket.io');

// This function should be imported from wherever you define it
const { validateOneTimeToken } = require('../helpers/authHelpers');

module.exports = (server) => {
    const io = socketIo(server);

    io.use((socket, next) => {
        const token = socket.handshake.query.token;
        validateOneTimeToken(token)
            .then((user) => {
                if (!user) {
                    return next(new Error('Authentication error'));
                }
                socket.user = user;
                next();
            })
            .catch((err) => next(new Error('Authentication error')));
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.user);

        // Set up all event listeners for this socket
        socket.on('chat message', (msg) => {
            io.emit('chat message', { user: socket.user, msg });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        // ... more event listeners as needed
    });

    return io;
};
