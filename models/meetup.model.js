const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetupSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    meetupHoster: { type: String, required: true },
    coordinates: { type: Array, required: true },
    peopleAttending: { type: Array, required: true },
}, 
{
    timestamps: true,
});

const Meetup = mongoose.model('Meetup', meetupSchema);
module.exports = Meetup;
