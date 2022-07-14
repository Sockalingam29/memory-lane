import React from 'react';
import './App.css';
import NewPostForm from './components/newPostForm';
import Posts from './components/posts';
import NavbarMenu from './components/navbar';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <>
      <NavbarMenu/>

      <Container fluid >
      <Row>
        <Col>
          <Posts />
        </Col>
        <Col md={3}>
          <NewPostForm />
        </Col>
      </Row>
    </Container>

    </>
  );
}

export default App;
