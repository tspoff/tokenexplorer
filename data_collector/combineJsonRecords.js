const fs = require('fs');

const START_BLOCK = 0;
const END_BLOCK = 5700000;
const BLOCKS_PER_FILE = 100000;

let transferRecords = [];

fs.unlinkSync("./EOSTransferRecordsTotal.json");


for (let i = START_BLOCK; i < END_BLOCK; i += BLOCKS_PER_FILE) {
    const records = JSON.parse(fs.readFileSync(`./data_collector/data/EOSTransferRecords-${i}-${i + BLOCKS_PER_FILE}.json`));
    console.log("Output Content : \n" + records);

    for (let record of records) {
        //transferRecords.push(record);
        
        fs.appendFile("./data_collector/data/EOSTransferRecordsTotal.json", JSON.stringify(record) + ",", (err) => {
            if (err) throw err;
        });
    }
}