/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Die from './Die';
import Edit from './Edit';

const Board = (props) => {
  const {
    dice, highlightedDice, highlightColor, editMode, setEditDice, dimension,
  } = props;
  const [localDice, setLocalDice] = useState(dice.map(
    (diceRow) => diceRow.map((die) => (die === 'q' ? 'Qu' : die.toUpperCase())),
  ));
  useEffect(() => {
    setEditDice(localDice.map((localDiceRow) => localDiceRow.map((localDie) => (localDie === 'Qu' ? 'q' : localDie.toLowerCase()))));
  }, [localDice, setEditDice]);
  return (
    <div id="boggle-board">
      {localDice.map(
        (diceRow, diceRowIndex) => (
          <div key={diceRow.join('') + diceRowIndex} className="boggle-row">
            {diceRow.map(
              (die, dieColumnIndex) => (
                <Die
                  dimension={dimension}
                  localDice={localDice}
                  setLocalDice={setLocalDice}
                  dieCoordinates={[diceRowIndex, dieColumnIndex]}
                  editMode={editMode}
                  id={`boggle-${diceRowIndex}-${dieColumnIndex}`}
                  key={die + dieColumnIndex}
                  letter={die}
                  highlightColor={highlightColor}
                  highlight={highlightedDice == null
                    ? false
                    : highlightedDice.has(JSON.stringify([diceRowIndex, dieColumnIndex]))}
                />
              ),
            )}
          </div>
        ),
      )}
      <Edit editMode={editMode} setLocalDice={setLocalDice} />
    </div>
  );
};

export default Board;
