import React from "react";

import { Navbar,Nav } from 'react-bootstrap'


class Navigation extends React.Component{

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/project">Projects</Nav.Link>
                    <Nav.Link href="/session">Add new Session</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="">Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )  
    }
}

export default Navigation;