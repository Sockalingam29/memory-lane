import React from 'react';
import NewPostForm from './components/newPostForm';
import Posts from './components/posts';
import NavbarMenu from './components/navbar';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div style={{background:"#CFD2CF"}}>
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

    </div>
  );
}

export default App;
