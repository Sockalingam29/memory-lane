import React from "react";
import Form from "react-bootstrap/Form";

function input({ name, label, type, inputChangeHandler, passwordMatch }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={inputChangeHandler}
        name={name}
        type={type}
        placeholder={label}
        required
      />
      {passwordMatch && (
        <Form.Text className="text-success">Passwords match!</Form.Text>
      )}
      {passwordMatch === false && (
        <Form.Text className={"text-danger"}>Passwords don't match!</Form.Text>
      )}
    </Form.Group>
  );
}

export default input;
