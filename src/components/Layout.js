/* /components/Layout.js */

import React, { useContext } from "react";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../Providers/Context";
import { NavbarSearch } from "./index";
// import Carousel from "./carousel";

const Layout = (props) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <header>
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
