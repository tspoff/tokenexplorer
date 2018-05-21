import React, { Component, cloneElement } from 'react';
import { Button, Table, Dimmer, Loader, Image, Segment, Input, Icon, Grid } from 'semantic-ui-react';
import { ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';

import Link from 'next/link';
import axios from 'axios';

import Layout from '../../components/Layout';
import BarChart from '../../components/BarChart';

import ERC20 from '../../ethereum/ERC20';
import web3 from '../../ethereum/web3';

import * as d3 from "d3";

import * as tokenList from "../../util/tokenList";

class TokenDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transfers: [],
            blockNumbers: [],
            loading: true,
            nodes: [],
            links: [],
            transactions: [],

            block: undefined,
            tokenName: undefined
        }
    }

    static async getInitialProps(props) {
        console.log("props", props.query);
        const { address, block } = props.query;
        return { address, block };
    }

    async componentDidMount() {
        console.log(this.props.address);

        let block;
        if (this.props.block) {
            block = Number(this.props.block);
        } else {
            block = 0;
        }

        let tokenName = "";
        tokenName = tokenList.getTokenNameFromAddress(this.props.address);

        await this.setState({ block: this.props.block, tokenName: tokenName });
        await this.fetchData(tokenName, block);
    }

    async processTransfers(data) {

        let blockNumbers = [];
        let fromAddresses = [];
        let toAddresses = [];
        let nodes = [];
        let links = [];
        let transactions = [];

        for (let transfer of data) {
            blockNumbers.push(transfer.blockNumber);
            transactions.push({ "from": transfer.returnValues.from, "to": transfer.returnValues.to, "value": transfer.returnValues.tokens });

            if (!fromAddresses.includes(transfer.returnValues.from)) {
                fromAddresses.push(transfer.returnValues.from);
                nodes.push({ "id": transfer.returnValues.from, "group": 1 });
            }

            if (!toAddresses.includes(transfer.returnValues.to)) {
                toAddresses.push(transfer.returnValues.to);
                nodes.push({ "id": transfer.returnValues.to, "group": 2 });
            }

            links.push({ "source": transfer.returnValues.from, "target": transfer.returnValues.to, "value": transfer.returnValues.tokens });
        }

        this.setState({ blockNumbers, nodes, links, toAddresses, fromAddresses, transactions });
        this.generateForceChart();


    }

    fetchData = async (tokenName, block) => {
        this.setState({ loading: true }, () => {
            axios.get(`/transfers/${tokenName}/${block}`, {
            })
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        transfers: response.data,
                        loading: false
                    });

                    this.processTransfers(response.data);
                })
                .catch((error) => {
                    this.setState({ loading: false });
                });
        });
    }

    async generateForceChart() {
        console.log("generateForceChart");
        const { toAddresses, fromAddresses, links } = this.state;

        let dataToChart = []
        toAddresses.forEach(addr => {
            console.log("generateForceChart");
            dataToChart.push(<ForceGraphNode node={{ id: addr }} fill="red" />);
        });

        fromAddresses.forEach(addr => {
            console.log("generateForceChart");
            dataToChart.push(<ForceGraphNode node={{ id: addr }} fill="blue" />)
        });

        links.forEach(link => {
            console.log("generateForceChart");
            dataToChart.push(<ForceGraphArrowLink link={link} />)
        });

        this.setState({ chartTransactions: dataToChart.map(this.attachEvents) });
    }

    attachEvents(child) {
        return cloneElement(child, {
            onMouseDown: console.log(child.type.name + "MouseDown"),
            onMouseOver: console.log(child.type.name + "MouseOver"),
            onMouseOut: console.log(child.type.name + "MouseOut"),
        });
    }

    nextBlock = async () => {
        let { block } = this.state;
        block = Number(block) + 1;
        this.setState({ block });

        await this.fetchData();
    }

    prevBlock = async () => {
        let { block } = this.state;
        block = Number(block) - 1;
        this.setState({ block });

        await this.fetchData();
    }

    renderTxTableRows() {
        let { transactions } = this.state;

        return transactions.map((tx, index) => {
            return <Table.Row>
                <Table.Cell>{tx.from}</Table.Cell>
                <Table.Cell>{tx.to}</Table.Cell>
                <Table.Cell>{tx.value}</Table.Cell>
            </Table.Row>
        })
    }

    render() {

        const { loading, blockNumbers, block, chartTransactions, tokenName } = this.state;

        return (
            <Layout>

                <h2>{tokenName} Transaction History</h2>

                <Input type='text' placeholder='Search...' defaultValue="0" value={block} action>
                    <input />
                    <Button type='submit' icon onClick={this.prevBlock}>
                        <Icon name='left arrow' />
                    </Button>
                    <Button type='submit' icon onClick={this.nextBlock}>
                        <Icon name='right arrow' />
                    </Button>
                </Input>
                <Segment>
                    {loading ? (
                        <Dimmer active>
                            <Loader indeterminate>Preparing Chart</Loader>
                        </Dimmer>
                    ) : (
                        
                            <div>
                                <ForceGraph simulationOptions={{ animate: true, strength: { collide: 2, } }}>
                                    {chartTransactions}
                                </ForceGraph>
                                
                                <Table>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.Cell>From</Table.Cell>
                                            <Table.Cell>To</Table.Cell>
                                            <Table.Cell>Value</Table.Cell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.renderTxTableRows()}
                                    </Table.Body>
                                </Table>     
                            </div>
                        )}
                </Segment>
            </Layout>
        );
    }
}

export default TokenDisplay;