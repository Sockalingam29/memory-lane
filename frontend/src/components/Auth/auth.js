import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import Input from "./input";

export default function auth() {
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ClientId=process.env.REACT_APP_CLIENT_ID;

  return (
    <Form
      className="m-md-auto m-2 p-4 shadow-lg border border-1 rounded-3"
      style={{ maxWidth: "460px", backgroundColor: "#CFD2CF" }}
    >
      <h2 className="mb-3 text-center">{isSignup ? "Sign-up" : "Sign-in"}</h2>
      {isSignup && <Input name="Name" type="text" />}
      <Input name="Email" type="email" />
      <Input name="Password" type="password" />
      {isSignup && <Input name="Confirm Password" type="password" />}
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
              const user = jwt_decode(res);
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
