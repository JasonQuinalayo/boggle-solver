const getScore = (word) => {
  const len = word.length;
  if (len < 3) return 0;
  if (len < 5) return 1;
  if (len === 5) return 2;
  if (len === 6) return 3;
  if (len === 7) return 5;
  return 11;
};

export default getScore;
