import { LuDices, LuAward } from 'react-icons/lu';

export default function Score(props) {
  return (
    <div className='scores-cointainer'>
      <h2>Score</h2>
      <p className='current-score'>
        <LuDices />
        <span>{props.score}</span>
      </p>
      <p className='record-score'>
        <LuAward />
        <span>{props.recordScore}</span>
      </p>
    </div>
  );
}
