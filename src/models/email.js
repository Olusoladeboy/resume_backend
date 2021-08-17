const   mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    recipient: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: String,
        required: true,
        trim: true
    }
},  {
    timestamps: true
  });

const Email = mongoose.model('Emails', EmailSchema);

module.exports = Email;