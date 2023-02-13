const express = require("express");
const router = express.Router();

const {
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    getUsers,
    verifyUser,
    getUser,
    deleteAllUsers,
} = require("../controls/usercontrols");

router.get("/verify", verifyUser);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);
router.get("/get/:id", getUser);
router.delete("/delete/:id", deleteUser);
// to be commented out when deployed
router.get("/getusers", getUsers);
router.delete("/deleteall", deleteAllUsers);

module.exports = router;
