import React,{useEffect,useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import NewPostForm from './newPostForm';
import Posts from './posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'

function home({isProfile}) {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);
  
  return (
    <Container fluid >
    <Row>
      <Col>
        <Posts isProfile={isProfile} setCurrentId={setCurrentId}  />
      </Col>
      <Col md={3}>
        <NewPostForm currentId={currentId} setCurrentId={setCurrentId}/>
      </Col>
    </Row>
  </Container>
  )
}

export default home