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

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(
    JSON.parse(localStorage.getItem('best-time')) || null
  );

  function setBestScore() {
    if (!recordScore || score < recordScore) {
      setRecordScore(score);
    }
  }

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setBestScore();
      setEndTime(new Date());
    }
  }, [dice]);

  useEffect(() => {
    if (tenzies && startTime && endTime) {
      const elapsedMilliseconds = endTime - startTime;

      // Verifica se il tempo è inferiore al record corrente prima di aggiornare il record
      if (!elapsedTime || elapsedMilliseconds < elapsedTime) {
        setElapsedTime(elapsedMilliseconds);
        localStorage.setItem('best-time', JSON.stringify(elapsedMilliseconds));
      }

      setElapsedTime(elapsedMilliseconds);
      console.log(`You won! It took ${elapsedMilliseconds} milliseconds.`);
    }
  }, [tenzies, startTime, endTime, elapsedTime]);

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
      resetGame();
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const resetGame = () => {
    setTenzies(false);
    setDice(allNewDice());
    setScore(0);
    setStartTime(new Date());
  };

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
        <Time
          tenzies={tenzies}
          elapsedTime={elapsedTime}
          startTime={startTime}
          onTimeUpdate={(updatedTime) => setElapsedTime(updatedTime)}
        />
      </section>
    </main>
  );
}
