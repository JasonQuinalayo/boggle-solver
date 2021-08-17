import getRandomIntInclusive from './getRandomInt';

const boggleBoard1992 = [
  ['LRYTTE', 'VTHRWE', 'EGHWNE', 'SEOTIS'],
  ['ANAEEG', 'IDSYTT', 'OATTOW', 'MTOICU'],
  ['AFPKFS', 'XLDERI', 'HCPOAS', 'ENSIEU'],
  ['YLDEVR', 'ZNRNHL', 'NMIQHU', 'OBBAOJ'],
];

const getRandomBoard = () => {
  const board = boggleBoard1992.map((facesRow) => facesRow.map(
    (faceDistribution) => {
      const randNum = getRandomIntInclusive(0, 5);
      return faceDistribution[randNum] === 'Q' ? 'Qu' : faceDistribution[randNum];
    },
  ));

  for (let i = 0; i < 15; i++) {
    const randNum = getRandomIntInclusive(i, 15);
    const temp = board[Math.floor(randNum / 4)][randNum % 4];
    board[Math.floor(randNum / 4)][randNum % 4] = board[Math.floor(i / 4)][i % 4];
    board[Math.floor(i / 4)][i % 4] = temp;
  }

  return board;
};

export default getRandomBoard;
