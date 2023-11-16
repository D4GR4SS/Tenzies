import { useState, useEffect } from 'react';
import Die from './components/Die';
import Score from './components/Score';
import Time from './components/Time';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState(0);
  const [recordScore, setRecordScore] = useState(
    JSON.parse(localStorage.getItem('best-score')) || 0
  );

  function setRecords() {
    if (!recordScore || score < recordScore) {
      setRecordScore(score);
    }
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setRecords();
    }
  }, [dice]);

  //useEffect(() => {}, []);

  useEffect(() => {
    localStorage.setItem('best-score', JSON.stringify(recordScore));
  }, [recordScore]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setScore((count) => count + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setScore(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>

      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className='dice-container'>{diceElements}</div>

      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>

      <section className='track-container'>
        <Score score={score} recordScore={recordScore} />
        <Time />
      </section>
    </main>
  );
}
