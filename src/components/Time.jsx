import { LuTimer, LuTrophy } from 'react-icons/lu';

export default function Time() {
  return (
    <div className='times-cointainer'>
      <h2>Time</h2>
      <p className='current-time'>
        <LuTimer />
        <span>00:00</span>
      </p>
      <p className='record-time'>
        <LuTrophy />
        <span>00:00</span>
      </p>
    </div>
  );
}
