import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const copy = [...points];

  const handleSelection = () => {
    //random indeksi listasta, math.floor pyöristää lähimpään kokonaislukuun
    const random_index = Math.floor(Math.random() * anecdotes.length);
    setSelected(random_index);
  };

  const handlePoints = () => {
    copy[anecdotes.indexOf(anecdotes[selected])] += 1;
    setPoints(copy);
    //console.log(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <Button handleClick={() => handlePoints()} text="vote" />
      <Button handleClick={() => handleSelection()} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[copy.indexOf(Math.max(...copy))]}</p>
      <p>has {Math.max(...copy)} votes</p>
    </div>
  );
};

export default App;
