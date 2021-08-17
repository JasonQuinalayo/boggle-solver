import Trie from './trie';
import getWordScore from './getWordScore';

const createWord = function createWord(word, score, path) {
  return {
    word,
    score,
    path,
  };
};

const solve = (wordList, tiles) => {
  if (wordList.length === 0) return null;
  const trieDictionary = new Trie();
  for (let i = 0; i < wordList.length; i += 1) {
    const len = wordList[i].length;
    if (len > 2) {
      const score = getWordScore(wordList[i]);
      trieDictionary.addWord(wordList[i], 0, score);
    }
  }

  const foundWords = new Set();
  const results = [];
  const stringArray = [];
  const nodesVisiting = [];
  const currentPath = [];
  const visualizationPath = [];

  for (let i = 0; i < tiles.length; i += 1) {
    const row = [];
    for (let j = 0; j < tiles[0].length; j += 1) {
      row.push(false);
    }
    nodesVisiting.push(row);
  }

  const dfs = (i, j, trie) => {
    if (i < 0 || i >= tiles.length || j < 0 || j >= tiles[0].length || nodesVisiting[i][j]) return;
    const coordinates = [i, j];
    visualizationPath.push(coordinates);
    const index = (tiles[i][j]).charCodeAt(0) - 97;
    let curTrie = trie.children[index];
    if (curTrie === null) {
      visualizationPath.push(coordinates);
      return;
    }
    if (tiles[i][j] === 'q') {
      curTrie = curTrie.children[20];
      if (curTrie === null) {
        visualizationPath.push(coordinates);
        return;
      }
      stringArray.push('qu');
    } else {
      stringArray.push(tiles[i][j]);
    }
    nodesVisiting[i][j] = true;
    currentPath.push([i, j]);
    if (curTrie.score && !(foundWords.has(stringArray.join('')))) {
      const word = stringArray.join('');
      results.push(createWord(word, curTrie.score, [...currentPath]));
      foundWords.add(word);
      visualizationPath.push([1]);
    }
    for (let di = -1; di <= 1; di += 1) {
      for (let dj = -1; dj <= 1; dj += 1) {
        dfs(i + di, j + dj, curTrie);
      }
    }
    nodesVisiting[i][j] = false;
    currentPath.splice(currentPath.length - 1);
    stringArray.splice(stringArray.length - 1);
    visualizationPath.push(coordinates);
  };

  for (let i = 0; i < tiles.length; i += 1) {
    for (let j = 0; j < tiles[0].length; j += 1) {
      dfs(i, j, trieDictionary);
    }
  }
  return { results, foundWords, visualizationPath };
};

export default solve;
