import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

export default function navbar() {
  const user = null;
  return (
    <div style={{ background: "#CFD2CF", minHeight: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"  "}
            Memories
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <Button variant="outline-light">Logout</Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline-light">Sign-in</Button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
