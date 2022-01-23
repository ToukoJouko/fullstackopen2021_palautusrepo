import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));

    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const updateLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    //console.log(updatedBlog);

    await blogService.update(id, updatedBlog);
    setBlogs(await blogService.getAll());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setNotification(`wrong username or password`);
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.clear();
      setUser(null);
    } catch (exception) {
      console.log(exception);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={() => updateLikes(blog.id)}
        />
      ))}
    </div>
  );
};

export default App;
