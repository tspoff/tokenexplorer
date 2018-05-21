import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import _ from 'lodash';

import * as tokenList from '../../util/tokenList';

import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class TokenList extends Component {
    state = {
        tokens: [],
        curr_block: null
    }

    async componentWillMount() {
        console.log(await web3.eth.getAccounts());
        var curr_block_no = await web3.eth.getBlockNumber();
        console.log(curr_block_no);

        const tokens = tokenList.tokens;
        console.log(tokens);

        this.setState({
            curr_block: curr_block_no,
            tokens: tokens
        });

        this.getBlocks(curr_block_no);
    }

    async getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();
        var max_blocks = 10;
        if (curr_block_no < max_blocks) max_blocks = curr_block_no;
        for (var i = 0; i < max_blocks; i++ , curr_block_no--) {
            var currBlockObj = await web3.eth.getBlock(curr_block_no);
            console.log(currBlockObj);
            block_ids.push(currBlockObj.number);
            block_hashes.push(currBlockObj.hash);
        }

        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes
        })
    }

    render() {
        const {tokens} = this.state;

        var tableRows = [];
        _.each(tokens, (value, index) => {

            const imgSrc = `/static/images/${tokens[index].icon}.png`
            tableRows.push(
                <tr key={this.state.tokens[index]}>
                    <td><img src={imgSrc}/></td>
                    <td className="tdCenter">{tokens[index].name}</td>
                    <td><Link href={`/tokens/${tokens[index].address}`}>{tokens[index].name}</Link></td>
                </tr>
            )
        });

        return (
            <Layout>
                <div className="Home">
                    <h2>Home page</h2>
                    Current Block: {this.state.curr_block}
                    <table>
                        <thead><tr>
                            <th>Block No</th>
                            <th>Hash</th>
                        </tr></thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </Layout>
        );
    }
}

export default TokenList;