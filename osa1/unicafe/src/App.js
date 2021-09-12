import React, {useState} from 'react';

const Button =({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all.length === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all.length}/>
        <StatisticLine text='average' value={props.average/props.all.length}/>
        <StatisticLine text='positive' value={(props.good/props.all.length)*100 + ' %'}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all.concat('button_click'))
    setAverage(average + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all.concat('button_click'))
    setAverage(average + 0)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all.concat('button_click'))
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGood()} text='good' />
      <Button handleClick={() => handleNeutral()} text='neutral' />
      <Button handleClick={() => handleBad()} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
    </div>
  )
}

export default App;
