import React, { useState } from "react";
import PropTypes from "prop-types";

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
        title:
        <input
          id="title"
          className="title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br />
        author:
        <input
          id="author"
          className="author"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br />
        url:{" "}
        <input
          id="id"
          className="url"
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
