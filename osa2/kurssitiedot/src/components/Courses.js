import React from "react";

const Part = ({ part }) => {
  return (
    <div>
      <li>
        {part.name} {part.exercises}
      </li>
    </div>
  );
};

const Course = (props) => {
  const total = (previous, current) => previous + current;
  return (
    <div>
      <h2>{props.course.name}</h2>
      <div>
        {props.course.parts.map((part) => (
          <Part key={part.id} part={part} exercises={part.exercises} />
        ))}
      </div>
      <b>
        ----Total of{" "}
        {props.course.parts.map((part) => part.exercises).reduce(total)}{" "}
        exercises----
      </b>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

const Courses = (props) => {
  return (
    <div>
      <Content courses={props.courses} />
    </div>
  );
};

export default Courses;
