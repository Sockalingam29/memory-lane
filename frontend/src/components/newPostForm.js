import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";
import { createPost, updatePost } from "../actions/posts";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import '../styles/newPostForm.css'
import createPostIcon from '../images/create-post.png'

export default function newPostForm({ show, setShow, currentId, setCurrentId }) {

  const user = useSelector((state) => state.auth.authData);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: [],
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      content: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleClose = () => {
    clear();
    setShow(false)
  }

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(postData);
    if (currentId === 0) await dispatch(createPost({ ...postData, authorName: user.result.name }));
    else await dispatch(updatePost(postData._id, { ...postData, authorName: user.result.name }));
    handleClose();
    setIsLoading(false);
  };

  const handleFileUpload = (base64) => {
    const size = Buffer.from(base64, "base64").toString("binary");
    console.log(size.length);
    if (size.length > 100000)
      return alert("File size too large. It will not be uploaded.");
    else {
      console.log(base64);
      setPostData({ ...postData, selectedFile: base64 });
    }
  };

  return (
    <div>
      <div onClick={handleShow} id="createPostIcon" className="p-3 rounded-circle">
        <img style={{ width: "32px" }} src={createPostIcon}></img>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#212529" }} closeButton closeVariant="white">
          <Modal.Title>Add your memory!</Modal.Title>

        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#212529" }} >
          {user == null
            ? <p>Please <Link style={{ color: "white", textDecorationColor: "white" }} to="/auth">login</Link> to add your memories</p>
            : <Form onSubmit={handleSubmit} autoComplete="new-password">
              <Form.Group className="mb-2" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  type="text"
                  placeholder="Enter title"
                  value={postData["title"]}
                  autoFocus
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="postContent">
                <Form.Label>Your Memory</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Pen down your memories"
                  value={postData["content"]}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      content: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="postTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  type="text"
                  placeholder="Enter tags"
                  value={postData["tags"]}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      tags: e.target.value.split(","),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="postImage">
                <Form.Label>Upload (Max 100KB)</Form.Label>
                <div>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      handleFileUpload(base64);
                    }}
                  />
                </div>
              </Form.Group>

              <Button className="w-100 mb-2" variant="outline-light" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
              <Button className="w-100 mb-2" variant="secondary" onClick={clear} disabled={isLoading}>
                Clear
              </Button>
            </Form>
          }
        </Modal.Body>
      </Modal>

    </div>
  );
}
