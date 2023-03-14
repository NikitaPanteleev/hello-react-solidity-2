import React from "react";
import { Menu } from "semantic-ui-react";
import Link from 'next/link'

const Header = () => {
    return (
        <Menu style={{ marginTop: "10px" }}>
            <Link href="/"> <Menu.Item>CrowdCoin</Menu.Item></Link>

            <Menu.Menu position="right">
                <Menu.Item>Campaigns</Menu.Item>
                <Menu.Item> <Link href="/campaigns/new">+</Link></Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
