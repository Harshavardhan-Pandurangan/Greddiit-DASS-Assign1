const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    contactnumber: {
        type: Number,
        required: true,
    },
    saved: {
        type: Array,
        required: true,
        default: [],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
