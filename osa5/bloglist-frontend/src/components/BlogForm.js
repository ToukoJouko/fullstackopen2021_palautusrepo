import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title: <input value={newTitle} onChange={handleTitleChange} />
        <br />
        author: <input value={newAuthor} onChange={handleAuthorChange} />
        <br />
        url: <input value={newUrl} onChange={handleUrlChange} />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
