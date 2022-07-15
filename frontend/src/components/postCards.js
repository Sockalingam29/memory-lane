import React from 'react';  
import {Card,Button} from 'react-bootstrap';
import logo from '../images/logo.png';

export default function postCards(props){
    console.log(props.post);
    return(
            <Card>
                <Card.Img variant="top" src={logo} alt={"none"}/>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                    <Button variant="primary">Button</Button>
                </Card.Body>
             </Card>
        
    )
}

