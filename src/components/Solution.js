/* eslint-disable no-restricted-globals */
import React from 'react';

const Solution = (props) => {
  const {
    solutionViewingMode, wordsList, handleMouseOverWord,
    maxScore, handleMouseOut, handleVisualize, setVisualizationDelay,
    handleStopVisualize,
  } = props;
  return (
    <div id="boggle-solution" style={solutionViewingMode ? {} : { display: 'none' }}>
      <span>Visualization Speed</span>
      <input type="range" min="1" max="190" onChange={(event) => setVisualizationDelay(191 - event.target.valueAsNumber)} />
      <div>
        <button type="button" onClick={handleVisualize}>Visualize solving</button>
        <button type="button" onClick={handleStopVisualize}>Stop visualization</button>
      </div>
      <div id="boggle-words-box">
        <div id="boggle-words-list">
          {wordsList.map((word) => (
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <div onMouseOver={handleMouseOverWord(word)} onMouseOut={handleMouseOut} className="boggle-word">
              {word.word}
              <br />
            </div>
          ))}
        </div>
      </div>
      <div>
        Max Score:
        {maxScore}
      </div>
    </div>
  );
};

export default Solution;
