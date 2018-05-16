import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../components/Layout';

import ERC20 from '../../ethereum/ERC20';
import web3 from '../../ethereum/web3';

class TokenDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transferRecords: [],
            loading: false
        }
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    async componentDidMount() {
        // const contract = Coursetro("0xc6895dda25577c865d4f14ea2d75effa8a8fbbe5");
        // this.getContractEvents(contract);

        console.log(this.props.address);
        const tokenContract = ERC20(this.props.address);
        await this.getContractEvents(tokenContract);
    }

    fetchData = async () => {
        this.setState({ loading: true }, () => {
            axios.get(`api/tokens/${this.props.address}` + this.props.id, {
                params: {
                    limit: this.state.limit,
                    offset: this.state.offset
                }
            })
                .then((response) => {
                    const { artist, albums } = response.data;
                    this.setState({
                        artist: artist,
                        albums: albums.items,
                        limit: albums.limit,
                        offset: albums.offset,
                        total: albums.total,
                        loading: false
                    });
                })
                .catch((error) => {
                    this.setState({ loading: false });
                });
        });
    }

    getContractEvents = async (contract) => {
        await contract.events.allEvents({
            fromBlock: 5600000
        }, function (error, event) { console.log('callback', event); })
            .on('data', function (event) {
                console.log('data', event);
            })
            .on('changed', function (event) {
                console.log('changed', event);
            })
            .on('error', console.error);

    }

    render() {
        return (
            <Layout>
                <div className="Block" >Token History</div>
            </Layout>
        );
    }
}

export default TokenDisplay;