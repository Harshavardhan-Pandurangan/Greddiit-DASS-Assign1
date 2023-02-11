const express = require("express");
const router = express.Router();

const {
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    getUsers,
    verifyToken,
} = require("../controls/usercontrols");

router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);
// to be commented out when deployed
router.get("/getusers", getUsers);
router.get("/verifytoken", verifyToken);

module.exports = router;
