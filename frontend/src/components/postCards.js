import React from 'react';  
import {Card,Badge} from 'react-bootstrap';
import likeIcon from '../images/like.png';
import deleteIcon from '../images/garbage.png';
import '../styles/postCards.css';
import placeholder from '../images/placeholder.jpg';
import {useDispatch} from 'react-redux';
import { likePost, deletePost } from '../actions/posts';

export default function postCards(props){
    const dispatch = useDispatch();

    // const deleteHandler = () =>{
    //     deletePost(props.currPost._id)
    //     props.setPosts(props.allPosts.filter((val)=>{
    //         return val._id!=props.currPost._id;
    //     }));
    // }

    // const likeHandler = () =>{
    //     likePost(props.currPost._id)
    //     props.setPosts(props.allPosts.map((val)=>{
    //         return val._id==props.currPost._id ? {...val,noOfLikes:val.noOfLikes+1} : val
    //     }));
    // }

    return(
            <Card style={{background:"",boxShadow:"20px"}}>
                <Card.ImgOverlay className="cardAction">
                    <Card.Text>{props.currPost.author}</Card.Text>
                    {/* <div><img src={editingIcon} alt="Edit" className="actionBtn" /></div> */}
                </Card.ImgOverlay>  
                <Card.Img variant="top" src={placeholder} alt={"Cover image"} />
            
                <Card.Body>
                    <Card.Title>
                        {props.currPost.title}
                        {props.currPost.tags.map((tag)=>{
                            return(
                                <Badge style={{margin:"0 3px", fontSize:"12px"}} bg="dark">{tag}</Badge>         
                            )
                        })}
                    </Card.Title>
                    <Card.Text>
                    {props.currPost.content}
                    </Card.Text>
                    <Card.Text className='cardAction'>
                    <div>
                        <img className="actionBtn" alt="Like" src={likeIcon} onClick={() => dispatch(likePost(props.currPost._id))}/>
                        <small>{' '}{props.currPost.noOfLikes}</small>
                    </div>
                    <div>
                        <img className='actionBtn' onClick={() => dispatch(deletePost(props.currPost._id))} alt="Delete" src={deleteIcon}/>
                    </div>
                    </Card.Text>
                </Card.Body>
             </Card>
        
    )
}

