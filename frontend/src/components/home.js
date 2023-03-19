import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import NewPostForm from './newPostForm';
import Posts from './posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'

function home({ isProfile }) {
  const [currentId, setCurrentId] = useState(0);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container fluid >
      <Posts setShow={setShow} isProfile={isProfile} setCurrentId={setCurrentId} />
      <NewPostForm show={show} setShow={setShow} currentId={currentId} setCurrentId={setCurrentId} />
    </Container>
  )
}

export default home