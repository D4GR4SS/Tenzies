import {
  LuDice1,
  LuDice2,
  LuDice3,
  LuDice4,
  LuDice5,
  LuDice6,
} from 'react-icons/lu';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  const getDiceIcon = (value) => {
    switch (value) {
      case 1:
        return <LuDice1 />;
      case 2:
        return <LuDice2 />;
      case 3:
        return <LuDice3 />;
      case 4:
        return <LuDice4 />;
      case 5:
        return <LuDice5 />;
      case 6:
        return <LuDice6 />;
      default:
        return null;
    }
  };

  return (
    <div className='die-face' style={styles} onClick={props.holdDice}>
      <h2 className='die-num'>{getDiceIcon(props.value)}</h2>
    </div>
  );
}
