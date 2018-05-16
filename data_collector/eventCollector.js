const web3 = require('./web3');
const ERC20 = require('./ERC20');
const fs = require('fs');
const tokens = require('./tokens');

const BLOCKS_PER_QUERY = 100000;

const collectData = async () => {
    // const contract = Coursetro("0xc6895dda25577c865d4f14ea2d75effa8a8fbbe5");
    // this.getContractEvents(contract);

    for (let token of tokens) {

        let records;
        let addresses;

        let startBlock = 0;
        const tokenContract = ERC20(token.address);

        //TODO: find latest block
        for (let i = 0; i < 60; i++) {
            records = await getContractEvents(tokenContract, startBlock, startBlock + BLOCKS_PER_QUERY);
            //addresses = await calcUserBalances(records);

            fs.writeFileSync(`./data_collector/data/${token.name}TransferRecords-${startBlock}-${startBlock + BLOCKS_PER_QUERY}.json`, JSON.stringify(records));
            //fs.writeFileSync(`./${token.name}UserBalances-${startBlock}-${startBlock + BLOCKS_PER_QUERY}.json`, JSON.stringify(addresses)); 
            startBlock += BLOCKS_PER_QUERY;
        }
    }





}

const getContractEvents = async (contract, startBlock, endBlock) => {
    let transferRecords;
    await contract.getPastEvents('Transfer', {
        fromBlock: startBlock,
        toBlock: endBlock
    }, function (error, events) {
        console.log(events);
        transferRecords = events;
    })
        .then(function (events) {
            console.log("events", events);
            transferRecords = events;
            console.log("records", transferRecords);
        });

    return transferRecords;

}

const calcUserBalances = async (records) => {
    let addresses = {};
    console.log("Calculating Addresses from", records);

    for (let record of records) {
        const event = record.returnValues;
        if (addresses[event.to] === undefined) {
            addresses[event.to] = event.tokens;
        } else {
            addresses[event.to] += event.tokens;
        }

        if (addresses[event.from] === undefined) {
            addresses[event.from] = 0;
        } else {
            addresses[event.from] -= event.tokens;
        }
    }

    return addresses;
}

collectData();
