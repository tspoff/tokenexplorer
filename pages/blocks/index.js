import React, { Component } from 'react';
import { Button, Form, Input, Message, Card } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import _ from 'lodash';

import web3 from '../../ethereum/web3';

class BlockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_hashes: [],
            blocks: [],
            curr_block: null
        }
    }

    async componentWillMount() {
        console.log(await web3.eth.getAccounts());
        var curr_block_no = await web3.eth.getBlockNumber();
        // console.log(curr_block_no);
        this.setState({
            curr_block: curr_block_no
        });

        this.getBlocks(curr_block_no);
    }

    async getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();
        const blocks = this.state.blocks;
        var max_blocks = 10;
        if (curr_block_no < max_blocks) max_blocks = curr_block_no;
        for (var i = 0; i < max_blocks; i++ , curr_block_no--) {
            var currBlockObj = await web3.eth.getBlock(curr_block_no);
            block_ids.push(currBlockObj.number);
            block_hashes.push(currBlockObj.hash);
            blocks.push(currBlockObj);
        }
        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes,
            blocks: blocks,
        })
    }

    renderBlocks() {


    }

    render() {
        const { block_ids, block_hashes, blocks } = this.state;
        console.log(blocks);
        var tableRows = [];
        _.each(block_ids, (value, index) => {
            tableRows.push(
                <Card fluid>
                    <Card.Header>
                       {blocks[index].number}
                    </Card.Header>
                    <Card.Description>
                        {blocks[index].gasLimit}
                    </Card.Description>
                    <Card.Meta>
                        <Link href={`/block/${block_hashes[index]}`}>{block_hashes[index]}</Link>
                    </Card.Meta>
                </Card>
            )
        });

        return (
            <Layout>
                <div className="Home">
                    <h2>Home page</h2>
                    Current Block: {this.state.curr_block}
                    <Card.Group>
                        {tableRows}
                    </Card.Group>
                </div>
            </Layout>
        );
    }
}

export default BlockList;