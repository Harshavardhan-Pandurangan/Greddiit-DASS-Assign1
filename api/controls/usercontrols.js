const User = require("../models/users");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token) {
        try {
            const authData = await jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).send({
                _id: authData._id,
                verify: "valid",
            });
        } catch (err) {
            res.status(403).send({ verify: "Invalid token" });
        }
    } else {
        res.status(403).send({ verify: "No token provided" });
    }
});

const createUser = asyncHandler(async (req, res) => {
    if (req.body) {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.status(400).send({ error: "Email already exists" });
            return;
        }

        const usernameExists = await User.findOne({
            username: req.body.username,
        });
        if (usernameExists) {
            res.status(400).send({ error: "Username already exists" });
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
            dob: req.body.dob,
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
                _id: user._id,
            });
        } else {
            res.status(400).send({ error: "Invalid user data" });
        }
    }
});

const loginUser = asyncHandler(async (req, res) => {
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
                    _id: user._id,
                });
            } else {
                res.status(401).send({ error: "Invalid email or password" });
            }
        } else {
            res.status(401).send({
                error: "User not found",
            });
        }
    }
});

const updateUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id != authData._id) {
        res.status(403).send({ error: "You cannot update other users" });
        return;
    }

    let userExists;

    if (req.params.id) {
        userExists = await User.findById(req.params.id);
        if (!userExists) {
            res.status(400).send({ error: "User does not exist" });
            return;
        }
    }

    const isMatch = await bcrypt.compare(
        req.body.password,
        userExists.password
    );

    if (!isMatch) {
        res.status(401).send({ error: "Invalid password" });
        return;
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
                dob: req.body.dob,
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
                _id: user._id,
            });
        } else {
            res.status(404).send({ error: "User not found" });
        }
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id != authData._id) {
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

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
});

const getUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id != authData._id) {
        res.status(403).send({ error: "You cannot view other users" });
        return;
    }

    const user = await User.findById(req.params.id);

    if (user) {
        let userWithoutPassword = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            dob: user.dob,
            contactnumber: user.contactnumber,
        };
        res.status(200).send(userWithoutPassword);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});

const deleteAllUsers = asyncHandler(async (req, res) => {
    const users = await User.deleteMany({});
    res.status(200).send(users);
});

const savePostUser = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    try {
        authData = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(403).send({ error: "Invalid token" });
        return;
    }

    if (req.params.id != authData._id) {
        res.status(403).send({ error: "You cannot update other users" });
        return;
    }

    const user = await User.findById(req.params.id);
    if (user) {
        if (req.body.type == "save") {
            if (!user.saved.includes(req.body.id)) {
                user.saved.push(req.body.id);
            }
        } else if (req.body.type == "unsave") {
            if (user.saved.includes(req.body.id)) {
                user.saved = user.saved.filter((id) => id != req.body.id);
            }
        }
        await user.save();
        res.status(200).send(user);
        return;
    } else {
        res.status(404).send({ error: "User not found" });
        return;
    }
});

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUsers,
    verifyUser,
    getUser,
    deleteAllUsers,
    savePostUser,
};
