const express = require("express");
const router = express.Router();

const {
    createSubgreddit,
    getSubgreddiits,
    deleteAllSubgreddiits,
} = require("../controls/subgreddiitcontrols");

router.post("/create/:id", createSubgreddit);
router.get("/getall", getSubgreddiits);
// to be commented out when deployed
router.delete("/deleteall", deleteAllSubgreddiits);

module.exports = router;
