import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import logo from '../images/logo.png';

export default function navbar(){
    return(
        <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{'  '}
            Memories
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
}