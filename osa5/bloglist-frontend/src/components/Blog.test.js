import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "test title",
    author: "test author",
    user: { name: undefined },
  };

  const component = render(<Blog blog={blog} />);

  component.debug();

  expect(component.container).toHaveTextContent("test title");
  expect(component.container).toHaveTextContent("test author");
});

test("show url and links after button press", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: "test likes",
    user: { name: "test name" },
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("test title");
  expect(component.container).toHaveTextContent("test author");
  expect(component.container).toHaveTextContent("test url");
  expect(component.container).toHaveTextContent("test likes");
  expect(component.container).toHaveTextContent("test name");
});

test("updateLikes is called twice when like button is pressed two times", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: "test likes",
    user: { name: "test name" },
  };
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} updateLikes={mockHandler} />);

  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
