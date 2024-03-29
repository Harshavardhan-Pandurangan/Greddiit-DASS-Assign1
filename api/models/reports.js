const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    context: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    reportedby: {
        type: String,
        required: true,
    },
    reporteduser: {
        type: String,
        required: true,
    },
    postid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
    },
    subgreddiit: {
        type: String,
        required: true,
    },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
