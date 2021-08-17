import React from 'react';
import getRandomBoard from '../utils/getRandom1992BoggleBoard';

const Edit = (props) => {
  const { setLocalDice, editMode } = props;
  const handleRandomize = () => {
    setLocalDice(getRandomBoard());
  };
  return (
    <div id="boggle-edit" style={editMode ? {} : { display: 'none' }}>
      <br />
      <span>Leaving a tile blank will automatically randomize it.</span>
      <button type="button" onClick={handleRandomize}>Get Random 1992 Boggle Board</button>
    </div>
  );
};

export default Edit;
