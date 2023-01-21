import React, { useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import decode from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    const token = user != null ? user.token : null;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        dispatch({ type: "LOGOUT" })
    }
  }, [user])


  return (
    <div style={{ background: "#212529", minHeight: "100vh" }}>
      <Navbar bg="black" variant="dark" className="mb-4 shadow-lg" >
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
            Memory-lane
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Navbar.Text style={{ textAlign: "right" }} className="me-4 p-0 overflow-hidden">
                {user.result.name}
                {user.result.picture && <img
                  className="border rounded-circle ms-2"
                  style={{ width: "32px" }}
                  src={user.result.picture}
                ></img>}
              </Navbar.Text>
            )}
            {user ? (
              <Button
                variant="outline-light"
                onClick={() => {
                  googleLogout();
                  dispatch({ type: "LOGOUT" });
                  navigate("/auth");
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
      <ToastContainer />
    </div>
  );
}
