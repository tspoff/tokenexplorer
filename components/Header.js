import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

export default (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route={"/"}>
                <a className="item">Token Explorer</a>
            </Link>
            <Menu.Menu position="right">
                <Link href={"/blocks"}>
                    <a className="item">Blocks</a>
                </Link>
                <Link href={"/tokens"}>
                    <a className="item">Tokens</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};