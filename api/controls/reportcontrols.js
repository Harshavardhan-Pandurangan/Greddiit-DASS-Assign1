const Report = require("../models/reports");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createReport = asyncHandler(async (req, res) => {
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
                error: "You cannot create reports for other users",
            });
            return;
        }
    }

    if (req.body) {
        const report = await Report.create({
            title: req.body.title,
            context: req.body.context,
            reportedby: req.params.id,
            reporteduser: req.body.reporteduser,
            postid: req.body.postid,
        });
        if (report) {
            res.status(201).send({
                creation_status: "success",
            });
        }

        if (!report) {
            res.status(400).send({
                creation_status: "failure",
                error: "Invalid report data",
            });
        }
    }
});

const getReports = asyncHandler(async (req, res) => {
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
                error: "You cannot view reports for other users",
            });
            return;
        }
    }

    const reports = await Report.find({ subgreddiit: req.body.id });
    if (reports) {
        res.status(200).send(reports);
    }

    if (!reports) {
        res.status(404).send({
            error: "No reports found",
        });
    }
});

const getReport = asyncHandler(async (req, res) => {
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
                error: "You cannot view reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.params.id);
    if (report) {
        res.status(200).send(report);
    }

    if (!report) {
        res.status(404).send({
            error: "No report found",
        });
    }
});

const updateReport = asyncHandler(async (req, res) => {
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
                error: "You cannot update reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.body.id);
    if (report) {
        report.status = req.body.status;
        const updatedReport = await report.save();
        res.status(200).send(updatedReport);
    }

    if (!report) {
        res.status(404).send({
            error: "No report found",
        });
    }
});

const deleteReport = asyncHandler(async (req, res) => {
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
                error: "You cannot delete reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.body.id);
    if (report) {
        await report.remove();
        res.status(200).send({
            deletion_status: "success",
        });
    }

    if (!report) {
        res.status(404).send({
            deletion_status: "failure",
            error: "No report found",
        });
    }
});

const deleteAllReports = asyncHandler(async (req, res) => {
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
                error: "You cannot delete reports for other users",
            });
            return;
        }
    }

    const reports = await Report.find({ subgreddiit: req.body.id });
    if (reports) {
        await Report.deleteMany({ subgreddiit: req.body.id });
        res.status(200).send({
            deletion_status: "success",
        });
    }

    if (!reports) {
        res.status(404).send({
            deletion_status: "failure",
            error: "No reports found",
        });
    }
});

const deleteAllReportsForce = asyncHandler(async (req, res) => {
    await Report.deleteMany({});
    res.status(200).send({
        deletion_status: "success",
    });
});

module.exports = {
    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
    deleteAllReports,
    deleteAllReportsForce,
};
