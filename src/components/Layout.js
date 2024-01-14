/* /components/Layout.js */

import React, { useContext } from 'react';
import Link from 'next/link';
import { Container, Nav, NavItem } from 'reactstrap';
import { useApp } from '../Providers/Context';
import { NavbarSearch } from './index';
// import Carousel from "./carousel";

const Layout = (props) => {
    const { user } = useApp();
    console.log('user', user);
    return (
        <div>
            <header>
                <Nav className="navbar">
                    <Link href="/">
                        <img src="/delivery-man.png" alt="Delivery Man" className="logo" />
                    </Link>
                    <NavItem>
                        <Link href="/">
                            <a className="navbar-brand">Let's Eat!</a>
                        </Link>
                    </NavItem>
                    <NavbarSearch />
                    <NavItem className="ml-auto">
                        {user ? (
                            <h5>{user.username}</h5>
                        ) : (
                            <Link href="/register">
                                <a className="nav-link"> Sign up</a>
                            </Link>
                        )}
                    </NavItem>
                    <NavItem>
                        {user ? (
                            <>
                                <h5>Hello, {user.username}</h5>
                                <Link href="/">
                                    <a
                                        className="nav-link"
                                        onClick={() => {
                                            logout();
                                            setUser(null);
                                        }}
                                    >
                                        Logout
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <Link href="/login">
                                <a className="nav-link">Sign in</a>
                            </Link>
                        )}
                    </NavItem>
                </Nav>
                {/* <Carousel /> */}
            </header>
            <Container>{props.children}</Container>
        </div>
    );
};

export default Layout;
