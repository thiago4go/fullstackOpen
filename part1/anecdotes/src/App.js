import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Votes = (props) => <div>has {props.votes} votes</div>;

const Favorite = (props) => {
  const mostvoted = Math.max(...props.votes);
  const index = props.votes.indexOf(mostvoted);
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[index]}</div>
      <Votes votes={mostvoted} />
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];
  const max = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(max).fill(0));

  const handleClickNext = () => {
    const random = Math.floor(Math.random() * max);
    setSelected(random);
  };

  const handleClickVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>

      <Votes votes={votes[selected]} />

      <Button
        handleClick={handleClickVote}
        text="vote"
      />
      <Button
        handleClick={handleClickNext}
        text="next anecdote"
      />

      <Favorite
        anecdotes={anecdotes}
        votes={votes}
      />
    </>
  );
};

export default App;
