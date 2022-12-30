import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";

import jwt_decode from "jwt-decode";
import { signin, signup } from "../../actions/auth";

import Input from "./input";

export default function auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({});
  const [passwordMatch, setPasswordMatch] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ClientId = process.env.REACT_APP_CLIENT_ID;

  const inputChangeHandler = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isSignup) {
      if ([e.target.name] == "confirmPassword")
        if (e.target.value != formData.password) setPasswordMatch(false);
        else setPasswordMatch(true);
      if ([e.target.name] == "password")
        if (e.target.value != formData.confirmPassword)
          setPasswordMatch(false);
        else setPasswordMatch(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (passwordMatch) {
        dispatch(signup(formData, navigate));
      }
      else if (passwordMatch == false) {
        return alert("Passwords don't match!");
      }
    }
    else {
      dispatch(signin(formData, navigate));
    }
  };

  return (
    <Form
      className="m-md-auto m-2 p-4 shadow-lg border border-1 rounded-3"
      style={{ maxWidth: "460px", backgroundColor: "#CFD2CF" }}
      onSubmit={formSubmitHandler}
    >
      <h2 className="mb-3 text-center">{isSignup ? "Sign-up" : "Sign-in"}</h2>
      {isSignup && (
        <Input
          label="Name"
          name="name"
          type="text"
          inputChangeHandler={inputChangeHandler}
        />
      )}
      <Input
        label="Email"
        name="email"
        type="email"
        inputChangeHandler={inputChangeHandler}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        inputChangeHandler={inputChangeHandler}
      />
      {isSignup && (
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          inputChangeHandler={inputChangeHandler}
          passwordMatch={passwordMatch}
        />
      )}

      <Button variant="primary" type="submit" className="w-100 mb-3">
        {isSignup ? "Sign-up" : "Sign-in"}
      </Button>
      {isSignup && (
        <div className="mb-3 m-auto text-center">
          Already have an account?{" "}
          <span
            onClick={() => setIsSignup((prev) => !prev)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Sign-in{" "}
          </span>
        </div>
      )}
      {!isSignup && (
        <div className="mb-3 m-auto text-center">
          Don't have an account?{" "}
          <span
            onClick={() => setIsSignup((prev) => !prev)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Sign-up{" "}
          </span>
        </div>
      )}

      <hr />

      <GoogleOAuthProvider clientId={ClientId}>
        <div className="w-100">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const res = credentialResponse.credential;
              const user = { result: jwt_decode(res), token: res };
              dispatch({ type: "AUTH", data: user });
              navigate("/");
            }}
            onError={(err) => {
              console.log("Login Failed. Error: " + err);
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </Form>
  );
}
