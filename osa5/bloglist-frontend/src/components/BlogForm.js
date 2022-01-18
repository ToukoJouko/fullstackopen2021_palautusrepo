import React from "react";

const BlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.onSubmit}>
        title: <input value={props.titleValue} onChange={props.titleChange} />
        <br />
        author:{" "}
        <input value={props.authorValue} onChange={props.authorChange} />
        <br />
        url: <input value={props.urlValue} onChange={props.urlChange} />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
