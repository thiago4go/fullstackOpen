import { useState } from "react";

const Display = (props) => <>{props.text}</>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine
          text="good"
          value={props.good}
        />
        <StatisticLine
          text="neutral"
          value={props.neutral}
        />
        <StatisticLine
          text="bad"
          value={props.bad}
        />

        <StatisticLine
          text="all"
          value={props.allClicks}
        />
        <StatisticLine
          text="average"
          value={(props.good - props.bad) / props.allClicks}
        />
        <StatisticLine
          text="positive"
          value={(props.good / props.allClicks) * 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allClicks = good + neutral + bad;

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  return (
    <div>
      <Display text={<h1>give feedback</h1>} />
      <Button
        handleClick={handleGoodClick}
        text="good"
      />
      <Button
        handleClick={handleNeutralClick}
        text="neutral"
      />
      <Button
        handleClick={handleBadClick}
        text="bad"
      />
      <Display text={<h2>statistics</h2>} />

      <Statistics
        allClicks={allClicks}
        bad={bad}
        good={good}
        neutral={neutral}
      />
    </div>
  );
};

export default App;
