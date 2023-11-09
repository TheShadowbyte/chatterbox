const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ChatPage schema
const ChatSchema = new Schema({
    name: String,
    correspondents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

// Message schema
// const MessageSchema = new Schema({
//     chat: { type: Schema.Types.ObjectId, ref: 'ChatPage' },
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     messageText: String,
//     sentAt: { type: Date, default: Date.now }
// });

// Compile model from schema
const Chat = mongoose.model('Chat', ChatSchema);
// const Message = mongoose.model('Message', MessageSchema);

module.exports = { Chat };
