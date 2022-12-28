import React from "react";
import Form from "react-bootstrap/Form";

function input({ name, type }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{name}</Form.Label>
      <Form.Control type={type} placeholder={name} />
      <Form.Text className="text-muted"></Form.Text>
    </Form.Group>
  );
}

export default input;
