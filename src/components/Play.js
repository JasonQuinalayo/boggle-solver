import React, { useState, useEffect } from 'react';
import getWordScore from '../utils/getWordScore';

const Play = (props) => {
  const {
    playMode, wordsSet, maxScore,
  } = props;
  const [typedWord, setTypedWord] = useState('');
  const [score, setScore] = useState(0);
  const [enteredWords, setEnteredWords] = useState([]);
  const [notification, setNotification] = useState('');
  useEffect(() => {
    setEnteredWords([]);
    setScore(0);
    setNotification('');
  }, [wordsSet]);

  const handleEnter = () => {
    const word = typedWord;
    if (wordsSet.has(word) && !(enteredWords.includes(word))) {
      const wordScore = getWordScore(word);
      setScore(score + wordScore);
      setEnteredWords(enteredWords.concat(word));
      setNotification(`You entered '${word}' with score of ${wordScore}`);
      setTypedWord('');
    } else if (enteredWords.includes(word)) {
      setNotification(`You already entered '${word}'`);
    } else {
      setNotification('Invalid word');
    }
  };
  const handleEnterClick = (event) => {
    if (event.key === 'Enter' || (event.keyCode && event.keyCode === 13)) {
      handleEnter();
    }
  };
  return (
    <div id="boggle-play" style={playMode ? {} : { display: 'none' }}>
      <div id="boggle-input-word">
        <input
          type="text"
          value={typedWord}
          onChange={({ target }) => setTypedWord(target.value)}
          onKeyDown={handleEnterClick}
        />
        <button type="submit" onClick={handleEnter}>Enter</button>
      </div>
      <br />
      <div id="boggle-notification">
        {notification}
      </div>
      <br />
      <div id="boggle-score-sheet">
        <div>
          Score :
          <span>
            {score}
          </span>
        </div>
        <div>
          Max Score :
          <span>
            {maxScore}
          </span>
        </div>
      </div>
      <br />
      Entered Words :
      <div id="boggle-entered-words">
        {enteredWords.map((word) => (
          <div>
            {word}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Play;
