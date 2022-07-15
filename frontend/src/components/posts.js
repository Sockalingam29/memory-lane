import React, { useEffect, useState } from 'react';
import PostCard from './postCards';
import {Container, Row, Col} from 'react-bootstrap';
import {fetchPosts} from '../api/index';

export default function posts(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try{
            const postsData = await fetchPosts();
            setPosts(postsData.data);
        }catch(err){
            console.log("Error"+err);
        }
        }
        fetchData();
        }, []);

    return(
        <Container fluid>
            <Row>
                <Col className="mb-3" xs={12} md={6} lg={4}>
                    <PostCard />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <PostCard />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <PostCard />
                </Col>
            </Row>
            {console.log(posts[0])}
        </Container>
    )
}