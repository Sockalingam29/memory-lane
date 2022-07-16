import React from 'react';  
import {Card,Badge} from 'react-bootstrap';
import likeIcon from '../images/like.png';
import deleteIcon from '../images/garbage.png';
import '../styles/postCards.css';
import editingIcon from '../images/editing.png';

export default function postCards(props){
    return(
            <Card style={{background:"#D3CEDF",boxShadow:"20px"}}>
                <Card.ImgOverlay className="cardAction">
                    <Card.Text>{props.author}</Card.Text>
                    <div><img src={editingIcon} alt="Edit" className="actionBtn" /></div>
                </Card.ImgOverlay>  
                <Card.Img variant="top" src={props.selectedFile} alt={"Cover image"} />
            
                <Card.Body>
                    <Card.Title>
                        {props.title}
                        {props.tags.map((tag)=>{
                            return(
                                <Badge style={{margin:"0 3px", fontSize:"12px"}} bg="dark">{tag}</Badge>         
                            )
                        })}
                    </Card.Title>
                    <Card.Text>
                    {props.content}
                    </Card.Text>
                    <Card.Text className='cardAction'>
                    <div>
                        <img className="actionBtn" alt="Like" src={likeIcon}/>
                        <small>{' '}{props.noOfLikes}</small>
                    </div>
                    <div>
                    <img className='actionBtn' alt="Delete" src={deleteIcon}/>
                    </div>
                    </Card.Text>
                </Card.Body>
             </Card>
        
    )
}

