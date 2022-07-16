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
            setPosts(postsData.data.reverse());
        }catch(err){
            console.log("Error"+err);
        }
        }
        fetchData();
        }, []);

    return(
        <Container fluid>
            <Row>
                {posts.map((data)=>{
                    return(
                        <Col key={data._id} className="mb-3" xs={12} md={6} lg={6}>
                            <PostCard {...data} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}