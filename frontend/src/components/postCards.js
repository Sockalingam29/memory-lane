import React from 'react';  
import {Card,Badge} from 'react-bootstrap';
import likeIcon from '../images/like.png';
import deleteIcon from '../images/garbage.png';
import editIcon from '../images/editing.png';
import '../styles/postCards.css';
import placeholder from '../images/placeholder.jpg';
import {useDispatch} from 'react-redux';
import { likePost, deletePost } from '../actions/posts';

export default function postCards({currPost, setCurrentId}){
    const dispatch = useDispatch();

    return(
            <Card style={{background:"",boxShadow:"20px"}}>
                <Card.ImgOverlay className="cardAction">
                    <Card.Text>{currPost.authorName}</Card.Text>
                    <div onClick={()=>setCurrentId(currPost._id)}><img src={editIcon} alt="Edit" className="actionBtn" /></div>
                </Card.ImgOverlay>  
                <Card.Img variant="top" src={currPost.selectedFile} alt={"Cover image"} />
            
                <Card.Body>
                    <Card.Title>
                        {currPost.title}
                        {currPost.tags.map((tag)=>{
                            return(
                                <Badge style={{margin:"0 3px", fontSize:"12px"}} bg="dark">{tag}</Badge>         
                            )
                        })}
                    </Card.Title>
                    <Card.Text>
                    {currPost.content}
                    </Card.Text>
                    <Card.Text className='cardAction'>
                    <div>
                        <img className="actionBtn" alt="Like" src={likeIcon} onClick={() => dispatch(likePost(currPost._id))}/>
                        <small>{' '}{currPost.noOfLikes}</small>
                    </div>
                    <div>
                        <img className='actionBtn' onClick={() => dispatch(deletePost(currPost._id))} alt="Delete" src={deleteIcon}/>
                    </div>
                    </Card.Text>
                </Card.Body>
             </Card>
        
    )
}

