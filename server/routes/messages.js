const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Get messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Post a new message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message({
            sender: req.body.sender, // Sender user ID
            content: req.body.content,
            chat: req.body.chat // Chat ID if applicable
        });

        const message = await newMessage.save();
        res.json(message);

        // Normally, you would also emit this message to the chat via WebSocket here
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
