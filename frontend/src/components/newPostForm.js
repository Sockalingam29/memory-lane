import React,{useState} from 'react';  
import FileBase from 'react-file-base64';
import {createPost} from '../api/index';
import {Button,Form} from 'react-bootstrap';

export default function newPostForm(){
    const [postData, setPostData] = useState({title:'',content:'',author:'',tags:[],selectedFile:''});

    const clear = () =>{
        setPostData({title:'',content:'',author:'',tags:[],selectedFile:''});
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        createPost(postData);
        setPostData({title:'',content:'',author:'',tags:[],selectedFile:''});
    }

    return(
        <div>
            <h2>Add your memory!</h2>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group className="mb-3" controlId="postTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"  placeholder="Enter title" value={postData['title']} onChange = {
                        (e) => setPostData({
                            ...postData,
                            title: e.target.value
                        })
                    }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="postAuthor">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={postData['author']} onChange = {
                        (e) => setPostData({
                            ...postData,
                            author: e.target.value
                        })
                    } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postContent">
                    <Form.Label>Your Memory</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Pen down your memories" value={postData['content']} onChange={
                        (e)=>setPostData({
                            ...postData,
                            content:e.target.value
                        })
                    } />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="postTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Enter tags" value={postData['tags']} onChange = {
                        (e) => setPostData({
                            ...postData,
                            tags: e.target.value
                        })
                    } />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="postImage">
                    <Form.Label>Upload</Form.Label>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={({base64})=> setPostData({...postData, selectedFile:base64})}
                    />                
                </Form.Group>
                
                <Button className="w-100 mb-3" variant="dark" type="submit">
                    Submit
                </Button>
                <Button className="w-100 mb-3" variant="secondary" onClick={clear}>
                    Clear
                </Button>
            </Form>
        </div>
    )
}

