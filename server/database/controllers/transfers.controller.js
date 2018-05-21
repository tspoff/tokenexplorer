const Transfer = require('../models/transfers.model.js');

// Retrieve and return all Transfers from the database.
exports.findAll = (req, res) => {
    Transfer.find()
        .then(Transfers => {
            res.send(Transfers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Transfers."
            });
        });
};

// Find a single Transfer with a transferId
exports.findOne = (req, res) => {
    Transfer.findOne()
        .then(Transfer => {
            if (!Transfer) {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            res.send(Transfer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Transfer with id " + req.params.transferId
            });
        });
};

// Find a single Transfer with a transferId
exports.findByBlock = (req, res) => {
    Transfer.find({ tokenId: req.params.tokenId, blockNumber: req.params.blockNumber })
        .then(Transfer => {
            if (!Transfer) {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }

            console.log("blockNumber", req.params.blockNumber);
            console.log("transfer", Transfer);
            res.send(Transfer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Transfer with id " + req.params.transferId
            });
        });
};

// Update a Transfer identified by the transferId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Transfer content can not be empty"
        });
    }

    // Find Transfer and update it with the request body
    Transfer.findByIdAndUpdate(req.params.transferId, {
        title: req.body.title || "Untitled Transfer",
        content: req.body.content
    }, { new: true })
        .then(Transfer => {
            if (!Transfer) {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            res.send(Transfer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            return res.status(500).send({
                message: "Error updating Transfer with id " + req.params.transferId
            });
        });
};

// Delete a Transfer with the specified transferId in the request
exports.delete = (req, res) => {
    Transfer.findByIdAndRemove(req.params.transferId)
        .then(Transfer => {
            if (!Transfer) {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            res.send({ message: "Transfer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Transfer not found with id " + req.params.transferId
                });
            }
            return res.status(500).send({
                message: "Could not delete Transfer with id " + req.params.transferId
            });
        });
};