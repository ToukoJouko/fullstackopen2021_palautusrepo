import React from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course_name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.course_part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercise_total}</p>
    </div> 
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10
      },

      {
        name: 'Using props to pass data',
        exercises: 7
      },

      {
        name: 'State of a component',
        exercises: 14
      }

    ]
  }  

  const Content = () => {
    return (
      <div>
        <Part course_part={course.parts[0].name} exercises={course.parts[0].exercises} />
        <Part course_part={course.parts[1].name} exercises={course.parts[1].exercises} />
        <Part course_part={course.parts[2].name} exercises={course.parts[2].exercises} />
      </div>
    )
  }

  return (
    <div>
      <Header course_name={course.name} />
      <Content />
      <Total exercise_total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />    
    </div>
  );
}

export default App;
