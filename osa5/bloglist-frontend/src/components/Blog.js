import React, { useState } from "react";

const Blog = ({ blog, updateLikes, remove }) => {
  const [allVisible, setAllVisible] = useState("");

  const showWhenVisible = { display: allVisible ? "" : "none" };

  const toggleVisibility = () => {
    setAllVisible(!allVisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p> <p>{blog.author}</p>
      <button onClick={toggleVisibility}>{allVisible ? "hide" : "view"}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
