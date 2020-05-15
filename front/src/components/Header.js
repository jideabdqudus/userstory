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
import { Logo } from "../components";

const Header = ({ fullName, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <header className="header shadow-sm py-2 mb-4">
      <Container>
        <Row>
          <Navbar light expand="md" className={"w-100"}>
            <Link to={"/dashboard"}>
              <Logo className={"logo"} />
            </Link>
            <NavbarToggler onClick={toggle} />
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
                  <DropdownMenu right className={"p-2 w-100"}>
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
