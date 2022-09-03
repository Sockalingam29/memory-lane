import React from 'react';
import PostCard from './postCards';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';

export default function posts({setCurrentId}){
    const posts = useSelector((state) => state.posts);


    return(
        <Container fluid>
            <Row>
                {posts.map((data)=>{
                    return(
                        <Col  className="mb-3" xs={12} md={6} lg={6}>
                            <PostCard currPost={data} setCurrentId={setCurrentId}  />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}