import React, { useState } from 'react';
import getRandomIntInclusive from '../utils/getRandomInt';

const Die = (props) => {
  const {
    letter, highlight, id, editMode, localDice, dieCoordinates, setLocalDice, dimension,
  } = props;
  const [dieLetter, setDieLetter] = useState(letter);
  const highlightedStyle = {
    backgroundColor: '#ff9999',
  };

  const handleChange = (event) => {
    if (!editMode) return;
    let text = event.target.value;
    if (text.length > 1) {
      text = text.substring(0, 1);
    }
    const ascii = text.charCodeAt(0);
    if (ascii >= 97 && ascii <= 122) {
      text = String.fromCharCode(ascii - 32);
    } else if (ascii < 65 || ascii > 90) return;
    if (text === 'Q') text = 'Qu';
    setDieLetter(text);
    const newLocalDice = localDice.map((diceRow, diceRowIndex) => {
      if (diceRowIndex === dieCoordinates[0]) {
        return diceRow.map((die, dieIndex) => (dieIndex === dieCoordinates[1] ? text : die));
      }
      return [...diceRow];
    });
    setLocalDice(newLocalDice);
    setTimeout(() => document.getElementById(`boggle-${dieCoordinates[0]}-${dieCoordinates[1]}-input`).focus(), 0);
  };

  const handleKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode >= 37 && keyCode <= 40) {
      let elem;
      if (keyCode === 38) { // arrow up
        if (dieCoordinates[0] === 0) return;
        elem = document.getElementById(`boggle-${dieCoordinates[0] - 1}-${dieCoordinates[1]}-input`);
      } else if (keyCode === 37) { // arrow left
        if (dieCoordinates[1] === 0) return;
        elem = document.getElementById(`boggle-${dieCoordinates[0]}-${dieCoordinates[1] - 1}-input`);
      } else if (keyCode === 40) { // arrow down
        if (dieCoordinates[0] === dimension - 1) return;
        elem = document.getElementById(`boggle-${dieCoordinates[0] + 1}-${dieCoordinates[1]}-input`);
      } else if (keyCode === 39) { // arrow right
        if (dieCoordinates[1] === dimension - 1) return;
        elem = document.getElementById(`boggle-${dieCoordinates[0]}-${dieCoordinates[1] + 1}-input`);
      }
      elem.focus();
      setTimeout(() => elem.select(), 0);
      return;
    }
    if (!editMode) return;
    if (keyCode === 8) setDieLetter('');
    document.getElementById(`boggle-${dieCoordinates[0]}-${dieCoordinates[1]}-input`).select();
  };

  const handleBlur = () => {
    if (dieLetter === '') {
      let randDieLetter = String.fromCharCode(getRandomIntInclusive(65, 90));
      if (randDieLetter === 'Q') randDieLetter = 'Qu';
      setDieLetter(randDieLetter);
    }
  };

  return (
    <div id={id} className="boggle-tile" style={highlight ? highlightedStyle : {}}>
      <input
        id={`boggle-${dieCoordinates[0]}-${dieCoordinates[1]}-input`}
        type="text"
        value={dieLetter}
        onFocus={(event) => event.target.select()}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Die;
