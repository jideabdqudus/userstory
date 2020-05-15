import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Container,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Logo } from ".";
const Header = ({ fullName, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <header
      className="header shadow-sm py-2 mb-4"
      style={{ backgroundColor: "#333", borderColor: "#333" }}
    >
      <Container style={{ backgroundColor: "#333", borderColor: "#333" }}>
        <Row>
          <Navbar
            style={{
              backgroundColor: "#333",
              borderColor: "white",
              color: "white",
            }}
            color="faded"
            light
            className={"w-100"}
          >
            <Link to={"/dashboard"}>
              <Logo className={"logo"} />
            </Link>
            <NavbarToggler
              onClick={toggle}
              style={{ backgroundColor: "white", borderColor: "#333" }}
            />
            <Collapse isOpen={dropdownOpen} navbar>
              <Nav className="ml-auto" navbar>
                <hr className="d-md-none" />

                <NavItem>
                  <NavLink

                    className={"nav-link"}
                    to={"/dashboard"}
                    children="Dashboard"
                  />
                </NavItem>

                <hr className="d-md-none" />

                <NavItem className={"ml-md-4"}>
                  <NavLink
                    className={"nav-link"}
                    to={"/stories"}
                    children="Stories"
                  />
                </NavItem>

                <hr className="d-md-none" />

                <UncontrolledDropdown nav inNavbar className="">
                  <DropdownToggle nav caret className={"ml-md-4"}>
                    <span className={"mr-2"}>{fullName}</span>
                  </DropdownToggle>
                  <DropdownMenu className={"p-2 w-1"}>
                    <Button
                      color="danger"
                      className={"w-100"}
                      children={"Logout"}
                      onClick={logout}
                    />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  fullName: PropTypes.string,
};

export default Header;
