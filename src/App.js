import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Play from './components/Play';
import Solution from './components/Solution';
import Description from './components/Description';
import getDictionary from './services/dictionary';
import solve from './utils/solver';
import getRandomBoard from './utils/getRandom1992BoggleBoard';

const Boggle = () => {
  const [dictionary, setDictionary] = useState([]);
  const [wordsList, setWordsList] = useState([]);
  const [wordsSet, setWordsSet] = useState(null);
  const [maxScore, setMaxScore] = useState(0);
  const [highlightedDice, setHighlightedDice] = useState(null);
  const [playMode, setPlayMode] = useState(false);
  const [solutionViewingMode, setSolutionViewingMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [highlightLock, setHighlightLock] = useState(false);
  const [visualPath, setVisualPath] = useState([]);
  const [visualizationDelay, setVisualizationDelay] = useState(100);
  const [visualizationTimeoutIds, setVisualizationTimeoutIds] = useState([]);
  const diceStringFromStorage = localStorage.getItem('dice');
  const initialDice = diceStringFromStorage ? JSON.parse(diceStringFromStorage)
    : getRandomBoard().map((diceRow) => diceRow.map((die) => (die === 'Qu' ? 'q' : die.toLowerCase())));
  const [dice, setDice] = useState(initialDice);
  const [editDice, setEditDice] = useState(initialDice);
  const dimension = 4;

  useEffect(() => {
    const func = async () => {
      const dict = await getDictionary();
      setDictionary(dict);
    };
    func();
  }, []);

  useEffect(() => {
    localStorage.setItem('dice', JSON.stringify(dice));
  }, [dice]);

  useEffect(() => {
    const solution = solve(dictionary, dice);
    if (solution === null) return;
    const { results, foundWords, visualizationPath } = solution;
    results.sort((a, b) => a.word.localeCompare(b.word));
    setVisualPath(visualizationPath);
    setWordsSet(foundWords);
    setWordsList(results);
  }, [dictionary, dice]);

  useEffect(() => {
    setMaxScore(wordsList.reduce((acc, element) => acc + element.score, 0));
  }, [wordsList]);

  const visualize = () => {
    const delay = visualizationDelay;
    setHighlightLock(true);
    const timeoutIds = [];
    const path = new Set();
    for (let i = 0; i < visualPath.length; i++) {
      if (visualPath[i].length === 1) {
        path.forEach((dieCoordinates) => {
          const die = document.getElementById(`boggle-${dieCoordinates[1]}-${dieCoordinates[3]}`);
          timeoutIds.push(setTimeout(() => {
            die.style.backgroundColor = '#8080ff';
          }, delay * i));
        });

        path.forEach((dieCoordinates) => {
          const die = document.getElementById(`boggle-${dieCoordinates[1]}-${dieCoordinates[3]}`);
          timeoutIds.push(setTimeout(() => {
            die.style.backgroundColor = '#ff9999';
          }, delay * (i + 2)));
        });
      } else {
        const die = document.getElementById(`boggle-${visualPath[i][0]}-${visualPath[i][1]}`);
        const dieCoordinatesStr = JSON.stringify(visualPath[i]);
        if (path.has(dieCoordinatesStr)) {
          path.delete(dieCoordinatesStr);
          timeoutIds.push(setTimeout(() => {
            die.style.backgroundColor = '#ffffff';
          }, delay * i));
        } else {
          path.add(dieCoordinatesStr);
          timeoutIds.push(setTimeout(() => {
            die.style.backgroundColor = '#ff9999';
          }, delay * i));
        }
      }
    }
    timeoutIds.push(setTimeout(() => {
      setHighlightLock(false);
    }, visualPath.length * delay));
    setVisualizationTimeoutIds(timeoutIds);
  };

  const handleMouseOverWord = (word) => () => {
    if (highlightLock) return;
    const highlightedDiceSet = new Set();
    for (let i = 0; i < word.path.length; i++) {
      highlightedDiceSet.add(JSON.stringify(word.path[i]));
    }
    setHighlightedDice(highlightedDiceSet);
  };

  const handleMouseOut = () => {
    setHighlightedDice(null);
  };

  const exitEdit = () => {
    setDice(editDice.map((diceRow) => [...diceRow]));
    setEditMode(false);
  };

  const handleClickPlay = () => {
    if (editMode) {
      exitEdit();
    }
    setSolutionViewingMode(false);
    setPlayMode(true);
  };

  const handleClickSolve = () => {
    if (editMode) {
      exitEdit();
    }
    setPlayMode(false);
    setSolutionViewingMode(true);
  };

  const handleClickEdit = () => {
    setPlayMode(false);
    setSolutionViewingMode(false);
    setEditMode(true);
  };

  const handleStopVisualize = () => {
    const timeoutIds = visualizationTimeoutIds;
    for (let i = 0; i < timeoutIds.length; i++) {
      clearTimeout(timeoutIds[i]);
    }
    setHighlightLock(false);
    setVisualizationTimeoutIds([]);
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        document.getElementById(`boggle-${i}-${j}`).style.backgroundColor = '#ffffff';
      }
    }
  };

  return (
    <div id="Boggle">
      <Description />
      <div id="boggle-interface">
        <div id="boggle-buttons">
          <button type="button" onClick={handleClickPlay}>Play</button>
          <button type="button" onClick={handleClickSolve}>Solution</button>
          <button type="button" onClick={handleClickEdit} style={editMode ? { backgroundColor: '#8080ff' } : {}}>Edit</button>
        </div>
        <Board
          dice={dice}
          highlightedDice={highlightedDice}
          editMode={editMode}
          setEditDice={setEditDice}
          dimension={dimension}
        />
        <div id="boggle-work-area">
          <Solution
            solutionViewingMode={solutionViewingMode}
            wordsList={wordsList}
            handleMouseOverWord={handleMouseOverWord}
            maxScore={maxScore}
            handleMouseOut={handleMouseOut}
            handleVisualize={visualize}
            handleStopVisualize={handleStopVisualize}
            setVisualizationDelay={setVisualizationDelay}
          />
          <Play maxScore={maxScore} playMode={playMode} wordsSet={wordsSet} />
        </div>
      </div>
    </div>
  );
};

export default Boggle;
