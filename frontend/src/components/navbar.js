import React, { useState, useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";

export default function navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const mail = user !== null ? user.email : null;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div style={{ background: "#CFD2CF", minHeight: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="32"
              height="32"
              className="d-inline-block align-top"
            />
            {"  "}
            Memories
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Navbar.Text className="me-4 p-0">
                {user.name}
                <img
                  className="border rounded-circle ms-2"
                  style={{ width: "32px" }}
                  src={user.picture}
                ></img>
              </Navbar.Text>
            )}
            {user ? (
              <Button
                variant="outline-light"
                onClick={() => {
                  googleLogout();
                  dispatch({ type: "LOGOUT" });
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
              </Button>
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
