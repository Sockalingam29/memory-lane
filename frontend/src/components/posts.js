import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PostCard from './postCards';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../styles/posts.css';

export default function posts({ isProfile, setCurrentId }) {
    const posts = useSelector((state) => state.posts);
    const user = useSelector((state) => state.auth.authData);

    return (
        !posts.length ?
            <div id="spinnerContainer">
                <Spinner id="spinner" animation="border">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            : <Container fluid>
                {isProfile && <h2 className='text-center mb-4'>Your Posts</h2>}
                {isProfile && !user && <p className="text-center">Please <Link style={{ color: "white", textDecorationColor: "white" }} to="/auth">login</Link> to add your memories</p>}
                <Row>
                    {posts.map((data) => {
                        const isAuthor = user != null ? (user.result.sub === data.author || user.result._id === data.author) : false;
                        if (isProfile && !isAuthor) return null;
                        return (
                            <Col className="mb-3" md={6} xxl={4} >
                                <PostCard isAuthor={isAuthor} currPost={data} setCurrentId={setCurrentId} user={user} />
                            </Col>
                        )
                    })}

                </Row>
            </Container>
    )
}