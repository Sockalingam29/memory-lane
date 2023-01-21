import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import likeIcon from '../images/like.png';
import likeFillIcon from '../images/like-fill.png';
import deleteIcon from '../images/garbage.png';
import editIcon from '../images/editing.png';
import '../styles/postCards.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../actions/posts';

export default function postCards({ currPost, setCurrentId, user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthor = user != null ? (user.result.sub === currPost.author || user.result._id === currPost.author) : false;
    const [isLiked, setIsLiked] = useState(user != null ? (currPost.likes.find((like) => like === user.result.sub || like === user.result._id)) : false);
    const [likeCount, setLikeCount] = useState(currPost.likes.length);

    const likeHandler = () => {
        if (user != null) {
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            dispatch(likePost(currPost._id));
        } else {
            navigate('/auth');
        }
    }


    return (
        <Card bg="dark" className="rounded mx-2" style={{ boxShadow: " 8px 8px 16px #1c1f23,-8px -8px 16px #262b2f" }} >
            <Card.ImgOverlay className="cardAction">
                <Card.Text>{currPost.authorName}</Card.Text>
                {isAuthor && <div onClick={() => setCurrentId(currPost._id)}><img src={editIcon} alt="Edit" className="actionBtn" /></div>}
            </Card.ImgOverlay>
            <Card.Img variant="top" className="rounded-top" src={currPost.selectedFile} alt={"Cover image"} />

            <Card.Body>
                <Card.Title>
                    {currPost.title}
                    <div>
                        {currPost.tags.map((tag) => {
                            return (
                                <Badge style={{ marginRight: "6px", fontSize: "12px", color: "" }} bg="secondary">{tag}</Badge>
                            )
                        })}
                    </div>
                </Card.Title>
                <Card.Text>
                    {currPost.content}
                </Card.Text>
                <Card.Text className='cardAction'>

                    <div>
                        <img className="actionBtn" alt="Like" src={isLiked ? likeFillIcon : likeIcon} onClick={likeHandler} />
                        <small className='align-bottom'>{' '}{likeCount}</small>
                    </div>

                    {isAuthor && <div>
                        <img className='actionBtn' onClick={() => dispatch(deletePost(currPost._id))} alt="Delete" src={deleteIcon} />
                    </div>}
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

