const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/greddiit", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const userRoutes = require("./routes/userroutes");
const subgredditRoutes = require("./routes/subgreddiitroutes");
const postRoutes = require("./routes/postroutes");
const reportRoutes = require("./routes/reportroutes");

app.use("/users", userRoutes);
app.use("/subgreddiits", subgredditRoutes);
app.use("/posts", postRoutes);
app.use("/reports", reportRoutes);

app.listen(3001, () => console.log("Server is running on port 3001"));
