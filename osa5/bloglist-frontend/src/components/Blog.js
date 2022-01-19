import React, { useState } from "react";

const Blog = ({ blog }) => {
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
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{allVisible ? "hide" : "view"}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
