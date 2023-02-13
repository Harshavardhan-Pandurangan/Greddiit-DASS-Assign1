const Subgreddit = require("../models/subgreddiits");
const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createSubgreddit = asynHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot create subgreddits for other users",
            });
            return;
        }
    }

    if (req.body) {
        const subgredditExists = await Subgreddit.findOne({
            name: req.body.name,
        });
        if (subgredditExists) {
            res.status(400).send({ error: "Subgreddit already exists" });
            return;
        }

        const subgreddit = await Subgreddit.create({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            banned: req.body.banned,
            createdby: req.params.id,
            createdon: req.body.createdon,
            moderators: [req.params.id],
            normierequests: [],
            bannednormies: [],
            normies: [],
        });

        if (subgreddit) {
            res.status(201).send({
                creation_status: "success",
            });
        } else {
            res.status(400).send({
                creation_status: "failure",
                error: "Invalid subgreddit data",
            });
        }
    }
});

const getSubgreddiits = asynHandler(async (req, res) => {
    const subgreddiits = await Subgreddit.find({});
    res.send(subgreddiits);
});

const deleteAllSubgreddiits = asynHandler(async (req, res) => {
    await Subgreddit.deleteMany({});
    res.send({ message: "All subgreddiits deleted" });
});

module.exports = { createSubgreddit, getSubgreddiits, deleteAllSubgreddiits };
