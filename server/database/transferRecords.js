//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TransferRecord = new Schema({
    returnValues: Object,
    blockNumber: Number
});

const TransferRecord = mongoose.model('TransferRecord', yourSchema);
TransferRecord.find({ 'blockNumber': '3898995' }, 'returnValues blockNumber', function (err, records) {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
    console.log(records);
})