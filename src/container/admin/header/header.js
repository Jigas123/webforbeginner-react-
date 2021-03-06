import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>Admin</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!props.AdminRegistered ? (
                            <div className="d-flex">
                                <NavItem>
                                    <NavLink onClick={props.registerClick}>Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={props.loginClick}>Sign In</NavLink>
                                </NavItem>
                            </div>
                        ) : (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {props.userName}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => props.logOut(props.userName)}>
                                        LogOut
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;