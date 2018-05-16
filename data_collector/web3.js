const Web3 = require('web3');
const keys = require('./config/dataKeys');

let web3;

//Defined on browser, not on Node
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
    //On server, or not running metamask
    const provider = new Web3.providers.HttpProvider(keys.infuraMainnet);
    web3 = new Web3(provider);
}


module.exports = web3;