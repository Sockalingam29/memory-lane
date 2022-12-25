import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../actions/posts";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function newPostForm({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: "",
    tags: [],
    selectedFile: "",
  });
  const [isUpload, setIsUpload] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (file) => {
    var reader = new FileReader();

    reader.onprogress = (e) => {
      setProgress((e.loaded / e.total) * 100);
    };
    console.log(progress);
    reader.readAsArrayBuffer(file);
  };

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const clear = () => {
    setIsUpload(false);
    setCurrentId(0);
    setPostData({
      title: "",
      content: "",
      author: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    if (currentId === 0) await dispatch(createPost(postData));
    else await dispatch(updatePost(postData._id, postData));
    clear();
  };

  const handleFileUpload = (base64) => {
    const size = Buffer.from(base64, "base64").toString("binary");
    console.log(size.length);
    if (size.length > 100000)
      return alert("File size too large. It will not be uploaded.");
    else {
      console.log(base64);
      setIsUpload(true);
      setIsUpload((prev) => console.log(prev));
      setPostData({ ...postData, selectedFile: base64 });
    }
  };

  return (
    <div>
      <h2>Add your memory!</h2>
      <Form onSubmit={handleSubmit} autoComplete="new-password">
        <Form.Group className="mb-2" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoComplete="new-password"
            type="text"
            placeholder="Enter title"
            value={postData["title"]}
            onChange={(e) =>
              setPostData({
                ...postData,
                title: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="postAuthor">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoComplete="new-password"
            type="text"
            placeholder="Enter your name"
            value={postData["author"]}
            onChange={(e) =>
              setPostData({
                ...postData,
                author: e.target.value,
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

        <Form.Group className="mb-2" controlId="postImage">
          <Form.Label>Upload (Max 100KB)</Form.Label>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              handleFileUpload(base64);
            }}
          />
        </Form.Group>

        <Button className="w-100 mb-2" variant="dark" type="submit">
          Submit
        </Button>
        <Button className="w-100 mb-2" variant="secondary" onClick={clear}>
          Clear
        </Button>
      </Form>
    </div>
  );
}
