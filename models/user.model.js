const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    scheduledMeetups: { type: Array, required: true },
    friends: { type: Array, required: true },
    pendingFriends: { type: Array, required: true },
    dateCreated: { type: Date, required: true },
}, 
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
