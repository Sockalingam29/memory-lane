import React,{useEffect,useState} from 'react';
import NewPostForm from './components/newPostForm';
import Posts from './components/posts';
import NavbarMenu from './components/navbar';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

function App() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div style={{background:"#CFD2CF"}}>
      <NavbarMenu/>

      <Container fluid >
      <Row>
        <Col>
          <Posts setCurrentId={setCurrentId}  />
        </Col>
        <Col md={3}>
          <NewPostForm currentId={currentId} setCurrentId={setCurrentId}/>
        </Col>
      </Row>
    </Container>

    </div>
  );
}

export default App;
