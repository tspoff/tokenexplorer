import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';

import Layout from '../../components/Layout';

import ERC20 from '../../ethereum/ERC20';
import web3 from '../../ethereum/web3';

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block: []
        }
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return {address};
    }

    async componentDidMount() {
        const block_hash = this.props.url.query.hash;
        console.log("block_hash", block_hash);
        this.getBlockState(block_hash);

        // const contract = Coursetro("0xc6895dda25577c865d4f14ea2d75effa8a8fbbe5");
        // this.getContractEvents(contract);

        const tokenContract = ERC20("0x744d70FDBE2Ba4CF95131626614a1763DF805B9E");
        this.getContractEvents(tokenContract);
    }

    componentWillReceiveProps(nextProps) {
        var block_hash_old = this.props.address;
        var block_hash_new = nextProps.address;
        // compare old and new URL parameter (block hash)
        // if different, reload state using web3
        if (block_hash_old !== block_hash_new)
            this.getBlockState(block_hash_new);
    }

    getBlockState = async (block_hash) => {
        console.log("Block hash: " + block_hash);
        // Use web3 to get the Block object
        var currBlockObj = await web3.eth.getBlock(block_hash);
        // console.log(JSON.stringify(currBlockObj));
        // Set the Component state
        this.setState({
            block_id: currBlockObj.number,
            block_hash: currBlockObj.hash,
            block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
            block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
            block: currBlockObj
        })
    }

    getContractEvents = async (contract) => {
        // console.log(contract.events);
        // contract.getPastEvents('allEvents', {
        //     fromBlock: 0,
        //     toBlock: 'latest'
        // }, function (error, events) { console.log(events); })
        //     .then(function (events) {
        //         console.log(events) // same results as the optional callback above
        //     });

        contract.getPastEvents('Transfer', {
            fromBlock: 5600000,
            toBlock: 'latest'
        }, function (error, events) { console.log(events); })
            .then(function (events) {
                console.log(events) // same results as the optional callback above
            });


        console.log("Contract address", contract.options.address);

    }

    render() {
        const block = this.state.block;
        const difficulty = parseInt(block.difficulty, 10);
        const difficultyTotal = parseInt(block.totalDifficulty, 10);
        
        return (
            <Layout>
                <div className="Block" >
                    <h2>Block Info</h2>
                    <div>
                        <table>
                            <tbody>
                                <tr><td className="tdLabel">Height: </td><td>{this.state.block.number}</td></tr>
                                <tr><td className="tdLabel">Timestamp: </td><td>{this.state.block_ts}</td></tr>
                                <tr><td className="tdLabel">Transactions: </td><td>{this.state.block_txs}</td></tr>
                                <tr><td className="tdLabel">Hash: </td><td>{this.state.block.hash}</td></tr>
                                {/* <tr><td className="tdLabel">Parent hash: </td>
                                    <td><Link to={`../block/${this.state.block.parentHash}`}>{this.state.block.parentHash}</Link></td></tr> */}
                                <tr><td className="tdLabel">Nonce: </td><td>{this.state.block.nonce}</td></tr>
                                <tr><td className="tdLabel">Size: </td><td>{this.state.block.size} bytes</td></tr>
                                <tr><td className="tdLabel">Difficulty: </td><td>{difficulty}</td></tr>
                                <tr><td className="tdLabel">Difficulty: </td><td>{difficultyTotal}</td></tr>
                                <tr><td className="tdLabel">Gas Limit: </td><td>{block.gasLimit}</td></tr>
                                <tr><td className="tdLabel">Gas Used: </td><td>{block.gasUsed}</td></tr>
                                <tr><td className="tdLabel">Sha3Uncles: </td><td>{block.sha3Uncles}</td></tr>
                                <tr><td className="tdLabel">Extra data: </td><td>{this.state.block.extraData}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Block;