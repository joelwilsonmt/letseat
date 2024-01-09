/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import NavbarSearch from "./navbarSearch";
// import Carousel from "./carousel";

const Layout = (props) => {
  const title = "Restaurant App";
  const { user } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav className="navbar">
          <img src="/delivery-man.png" alt="Delivery Man" className="logo" />
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
