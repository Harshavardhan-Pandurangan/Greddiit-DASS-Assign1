const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subgredditSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    banned: {
        type: Array,
        required: true,
    },
    createdby: {
        type: String,
        required: true,
    },
    createdon: {
        type: Date,
        required: true,
    },
    moderators: {
        type: Array,
        required: true,
    },
    normierequests: {
        type: Array,
        required: true,
    },
    bannednormies: {
        type: Array,
        required: true,
    },
    normies: {
        type: Array,
        required: true,
    },
});

const Subgreddit = mongoose.model("Subgreddit", subgredditSchema);

module.exports = Subgreddit;
