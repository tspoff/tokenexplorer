const mongoose = require('mongoose');

const TransfserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    blockNumber: Number,
    transactionHash: String,
    transactionIndex: Number,
    blockHash: String,
    logIndex: Number,
    id: String,
    returnValues: {from: String, to: String, tokens: String},
    event: String,
    signature: String,
    raw: Object,
    tokenId: String
});

module.exports = mongoose.model('Transfer', TransfserSchema);