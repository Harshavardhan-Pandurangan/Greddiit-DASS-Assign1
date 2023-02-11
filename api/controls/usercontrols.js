const User = require("../models/users");
const bcrypt = require("bcryptjs");
const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createUser = asynHandler(async (req, res) => {
    if (req.body) {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.status(400).send({ error: "User already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            age: req.body.age,
            contactnumber: req.body.contactnumber,
        });

        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        if (user) {
            res.status(201).send({
                token,
            });
        } else {
            res.status(400).send({ error: "Invalid user data" });
        }
    }
});

const loginUser = asynHandler(async (req, res) => {
    if (req.body) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isMatch) {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30d",
                    }
                );

                res.status(200).send({
                    token,
                });
            } else {
                res.status(401).send({ error: "Invalid email or password" });
            }
        } else {
            res.status(401).send({
                email: req.body.email,
                error: "User not found",
            });
        }
    }
});

const updateUser = asynHandler(async (req, res) => {
    let authData;
    try {
        authData = await jwt.verify(req.token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id == authData._id) {
        res.status(403).send({ error: "You cannot update other users" });
        return;
    }

    if (req.params.id) {
        const userExists = await User.findById(req.params.id);
        if (!userExists) {
            res.status(400).send({ error: "User does not exist" });
            return;
        }
    }

    if (req.body) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
                contactnumber: req.body.contactnumber,
            },
            {
                new: true,
            }
        );

        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        if (user) {
            res.status(200).send({
                token,
            });
        } else {
            res.status(404).send({ error: "User not found" });
        }
    }
});

const deleteUser = asynHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.token);
    let authData;
    try {
        authData = await jwt.verify(req.token, process.env.JWT_SECRET);
    } catch (err) {
        res.send(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id == authData._id) {
        res.status(403).send({ error: "You cannot delete other users" });
        return;
    }

    if (req.params.id) {
        const userExists = await User.findById(req.params.id);
        if (!userExists) {
            res.status(400).send({ error: "User does not exist" });
            return;
        }
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
        res.status(200).send({
            message: "User deleted",
        });
    }
});

const getUsers = asynHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
});

const verifyToken = (req, res, next) => {
    let authData;
    try {
        authData = jwt.verify(req.token, process.env.JWT_SECRET);
    } catch (err) {
        res.send(403).send({ error: "Invalid token" });
        return;
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUsers,
    verifyToken,
};
